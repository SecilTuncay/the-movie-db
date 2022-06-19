import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import {
	addToFavorites,
	addToWatchlist,
	removeFromWatchlist,
	removeFromFavorites
} from "../../features/movies/movieSlice";
import { useDispatch } from "react-redux";
import errorImage from "../../images/image-error.png";
import { Card, Button } from "react-bootstrap";
library.add(fas, far);

const MovieCard = props => {
	const { movieData } = props;
	const { id, title, overview, vote_average, poster_path } = movieData;
	const [isFavorite, setFavorite] = useState(props.isFavorite);
	const [isWatchList, setIsWatchList] = useState(props.isWatchList);

	const dispatch = useDispatch();

	const baseImgUrl = "https://image.tmdb.org/t/p";
	const size = "w500";
	let tempPath = poster_path
		? `${baseImgUrl}/${size}${poster_path}`
		: errorImage;

	const addToFavoritesHandler = () => {
		if (isFavorite) {
			dispatch(
				removeFromFavorites({
					id,
					title,
					overview,
					vote_average,
					poster_path,
					isFavorite: false
				})
			);
		} else {
			dispatch(
				addToFavorites({
					id,
					title,
					overview,
					vote_average,
					poster_path,
					isFavorite: true
				})
			);
		}
		setFavorite(!isFavorite);
	};

	const addToWatchlistHandler = () => {
		if (isWatchList) {
			dispatch(
				removeFromWatchlist({
					id,
					title,
					overview,
					vote_average,
					poster_path,

					isWatchList: false
				})
			);
		} else {
			dispatch(
				addToWatchlist({
					id,
					title,
					overview,
					vote_average,
					poster_path,
					isWatchList: true
				})
			);
		}
		setIsWatchList(!isWatchList);
	};

	return (
		<div className="col-lg-3 col-md-6 my-2">
			<Card className="movie-card" key={id}>
				<Card.Header className="d-flex justify-content-end">
					<span
						className="movie-card__btns mr-3"
						onClick={addToFavoritesHandler}
					>
						{isFavorite ? (
							<FontAwesomeIcon icon="fa-solid fa-heart" />
						) : (
							<FontAwesomeIcon icon="fa-regular fa-heart" />
						)}
					</span>
					<span
						className="movie-card__btns"
						onClick={addToWatchlistHandler}
					>
						{isWatchList ? (
							<FontAwesomeIcon icon="fa-solid fa-bookmark" />
						) : (
							<FontAwesomeIcon icon="fa-regular fa-bookmark" />
						)}
					</span>
				</Card.Header>
				<Link className="movie-card__link overflow-hidden" to={`/movie/${id}`}>
					<Card.Img className="movie-card__image" src={tempPath}></Card.Img>
				</Link>
				<Card.Body>
					<Card.Title className="movie-card__title mb-2">{title}</Card.Title>
					<Card.Text className="movie-card__overview mb-2">{overview}</Card.Text>
				</Card.Body>
				<Card.Footer className="movie-card__popularity mb-2 text-align-right">Rating : {vote_average}</Card.Footer>
			</Card>

			{/* 			<div className="card-cont movie-card" key={id}>
				<div className="card-header d-flex justify-content-end">
					<div className="movie-card__btns mr-3" onClick={addToFavoritesHandler}>
						{isFavorite ? (
							<FontAwesomeIcon icon="fa-solid fa-heart" />
						) : (
							<FontAwesomeIcon icon="fa-regular fa-heart" />
						)}
					</div>
					<div className="movie-card__btns mr-3" onClick={addToWatchlistHandler}>
						{isWatchList ? (
							<FontAwesomeIcon icon="fa-solid fa-bookmark" />
						) : (
							<FontAwesomeIcon icon="fa-regular fa-bookmark" />
						)}
					</div>
				</div>
				<Link to={`/movie/${id}`}>
					<img className="movie-card__image my-3 img img-fluid" src={tempPath}></img>
				</Link>

				<div className="card-body">
					<div className="movie-card__title mb-2">{title}</div>
					<div className="movie-card__overview mb-3">{overview}</div>
				</div>
				<div className="card-footer">
					<div className="movie-card__popularity mb-2 text-align-right">Rating : {vote_average}</div>
				</div>
			</div> */}
		</div>
	);
};

export default MovieCard;

{
	/* 

<div className="col-lg-3 my-2">
<div className="card-cont m-1" key={id}>
			<div className="card-header d-flex justify-content-end">
				<div className="card-btns" onClick={addToFavoritesHandler}>
					{isFavorite ? (
						<FontAwesomeIcon icon="fa-solid fa-heart" />
					) : (
						<FontAwesomeIcon icon="fa-regular fa-heart" />
					)}
				</div>
				<div className="card-btns ml-4" onClick={addToWatchlistHandler}>
					{isWatchList ? (
						<FontAwesomeIcon icon="fa-solid fa-bookmark" />
					) : (
						<FontAwesomeIcon icon="fa-regular fa-bookmark" />
					)}
				</div>
			</div>
			<Link to={`/movie/${id}`}>
				<img className="card-image mt-2 img-fluid" src={tempPath}></img>
			</Link>

			<div className="card-body">
				<div className="card-title">{title}</div>
				<div className="card-overview">{overview}</div>
		
			</div>
			<div className="card-footer">
				<div className="card-popularity">Rating : {vote_average}</div>
			</div>
		</div> 
		</div> 
	*/
}
