import { Pokemon } from "../../interface";
import PokemonItem from "./PokemonItem";

type PokemonCollectionProps = {
	pokemons: Pokemon[];

	setOpenDetail: React.Dispatch<
		React.SetStateAction<{
			isOpen: boolean;
			pokemon: Pokemon | null;
		}>
	>;
};
const PokemonCollection = ({
	pokemons,
	setOpenDetail,
}: PokemonCollectionProps) => {
	const pokemonListRender: React.ReactNode = pokemons.map(
		(pokemon: Pokemon) => {
			return (
				<PokemonItem
					pokemon={pokemon}
					key={pokemon.id}
					onClick={() =>
						setOpenDetail({
							isOpen: true,
							pokemon: pokemon,
						})
					}
				/>
			);
		}
	);
	return <div className="row">{pokemonListRender}</div>;
};

export default PokemonCollection;
