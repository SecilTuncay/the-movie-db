import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { far } from "@fortawesome/free-regular-svg-icons";
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
import { AiFillBackward } from "react-icons/ai";

const MovieDetail = (props) => {
  const favMovies = useSelector(getFavoriteMovies);
  const watchListMovies = useSelector(getWatchList);
  const { id } = useParams();
  const [showVideo, setShowVideo] = useState(false);
  const navigate = useNavigate();

  const opts = {
    height: "550",
    width: "100%",
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

  let videoID;

  if (videos.results && videos.results.length > 0) {
    videoID = videos.results.find((video) =>
      video.name.includes("Official")
    ).key;
  }

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
            <>
              <div className="row mt-3">
                <div
                  className="movie-detail__btn d-flex align-items-center p-1 position-relative ml-2"
                  onClick={() => navigate(-1)}
                >
                  <span className="d-block mr-1">
                    <AiFillBackward />
                  </span>
                  <span className="d-block">Back</span>
                </div>
              </div>
              <div className="row pt-2">
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
                          {videoID && (
                            <div
                              className="movie-detail__trailer"
                              onClick={handleShow}
                            >
                              <FontAwesomeIcon icon="fa-solid fa-video" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-7">
                      <Card.Body>
                        <h1 className="mt-3">
                          {title}
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
                          <span className="mb-2">Summary : </span>
                          <div>{overview}</div>
                        </div>
                      </Card.Body>
                    </div>
                  </div>
                </Card>
              </div>
            </>
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
      <div className="youtube-wrapper"></div>
      <Modal
        show={showVideo}
        fullscreen="lg-down"
        onHide={handleClose}
        size="lg"
        dialogClassName="modal-90w justify-content-center"
        contentClassName="w-auto trailerContent"
        centered
      >
        {videoID ? (
          <Modal.Body>
            <YouTube videoId={videoID} opts={opts} />
          </Modal.Body>
        ) : (
          <Modal.Body>
            <PageNotFound />
          </Modal.Body>
        )}
      </Modal>
    </>
  );
};

export default MovieDetail;
