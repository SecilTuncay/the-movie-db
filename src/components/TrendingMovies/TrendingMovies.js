import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTrendingMovies,
  getFavoriteMovies,
  getWatchList,
} from "../../features/movies/movieSlice";
import { fetchAsyncTrendingMovies } from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import ReactPaginate from "react-paginate";

const TrendingMovies = () => {
  const trendingMovies = useSelector(getTrendingMovies);
  const favMovies = useSelector(getFavoriteMovies);
  const watchListMovies = useSelector(getWatchList);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = trendingMovies.total_pages;

  useEffect(() => {
    dispatch(fetchAsyncTrendingMovies(currentPage));
  }, [dispatch, currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  const isFavorite = (movieID) => {
    return favMovies.some((movie) => parseInt(movie.id) === movieID);
  };

  const isWatchList = (movieID) => {
    return watchListMovies.some((movie) => parseInt(movie.id) === movieID);
  };

  return (
    <div className="container">
      <h1 className="my-4 text-center">Trending Movies</h1>

      <div className="row">
        {trendingMovies.results &&
          trendingMovies.results.map((movie, index) => (
            <MovieCard
              key={index}
              movieData={movie}
              isFavorite={isFavorite(movie.id)}
              isWatchList={isWatchList(movie.id)}
            />
          ))}
      </div>
      <div className="row">
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={
            "col-md-12 pagination mt-3 justify-content-center movie-pagination flex-wrap"
          }
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default TrendingMovies;
