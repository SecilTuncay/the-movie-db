import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

function Footer() {
	return (
		<footer className="mt-4">
			<div className="container d-md-flex p-3 justify-content-between align-items-center">
				<div className="me-md-auto text-center text-md-start">
					<div>
						<span>The Movie DataBase </span>&copy; All Rights Reserved.
					</div>
				</div>
				<a href="https://twitter.com/themoviedb" target="_blank">
					<div className="d-flex pt-3 pt-md-0 justify-content-center">
						<div className="text-white m-2">
							<FontAwesomeIcon icon={faTwitter} />
						</div>
					</div>
				</a>
			</div>
		</footer>
	);
}

export default Footer;
