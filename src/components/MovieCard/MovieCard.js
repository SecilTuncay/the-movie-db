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
  removeFromFavorites,
} from "../../features/movies/movieSlice";
import { useDispatch } from "react-redux";
import errorImage from "../../images/image-error.png";
import { Card } from "react-bootstrap";
library.add(fas, far);

const MovieCard = (props) => {
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
          isFavorite: false,
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
          isFavorite: true,
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

          isWatchList: false,
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
          isWatchList: true,
        })
      );
    }
    setIsWatchList(!isWatchList);
  };

  return (
    <div className="col-lg-3 col-md-6 my-2">
      <Card className="movie-card" key={id}>
        <Card.Header className="d-flex justify-content-between movie-card__header">
          <div className="movie-card__badge">
            <span className="d-block text-center">
              {" "}
              {vote_average.toPrecision(2)}
            </span>
          </div>
          <div>
            <span
              className="movie-card__btns mr-3 text-info"
              onClick={addToFavoritesHandler}
            >
              {isFavorite ? (
                <FontAwesomeIcon icon="fa-solid fa-heart" />
              ) : (
                <FontAwesomeIcon icon="fa-regular fa-heart" />
              )}
            </span>
            <span
              className="movie-card__btns text-info"
              onClick={addToWatchlistHandler}
            >
              {isWatchList ? (
                <FontAwesomeIcon icon="fa-solid fa-bookmark" />
              ) : (
                <FontAwesomeIcon icon="fa-regular fa-bookmark" />
              )}
            </span>
          </div>
        </Card.Header>
        <Link className="movie-card__link overflow-hidden" to={`/movie/${id}`}>
          <Card.Img className="movie-card__image" src={tempPath}></Card.Img>
        </Link>
        <Card.Body>
          <Card.Title className="movie-card__title mb-2">{title}</Card.Title>
          <Card.Text className="movie-card__overview mb-2">
            {overview}
          </Card.Text>

          <div className="movie-card__more d-flex justify-content-end align-items-center">
            <Link
              className="movie-card__link d-flex justify-content-end align-items-center"
              to={`/movie/${id}`}
            >
              more{" "}
              <span className="pl-1 text-info">
                <FontAwesomeIcon icon="fa-solid fa-forward" />
              </span>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MovieCard;
