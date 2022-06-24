import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import errorImage from "../../images/image-error.png";
import {
  fetchAsyncMovieDetail,
  fetchAsyncMovieCredits,
  getIsLoading,
  getSelectedMovie,
  getSelectedMovieCredit,
  removeSelectedMovie,
  removeSelectedMovieCredit,
} from "../../features/movies/movieSlice";
import Loading from "../Loading/Loading";
import { Card } from "react-bootstrap";

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(getSelectedMovie);
  const credits = useSelector(getSelectedMovieCredit);
  const isLoading = useSelector(getIsLoading);

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

  const baseImgUrl = "https://image.tmdb.org/t/p";
  const size = "w500";
  const backgroundSize = "w1280";
  let tempMoviePath = poster_path
    ? `${baseImgUrl}/${size}${poster_path}`
    : errorImage;

  let tempBackPath = `${baseImgUrl}/${backgroundSize}${backdrop_path}`;
  console.log("file: MovieDetail.js - line 42 - tempBackPath", tempBackPath);

  useEffect(() => {
    dispatch(fetchAsyncMovieDetail(id));
    dispatch(fetchAsyncMovieCredits(id));
    return () => {
      dispatch(removeSelectedMovie());
      dispatch(removeSelectedMovieCredit());
    };
  }, [dispatch, id]);

  return (
    <>
      <div
        style={{
          background: `url(${tempBackPath})`,
        }}
      >
        <div className="container mr-auto">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="row">
              <Card className="movie-detail d-flex">
                <Card.Body>
                  <div className="movie-detail_left">
                    <Card.Img
                      className="movie-detail__image"
                      src={tempMoviePath}
                    ></Card.Img>
                    <div>
                      <span>Website</span>
                      <span>Imdb</span>
                    </div>
                  </div>
                  <div className="movie-detail_right">
                    <h1>{title}</h1>
                    <div>
                      {genres.map((genre) => {
                        return <div key={genre.id}>{genre.name}</div>;
                      })}
                    </div>
                    <div>
                      <span>add to favs</span>
                      <span>add to watchList</span>
                    </div>
                    <h2>{tagline}</h2>
                    <div>
                      Özet : <br /> {overview}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          )}
        </div>
      </div>
      <div className="container mr-auto mt-4">
        <div className="row">
          <div className="cast-container">
            <div className="cast-header ml-4">Cast</div>
            {isLoading ? (
              <Loading />
            ) : (
              <div className="row justify-content-center mb-4">
                {credits.cast &&
                  credits.cast.slice(0, 5).map((credit, id) => {
                    return (
                      <div
                        className="card-cast-cont d-flex flex-column justify-content-center col-sm-2 col-md-2 m-1"
                        key={id}
                      >
                        <img
                          className="card-cast-image m-3 img-fluid"
                          src={
                            credit.profile_path
                              ? `${baseImgUrl}/${size}${credit.profile_path}`
                              : errorImage
                          }
                        ></img>
                        <div className="card-cast-actor-cont d-flex flex-column justify-content-center ml-4">
                          <div className="card-cast-actor">{credit.name}</div>
                          <div className="card-cast-role ">
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
</div> */
}
