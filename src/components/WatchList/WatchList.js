import React from "react";
import { useSelector } from "react-redux";
import {
  getFavoriteMovies,
  getWatchList,
} from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";

const WatchList = () => {
  const favMovies = useSelector(getFavoriteMovies);
  const watchListMovies = useSelector(getWatchList);
  const isFavorite = (movieID) => {
    return favMovies.some((movie) => movie.id === movieID);
  };

  const isWatchList = (movieID) => {
    return watchListMovies.some((movie) => movie.id === movieID);
  };

  return (
    <>
      <div className="container movie-wrapper">
        <h1 className="mt-4 text-center">My Watchlist</h1>
        <div className="row justify-content-center">
          {watchListMovies &&
            watchListMovies.map((listItem, index) => (
              <MovieCard
                key={listItem.id}
                movieData={listItem}
                isFavorite={isFavorite(listItem.id)}
                isWatchList={isWatchList(listItem.id)}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default WatchList;
