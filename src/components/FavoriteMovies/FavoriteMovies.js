import React from "react";
import { useSelector } from "react-redux";
import {
	getFavoriteMovies,
	getWatchList
} from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";

const FavoriteMovies = () => {
	const favMovies = useSelector(getFavoriteMovies);
	const watchListMovies = useSelector(getWatchList);

	const isFavorite = movieID => {
		return favMovies.some(movie => movie.id === movieID);
	};
	const isWatchList = movieID => {
		return watchListMovies.some(movie => movie.id === movieID);
	};
	return (
		<>
			<div className="container movie-wrapper">
				<h1 className="mt-4">My Favorite Movies</h1>
				<div className="row justify-content-center">
					{favMovies &&
						favMovies.map((movie, index) => (
							<MovieCard
								key={movie.id}
								movieData={movie}
								isFavorite={isFavorite(movie.id)}
								isWatchList={isWatchList(movie.id)}
							/>
						))}
				</div>
			</div>
		</>
	);
};

export default FavoriteMovies;
