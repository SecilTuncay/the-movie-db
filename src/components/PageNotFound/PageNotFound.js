import React from "react";
import error from "../../images/page-error.png";

const PageNotFound = () => {
	return (
		<div className="container">
			<div className="error-page row justify-content-center align-middle">
				<img className="m-4" src={error} alt="error" />
			</div>
		</div>
	);
};

export default PageNotFound;
