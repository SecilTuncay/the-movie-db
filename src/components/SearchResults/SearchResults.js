import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getSearchResults,
	getFavoriteMovies,
	getWatchList
} from "../../features/movies/movieSlice";
import { fetchAsyncSearchMovies } from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";

const SearchResults = () => {
	const searchMovies = useSelector(getSearchResults);
	const favMovies = useSelector(getFavoriteMovies);
	const watchListMovies = useSelector(getWatchList);
	const dispatch = useDispatch();
	const totalPages = searchMovies.total_pages;
	const [currentPage, setCurrentPage] = useState(1);
	const { term } = useParams();

	useEffect(() => {
		setCurrentPage(1);
	}, [term]);

	useEffect(() => {
		dispatch(fetchAsyncSearchMovies({ term, currentPage }));
	}, [dispatch, currentPage]);

	const handlePageClick = data => {
		setCurrentPage(data.selected + 1);
	};
	const isFavorite = movieID => {
		return favMovies.some(movie => movie.id === movieID);
	};

	const isWatchList = movieID => {
		return watchListMovies.some(movie => movie.id === movieID);
	};

	return (
		<>
			<div className=" container movie-wrapper">
				<h1 className="mt-4">Search Results</h1>
				<div className="row justify-content-center">
					{searchMovies.results &&
						searchMovies.results.map((movie, index) => (
							<MovieCard
								key={index}
								movieData={movie}
								isFavorite={isFavorite(movie.id)}
								isWatchList={isWatchList(movie.id)}
							/>
						))}
				</div>
				<ReactPaginate
					previousLabel={"previous"}
					nextLabel={"next"}
					breakLabel={"..."}
					pageCount={totalPages}
					marginPagesDisplayed={4}
					pageRangeDisplayed={4}
					onPageChange={handlePageClick}
					containerClassName={"pagination mt-2 justify-content-center"}
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
		</>
	);
};

export default SearchResults;
