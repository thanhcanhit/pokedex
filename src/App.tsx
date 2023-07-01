import axios from "axios";
import { useState, useEffect } from "react";
import SearchForm from "./components/SearchForm/SearchForm";
import PokemonCollection from "./components/PokemonCollection/PokemonCollection";
import { Pokemon } from "./interface";
import "./App.css";
import PokemonDetail from "./components/PokemonDetail.tsx/PokemonDetail";

function App() {
	const [searchText, setSearchText] = useState<string>("");
	const [pokemons, setPokemons] = useState<Pokemon[]>([]);
	const [nextUrl, setNextUrl] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isScrollLoading, setIsScrollLoading] = useState<boolean>(false);
	const [openDetail, setOpenDetail] = useState<{
		isOpen: boolean;
		pokemon: Pokemon | null;
	}>({ isOpen: false, pokemon: null });

	// Hàm đọc api và set cho pokemons state
	async function getPokemons(url: string) {
		setIsLoading(true);
		const res = await axios.get(url);
		setNextUrl(res.data.next);

		const apiInfoList = res.data.results;

		for (const apiInfo of apiInfoList) {
			const res2 = await axios.get(apiInfo.url);
			const pokemonData: Pokemon = res2.data;
			setPokemons((prev) => [...prev, pokemonData]);
		}
		setIsLoading(false);
	}

	// Xử lí load thêm dữ liệu khi trượt đến cuối trang
	useEffect(() => {
		function handleScrollEnd() {
			if (
				window.innerHeight + window.scrollY >=
				document.body.offsetHeight
			) {
				getPokemons(nextUrl);
			}
		}

		function handleTouchMoveEnd() {
			if (
				window.scrollY + window.innerHeight >=
				document.body.scrollHeight - 1
			) {
				getPokemons(nextUrl);
			}
		}

		if (isScrollLoading) {
			window.addEventListener("scroll", handleScrollEnd);
			document.body.addEventListener("touchmove", handleTouchMoveEnd);

			return () => {
				window.removeEventListener("scroll", handleScrollEnd);
				document.body.removeEventListener(
					"touchmove",
					handleTouchMoveEnd
				);
			};
		}
	}, [isScrollLoading, nextUrl]);

	// Loading dữ liệu lần đầu
	useEffect(() => {
		getPokemons("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");
	}, []);

	return (
		<div className="app">
			<header className=" py-2">
				<div className="container d-flex flex-column justify-content-center align-items-center">
					<div className="d-flex gap-2 align-items-center ">
						<h1 className="pixel-font">Pokedex</h1>
						<img width={30} height={30} src="favicon.png" />
					</div>
					<div className="mt-2">
						<span>
							API Source:{" "}
							<a
								href="https://pokeapi.co/"
								target="_blank"
								className="link-success fw-semibold"
							>
								Poke API
							</a>
						</span>
					</div>
					<a
						className="link-success "
						href="https://thanhcanhit.github.io"
					>
						@thanhcanhit
					</a>
				</div>
			</header>

			<main>
				<div className="container">
					<SearchForm
						searchText={searchText}
						setSearchText={setSearchText}
						setOpenDetail={setOpenDetail}
					/>
					<PokemonCollection
						pokemons={pokemons}
						setOpenDetail={setOpenDetail}
					/>
					<div className="py-4 d-flex flex-column align-items-center  justify-content-center ">
						{isLoading && (
							<div className="text-center my-2">
								<div className="spinner-border" role="status">
									<span className="visually-hidden">
										Loading...
									</span>
								</div>
							</div>
						)}
						{!isScrollLoading && (
							<button
								className="btn btn-success"
								onClick={() => setIsScrollLoading(true)}
							>
								Load more
							</button>
						)}
					</div>
				</div>
			</main>

			{openDetail.isOpen && openDetail.pokemon && (
				<PokemonDetail
					pokemon={openDetail.pokemon}
					setOpenDetail={setOpenDetail}
				/>
			)}
		</div>
	);
}

export default App;
