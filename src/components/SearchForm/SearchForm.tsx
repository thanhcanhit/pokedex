import React, { useState } from "react";
import searchImg from "../../assets/search.svg";
import { Pokemon } from "../../interface";
import axios from "axios";

type SearchFormType = {
	searchText: string;
	setSearchText: React.Dispatch<React.SetStateAction<string>>;
	setOpenDetail: React.Dispatch<
		React.SetStateAction<{
			isOpen: boolean;
			pokemon: Pokemon | null;
		}>
	>;
};

const SearchForm = ({
	searchText,
	setSearchText,
	setOpenDetail,
}: SearchFormType) => {
	const [isNotFound, setIsNotFound] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	async function getPokemon(query: string) {
		if (query == "") return;
		try {
			setIsLoading(true);
			const res = await axios.get(
				`https://pokeapi.co/api/v2/pokemon/${query.toLocaleLowerCase()}`
			);
			const pokemonData = res.data;
			setOpenDetail({ isOpen: true, pokemon: pokemonData });
			if (isNotFound) setIsNotFound(false);
		} catch (err) {
			setIsNotFound(true);
		} finally {
			setIsLoading(false);
		}
	}

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
	}

	return (
		<>
			<div className="search-form mx-auto">
				<form onSubmit={onSubmit}>
					<label htmlFor="searchInput" className="form-label">
						Name or Identify number:
					</label>
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							id="searchInput"
							placeholder="Ex: 1, 10, charmander, psyduck..."
							value={searchText}
							onChange={(e) => {
								setIsNotFound(false);
								setSearchText(e.target.value);
							}}
						/>
						{isLoading ? (
							<button className="btn btn-success px-3 py-2 d-flex align-items-center ">
								<div
									style={{
										height: 20,
										width: 20,
										fontSize: 12,
									}}
									className="spinner-border"
									role="status"
								>
									<span className="visually-hidden">
										Loading...
									</span>
								</div>
							</button>
						) : (
							<button
								className="btn btn-success px-3 py-2 d-flex align-items-center "
								onClick={() => getPokemon(searchText)}
							>
								<img width={20} src={searchImg} />
							</button>
						)}
					</div>
					{isNotFound ? (
						<p className="form-text text-warning ">
							No pokemon with the name or code "{searchText}"
							found.
						</p>
					) : (
						<p className="form-text">
							Pokedex is a powerful solution for finding
							information about Pokémon. You can discover detailed
							information about the Pokémon species, including
							description, type, stats, strengths and weaknesses,
							and images...
						</p>
					)}
				</form>
			</div>
		</>
	);
};

export default SearchForm;
