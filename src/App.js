import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import WatchList from "./components/WatchList/WatchList";
import FavoriteMovies from "./components/FavoriteMovies/FavoriteMovies";
import TrendingMovies from "./components/TrendingMovies/TrendingMovies";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import SearchResults from "./components/SearchResults/SearchResults";
import "./App.scss";
import Loading from "./components/Loading/Loading";
import { useSelector } from "react-redux";
import {
	getColorTheme
} from "../src/features/movies/movieSlice";

function App() {
	const themeColor = useSelector(getColorTheme);
	console.log("themeColor in app: ", themeColor);
	//localStorage.setItem("themeColor", themeColor);
	/* 	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getColorTheme(themeColor));
	}, []); */

	return (
		<div
			className={`App ${
				themeColor ? themeColor : "darkMode"
			}`}
		>
		<div className="AppWrapper d-flex flex-column min-vh-100">
				<BrowserRouter>
				<Header />
					<Routes>
						<Route path="/" exact element={<TrendingMovies />} />
						<Route path="/watchList" element={<WatchList />} />
						<Route path="/favoriteMovies" exact element={<FavoriteMovies />} />
						<Route path="/movie/:id" element={<MovieDetail />} />
						<Route path="/searchResults/:term" element={<SearchResults />} />
						<Route path="/error" element={<PageNotFound />} />
						<Route path="/loading" element={<Loading />} />
					</Routes>
					<Footer />
				</BrowserRouter>
			</div>
			
</div>
		
	);
}

export default App;
