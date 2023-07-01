import { Pokemon } from "../../interface";
import { convertId, convertName } from "../../util/convertData";
import PokemonTypes from "./PokemonTypes";
import style from "./pokemonItem.module.css";

type PokemonItemProps = {
	pokemon: Pokemon;
	onClick: React.MouseEventHandler;
};

const PokemonItem = ({ pokemon, onClick }: PokemonItemProps) => {
	const typeListRender = <PokemonTypes types={pokemon.types} />;

	const statusListRender = pokemon.stats.map((item) => (
		<div
			className="col-6 col-sm-6 col-md-4 d-flex gap-2 align-items-center my-2"
			title={item.stat.name.toUpperCase()}
			key={item.stat.name}
		>
			<div
				className="d-flex justify-content-center align-items-center p-2"
				style={{
					width: 25,
					height: 25,
					borderRadius: "50%",
					backgroundColor: "#e7e5e5",
				}}
			>
				<img
					width={15}
					height={15}
					style={{ objectFit: "contain" }}
					src={`stat-icon/${item.stat.name}.png`}
				/>{" "}
			</div>
			<span className="pixel-font" style={{ fontSize: 14 }}>
				{item.base_stat}
			</span>
		</div>
	));

	return (
		<div className="col-lg-2 col-md-3 col-sm-4 col-6" onClick={onClick}>
			<div className={style.pokemon + " p-2 my-2 shadow rounded"}>
				<div>
					<img
						className={style.pokemonImg}
						src={pokemon.sprites.front_default}
					/>
				</div>
				<p className={style.pokemonId}>#{convertId(pokemon.id)}</p>
				<p className={style.pokemonName + " pixel-font"}>
					{convertName(pokemon.name)}
				</p>
				<ul className="list-inline align-self-start flex-wrap ">
					{typeListRender}
				</ul>
				<div className={style.statusInfo + " row shadow "}>
					<span
						className="pixel-font text-center text-uppercase bg-dark rounded "
						style={{ fontSize: 12 }}
					>
						stats
					</span>
					{statusListRender}
				</div>
			</div>
		</div>
	);
};

export default PokemonItem;
