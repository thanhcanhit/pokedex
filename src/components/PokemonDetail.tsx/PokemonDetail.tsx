import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { EvolutionChain, Pokemon } from "../../interface";
import { convertId } from "../../util/convertData";
import PokemonTypes from "../PokemonCollection/PokemonTypes";
import style from "./pokemonDetail.module.css";
import arrowRightImg from "./arrow-right.svg";

type PokemonDetailProps = {
	pokemon: Pokemon;
	setOpenDetail: React.Dispatch<
		React.SetStateAction<{
			isOpen: boolean;
			pokemon: Pokemon | null;
		}>
	>;
};

const PokemonDetail = ({ pokemon, setOpenDetail }: PokemonDetailProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const [evolutionChain, setEvolutionChain] = useState<
		{ imgPath: string; name: string }[]
	>([]);

	// Get evolution chain from api
	async function getEvolutions(pokemon: Pokemon) {
		setIsLoading(true);
		// Get Species from API endpoint
		const speciesRes = await axios.get(pokemon.species.url);
		// Get Evolution chain from API endpoint
		const evolutonChainURL = speciesRes.data.evolution_chain.url;
		const evolutionChainRes = await axios.get(evolutonChainURL);
		const evolutionChain: EvolutionChain = evolutionChainRes.data;

		// Get pokemon evolution chain name array
		let cursor = evolutionChain.chain;
		const evolution: string[] = [cursor.species.name];
		while (cursor.evolves_to[0]) {
			evolution.push(cursor.evolves_to[0].species.name);
			cursor = cursor.evolves_to[0];
		}

		// Get img from each evolution chain
		for (const name of evolution) {
			const pokemonRes = await axios.get(
				`https://pokeapi.co/api/v2/pokemon/${name}`
			);
			const pokemon: Pokemon = pokemonRes.data;
			setEvolutionChain((prev) => [
				...prev,
				{
					name, 
					imgPath: pokemon.sprites.front_default,
				},
			]);
		}

		setIsLoading(false);
	}

	useEffect(() => {
		getEvolutions(pokemon);
	}, [pokemon]);

	// Render
	const previewTable = (
		<table className="table table-dark ">
			<thead>
				<tr>
					<th className="text-center ">Back</th>
					<th className="text-center ">Front</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<div className="d-flex justify-content-center ">
							<img
								className={style.img}
								src={
									pokemon.sprites.back_default ||
									"errorImg.jpg"
								}
							/>
						</div>
					</td>
					<td>
						<div className="d-flex justify-content-center ">
							<img
								className={style.img}
								src={pokemon.sprites.front_default}
							/>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	);

	const statsTable = (
		<table className="table table-dark">
			<thead>
				<tr>
					{pokemon.stats.map((item) => {
						return (
							<th key={item.stat.name}>
								<img
									width={20}
									src={`stat-icon/${item.stat.name}.png`}
									title={item.stat.name.toUpperCase()}
								/>
							</th>
						);
					})}
				</tr>
			</thead>
			<tbody>
				<tr>
					{pokemon.stats.map((item) => {
						return <td>{item.base_stat}</td>;
					})}
				</tr>
			</tbody>
		</table>
	);

	const detailTable = (
		<table className="table table-dark table-hover table-striped ">
			<thead>
				<tr>
					<th colSpan={4} className="text-center ">
						Pokemon Details
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th colSpan={1}>Id:</th>
					<td colSpan={3}>#{convertId(pokemon.id)}</td>
				</tr>
				<tr>
					<th colSpan={1}>Name:</th>
					<td colSpan={3} className="text-capitalize ">
						{pokemon.name}
					</td>
				</tr>
				<tr>
					<th colSpan={1}>Base experience:</th>
					<td colSpan={3}>{pokemon.base_experience}</td>
				</tr>
				<tr>
					<th colSpan={1}>Types:</th>
					<td colSpan={3}>
						{<PokemonTypes types={pokemon.types} />}
					</td>
				</tr>
				<tr>
					<th>Height:</th>
					<td>{pokemon.height}</td>
					<th>Weight:</th>
					<td>{pokemon.weight}</td>
				</tr>
			</tbody>
		</table>
	);

	const skillsTable = (
		<table className="table table-dark table-hover table-striped ">
			<thead>
				<tr>
					<th colSpan={3} className="text-center ">
						Pokemon Skills
					</th>
				</tr>
				<tr>
					<th>Name</th>
					<th className="text-center ">Slot</th>
					<th className="text-center ">Is Hidden</th>
				</tr>
			</thead>
			<tbody>
				{pokemon.abilities.map((item) => {
					return (
						<tr>
							<td className="text-center ">
								{item.ability.name}
							</td>
							<td className="text-center ">{item.slot}</td>
							<td className="text-center ">
								{item.is_hidden ? "✅" : "❌"}
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);

	const evolutionTable = (
		<div className=" table-responsive">
			<table className="table table-dark  table-hover table-striped ">
				<thead>
					<tr>
						{evolutionChain.map((item, index) => (
							<Fragment key={item.name}>
								<th className="text-center text-capitalize ">
									{item.name}
								</th>
								{index != evolutionChain.length - 1 && <th></th>}
							</Fragment>
						))}
					</tr>
				</thead>
				<tbody>
					<tr>
						{evolutionChain.map((item, index) => (
							<Fragment key={item.name}>
								<td>
									<div className="d-flex justify-content-center">
										<img src={item.imgPath} />
									</div>
								</td>
								{index != evolutionChain.length - 1 && (
									<td style={{ verticalAlign: "middle" }}>
										<img src={arrowRightImg} />
									</td>
								)}
							</Fragment>
						))}
					</tr>
				</tbody>
			</table>
		</div>
	);

	return (
		<>
			<div
				className={style.layer}
				onClick={() => setOpenDetail({ isOpen: false, pokemon: null })}
			></div>
			<div className={style.pokemonDetail + " mx-auto "}>
				<div className="d-flex justify-content-center mb-2">
					<button
						type="button"
						className="btn-close ms-auto"
						onClick={() =>
							setOpenDetail({ isOpen: false, pokemon: null })
						}
					></button>
				</div>
				<div className="row">
					<div className="col-lg-5 col-12">
						{previewTable}
						{statsTable}
						{isLoading ? (
							<div className="d-flex justify-content-center ">
								<div
									className="spinner-border mx-auto"
									role="status"
								>
									<span className="visually-hidden">
										Loading...
									</span>
								</div>
							</div>
						) : (
							evolutionTable
						)}
					</div>
					<div className="col-lg-7 col-12 ">
						{detailTable}
						{skillsTable}
					</div>
				</div>
			</div>
		</>
	);
};

export default PokemonDetail;
