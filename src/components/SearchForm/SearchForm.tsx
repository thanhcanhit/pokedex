import React from "react";
import searchImg from "../../assets/search.svg";

type SearchFormType = {
	searchText: string;
	setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

const SearchForm = ({ searchText, setSearchText }: SearchFormType) => {
	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
	}

	return (
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
					<button className="btn btn-success px-3">
						<img width={20} src={searchImg} />
					</button>
				</div>
				<p className="form-text">
					Pokedex là một giải pháp mạnh mẽ để tìm
					kiếm thông tin về các Pokémon. Bạn có thể khám
					phá thông tin chi tiết về loài Pokémon, bao gồm mô tả, loại,
					chỉ số, điểm mạnh yếu, và hình ảnh...
				</p>
			</form>
		</div>
	);
};

export default SearchForm;
