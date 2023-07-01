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
		try {
			setIsLoading(true);
			const res = await axios.get(
				`https://pokeapi.co/api/v2/pokemon/${query}`
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
							placeholder="Ví dụ: 4, charmander..."
							value={searchText}
							onChange={(e) => {
								setSearchText(e.target.value);
							}}
						/>
						{isLoading ? (
							<button className="btn btn-success ">
								<div className="spinner-border" role="status">
									<span className="visually-hidden">
										Loading...
									</span>
								</div>
							</button>
						) : (
							<button
								className="btn btn-success px-3"
								onClick={() => getPokemon(searchText)}
							>
								<img width={20} src={searchImg} />
							</button>
						)}
					</div>
					{isNotFound ? (
						<p className="form-text text-warning ">
							Không tìm thấy pokemon có tên hoặc mã là "
							{searchText}"
						</p>
					) : (
						<p className="form-text">
							Pokedex là một giải pháp mạnh mẽ để tìm kiếm thông
							tin về các Pokémon. Bạn có thể khám phá thông tin
							chi tiết về loài Pokémon, bao gồm mô tả, loại, chỉ
							số, điểm mạnh yếu, và hình ảnh...
						</p>
					)}
				</form>
			</div>
		</>
	);
};

export default SearchForm;
