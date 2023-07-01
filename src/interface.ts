export interface ApiInfo {
	name: string;
	url: string;
}

export interface Pokemon {
	id: number;
	is_default: boolean;
	name: string;
	order: number;
	weight: number;
	height: number;

	abilities: {
		ability: {
			name: string;
			url: string;
		};
		is_hidden: boolean;
		slot: 1;
	}[];

	forms: ApiInfo[];

	species: ApiInfo;

	sprites: {
		back_default: string;
		back_shiny: string;
		front_default: string;
		front_shiny: string;
	};

	base_experience: number;

	types: {
		slot: number;
		type: ApiInfo;
	}[];

	stats: {
		base_stat: number;
		effort: 0;
		stat: ApiInfo;
	}[];
}

interface Chain {
	evolves_to: [Chain];
	species: ApiInfo;
}

export interface EvolutionChain {
	chain: Chain;
}
