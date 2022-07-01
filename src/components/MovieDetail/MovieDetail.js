import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import errorImage from "../../images/image-error.png";
import {
  fetchAsyncMovieDetail,
  fetchAsyncMovieCredits,
  fetchAsyncMovieVideos,
  getIsLoading,
  getSelectedMovie,
  getSelectedMovieCredit,
  getSelectedMovieVideo,
  removeSelectedMovie,
  removeSelectedMovieCredit,
  removeSelectedMovieVideo,
  addToFavorites,
  addToWatchlist,
  removeFromWatchlist,
  removeFromFavorites,
  getFavoriteMovies,
  getWatchList,
} from "../../features/movies/movieSlice";

import Loading from "../Loading/Loading";
import { Card, Modal } from "react-bootstrap";
import imdb from "../../images/IMDB_Logo.png";
import YouTube from "react-youtube";
import PageNotFound from "../PageNotFound/PageNotFound";

const MovieDetail = (props) => {
  const favMovies = useSelector(getFavoriteMovies);
  const watchListMovies = useSelector(getWatchList);
  const { id } = useParams();
  const [showVideo, setShowVideo] = useState(false);

  console.log(favMovies);

  const opts = {
    height: "585",
    width: "960",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const dispatch = useDispatch();
  const data = useSelector(getSelectedMovie);
  const credits = useSelector(getSelectedMovieCredit);
  const videos = useSelector(getSelectedMovieVideo);

  console.log("file: MovieDetail.js - line 40 - videos", videos);
  const isLoading = useSelector(getIsLoading);
  const [isFavorite, setFavorite] = useState(
    favMovies.some((item) => item.id == id)
  );
  const {
    title,
    overview,
    vote_average,
    tagline,
    poster_path,
    release_date,
    runtime,
    backdrop_path,
    homepage,
    imdb_id,
    genres,
  } = data;

  const handleClose = () => setShowVideo(false);
  const handleShow = () => setShowVideo(true);

  let videoID =
    videos.results &&
    videos.results.find((video) => video.name === "Official Trailer").key;
  console.log("file: MovieDetail.js - line 77 - videoID", videoID);

  const [isWatchList, setIsWatchList] = useState(
    watchListMovies.some((item) => item.id == id)
  );

  const baseImgUrl = "https://image.tmdb.org/t/p";
  const size = "w500";
  const backgroundSize = "w1280";
  let tempMoviePath = poster_path
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

  let tempBackPath = `${baseImgUrl}/${backgroundSize}${backdrop_path}`;

  useEffect(() => {
    dispatch(fetchAsyncMovieDetail(id));
    dispatch(fetchAsyncMovieCredits(id));
    dispatch(fetchAsyncMovieVideos(id));
    return () => {
      dispatch(removeSelectedMovie());
      dispatch(removeSelectedMovieCredit());
      dispatch(removeSelectedMovieVideo());
    };
  }, [dispatch, id]);

  return (
    <>
      <div
        className="position-relative"
        style={{
          backgroundImage: `url(${tempBackPath})`,
          backgroundSize: "contain",
        }}
      >
        <div className="position-absolute opacity-layer w-100 h-100"></div>
        <div className="container mr-auto">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="row pt-4">
              <Card className="movie-detail">
                <div className="row no-gutters">
                  <div className="col-sm-5 p-4">
                    <div className="text-center">
                      <Card.Img
                        className="movie-detail__image"
                        src={tempMoviePath}
                      ></Card.Img>
                      <div className="p-3 d-flex justify-content-center">
                        <a
                          className="movie-detail__imdb"
                          href={`https://www.imdb.com/title/${imdb_id}`}
                          target="_blank"
                        >
                          <img
                            className="img img-fluid mr-2"
                            src={imdb}
                            alt="IMDB Page of Movie"
                          />
                        </a>

                        <div
                          className="movie-detail__trailer"
                          onClick={handleShow}
                        >
                          <FontAwesomeIcon icon="fa-solid fa-video" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-7">
                    <Card.Body>
                      <h1 className="mt-3">
                        {title}
                        {""}

                        <span>
                          ({release_date && release_date.split("-")[0]})
                        </span>
                      </h1>
                      <div className="d-flex mt-3 align-items-center">
                        {genres &&
                          genres.map((genre) => {
                            return (
                              <div
                                className="movie-detail__genre mr-2"
                                key={genre.id}
                              >
                                {genre.name}
                              </div>
                            );
                          })}
                        <span
                          className="movie-detail__btns mr-2"
                          onClick={addToFavoritesHandler}
                        >
                          {isFavorite ? (
                            <FontAwesomeIcon icon="fa-solid fa-heart" />
                          ) : (
                            <FontAwesomeIcon icon="fa-regular fa-heart" />
                          )}
                        </span>
                        <span
                          className="movie-detail__btns"
                          onClick={addToWatchlistHandler}
                        >
                          {isWatchList ? (
                            <FontAwesomeIcon icon="fa-solid fa-bookmark" />
                          ) : (
                            <FontAwesomeIcon icon="fa-regular fa-bookmark" />
                          )}
                        </span>
                      </div>

                      <h2 className="mt-4">{tagline}</h2>
                      <div className="movie-detail__summary mt-4">
                        <span className="mb-2">Özet : </span>
                        <div>{overview}</div>
                      </div>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
      <div className="container mr-auto mt-4">
        <div className="cast-detail__header mb-2">Cast</div>
        <div className="row">
          <div className="cast-detail">
            {isLoading ? (
              <Loading />
            ) : (
              <div className="row mb-4">
                {credits.cast &&
                  credits.cast.slice(0, 12).map((credit, id) => {
                    return (
                      <div
                        className="cast-detail__container text-center col-lg-2 col-md-4 my-2"
                        key={id}
                      >
                        <img
                          className="cast-detail__image img img-fluid mb-2"
                          src={
                            credit.profile_path
                              ? `${baseImgUrl}/${size}${credit.profile_path}`
                              : errorImage
                          }
                        ></img>
                        <div className="cast-detail__actor">
                          <div className="cast-detail__name">{credit.name}</div>
                          <div className="cast-detail__role ">
                            {credit.character}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        show={showVideo}
        fullscreen="lg-down"
        onHide={handleClose}
        size="lg"
        dialogClassName="modal-90w justify-content-center"
        contentClassName="w-auto trailerContent"
        centered
      >
        <Modal.Body>
          {videoID ? (
            <YouTube videoId={videoID} opts={opts} />
          ) : (
            <PageNotFound />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MovieDetail;
{
  /* <div
className="detail-card d-flex col-sm-12 col-md-12 m-4"
key={id}
>
<div>
  <img
    className="detail-card__image m-3 rounded"
    src={tempMoviePath}
  ></img>
  <div>
    <span>website</span>
    <span>imdb</span>
  </div>
</div>

<div className="m-4">
  <div className="detail-card__title mb-4">{title}</div>
  <div className="detail-card__tagline mt-4">"{tagline}"</div>
  <div className="detail-card__overview mt-4">{overview}</div>
  <div className="detail-card__popularity mt-2">
    Rating : {vote_average}
  </div>
  <div className="detail-card__release mt-1">
    Release Date : {release_date}
  </div>
  <div className="detail-card__release mt-1">{runtime} m</div>
</div>
</div> 


<Card className="movie-detail">
                <Card.Body className="d-flex">
                  <div className="movie-detail__left mr-3">
                    <Card.Img
                      className="movie-detail__image"
                      src={tempMoviePath}
                    ></Card.Img>
                    <div className="p-3 text-center">
                      <a href={`https://www.imdb.com/title/${imdb_id}`} target="_blank">
                        <img className="img img-fluid mr-2" src={imdb} alt="IMDB Page of Movie" />
                      </a>
                    </div>
                  </div>
                  <div className="movie-detail__right p-3">
                    <h1 className="mb-5">{title} <span>({release_date})</span></h1>
                    <div className="d-flex mb-3 mr-3 align-items-center">
                      {genres && genres.map((genre) => {
                        return <div className="p-1 mr-2 movie-detail__right_genre" key={genre.id}>{genre.name}</div>;
                      })}
                      <div className="d-flex">
                      <span
                        className="movie-detail__btns mr-3"
                        onClick={addToFavoritesHandler}
                      >
                        {isFavorite ? (
                          <FontAwesomeIcon icon="fa-solid fa-heart" />
                        ) : (
                          <FontAwesomeIcon icon="fa-regular fa-heart" />
                        )}
                      </span>
                      <span
                        className="movie-detail__btns"
                        onClick={addToWatchlistHandler}
                      >
                        {isWatchList ? (
                          <FontAwesomeIcon icon="fa-solid fa-bookmark" />
                        ) : (
                          <FontAwesomeIcon icon="fa-regular fa-bookmark" />
                        )}
                      </span>
                    </div>
                    </div>
                    
                    <h2 className="mt-3">{tagline}</h2>
                    <div className="movie-detail__summary mt-3">
                      <span className="mb-2">Özet : </span>
                       <div>{overview}</div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
*/
}
