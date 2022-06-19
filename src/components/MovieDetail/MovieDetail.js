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
	removeSelectedMovieCredit
} from "../../features/movies/movieSlice";
import Loading from "../Loading/Loading";

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
		runtime
	} = data;

	const baseImgUrl = "https://image.tmdb.org/t/p";
	const size = "w500";
	let tempMoviePath = poster_path
		? `${baseImgUrl}/${size}${poster_path}`
		: errorImage;

	useEffect(() => {
		dispatch(fetchAsyncMovieDetail(id));
		dispatch(fetchAsyncMovieCredits(id));
		return () => {
			dispatch(removeSelectedMovie());
			dispatch(removeSelectedMovieCredit());
		};
	}, [dispatch, id]);

	return (
		<div className="container mr-auto mt-4">
			{isLoading ? (
				<Loading />
			) : (
				<div className="row">
					<div
						className="detail-card-cont d-flex col-sm-12 col-md-12 m-4"
						key={id}
					>
						<img className="detail-card-image m-3" src={tempMoviePath}></img>
						<div className="detail-card-body m-4">
							<div className="detail-card-title mb-4">{title}</div>
							<div className="detail-tagline mt-4">"{tagline}"</div>
							<div className="detail-card-overview mt-4">{overview}</div>
							<div className="detail-card-popularity mt-2">
								Rating : {vote_average}
							</div>
							<div className="detail-card-release mt-1">
								Release Date : {release_date}
							</div>
							<div className="detail-card-release mt-1">{runtime} m</div>
						</div>
					</div>
				</div>
			)}
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
	);
};

export default MovieDetail;
