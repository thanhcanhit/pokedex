import { Pokemon } from "../../interface";
import style from "./pokemonDetail.module.css";
import PokemonTypes from "../PokemonCollection/PokemonTypes";
import { convertId } from "../../util/convertData";

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
	return (
		<>
			<div
				className={style.layer}
				onClick={() => setOpenDetail({ isOpen: false, pokemon: null })}
			></div>
			<div className={style.pokemonDetail + " w-75 mx-auto "}>
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
													pokemon.sprites.back_default
												}
											/>
										</div>
									</td>
									<td>
										<div className="d-flex justify-content-center ">
											<img
												className={style.img}
												src={
													pokemon.sprites
														.front_default
												}
											/>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
						<table className="table table-dark">
							<thead>
								<tr>
									{pokemon.stats.map((item) => {
										return (
											<th key={item.stat.name}>
												<img
													width={20}
													src={`/stat-icon/${item.stat.name}.png`}
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
					</div>
					<div className="col-lg-7 col-12 ">
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
									<td colSpan={3} className="text-capitalize ">{pokemon.name}</td>
								</tr>
								<tr>
									<th colSpan={1}>Base experience:</th>
									<td colSpan={3}>
										{pokemon.base_experience}
									</td>
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
											<td className="text-center ">
												{item.slot}
											</td>
											<td className="text-center ">
												{item.is_hidden ? "✅" : "❌"}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
};

export default PokemonDetail;
