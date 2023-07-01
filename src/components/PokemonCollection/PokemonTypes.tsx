import { ApiInfo } from "../../interface";

type PokemonTypesProps = {
	types: {
		slot: number;
		type: ApiInfo;
	}[];
};

const pokemonType: {
	[key: string]: { backgroundColor: string; textColor?: string };
} = {
	normal: {
		backgroundColor: "#ad9595",
	},
	fire: {
		backgroundColor: "#F44336",
	},
	water: {
		backgroundColor: "#2196F3",
	},
	grass: {
		backgroundColor: "#4CAF50",
	},
	electric: {
		backgroundColor: "#FFEB3B",
		textColor: "#000",
	},
	ice: {
		backgroundColor: "#00BCD4",
	},
	fighting: {
		backgroundColor: "#DD2C00",
	},
	poison: {
		backgroundColor: "#673AB7",
	},
	ground: {
		backgroundColor: "#825A2C",
	},
	flying: {
		backgroundColor: "#fd90b4",
	},
	psychic: {
		backgroundColor: "#E91E63",
	},
	bug: {
		backgroundColor: "#8BC34A",
	},
	rock: {
		backgroundColor: "#A0522D",
	},
	ghost: {
		backgroundColor: "#76608A",
	},
	dragon: {
		backgroundColor: "#7B68EE",
	},
	dark: {
		backgroundColor: "#404040",
	},
	steel: {
		backgroundColor: "#647687",
	},
	fairy: {
		backgroundColor: "#F472D0",
	},
};

const PokemonTypes = ({ types }: PokemonTypesProps) => {
	return (
		<>
			{types.map((item) => {
				const typeName = item.type.name;
				return (
					<li
						key={item.type.name}
						className="list-inline-item px-2 py-1 rounded pixel-font "
						style={{
							fontSize: 14,
							backgroundColor:
								pokemonType[typeName].backgroundColor,
						}}
					>
						{typeName}
					</li>
				);
			})}
		</>
	);
};

export default PokemonTypes;
