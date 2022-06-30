import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Nav, Navbar, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
  fetchAsyncMovies,
  fetchAsyncSearchMovies,
  setColorTheme,
  getColorTheme,
} from "../../features/movies/movieSlice";

import { useNavigate } from "react-router-dom";

library.add(fas);

const Header = () => {
  const themeColor = useSelector(getColorTheme);
  console.log("themeColor: ", typeof themeColor);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  //	const [suggestions, setSuggestions] = useState([]);
  const [theme, setTheme] = useState(themeColor);
  console.log("theme: ", theme);

  useEffect(() => {
    dispatch(fetchAsyncMovies());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAsyncSearchMovies({ term, currentPage: 1 }));
  }, [term]);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (term === "") {
      navigate("/error/");
    } else {
      dispatch(fetchAsyncSearchMovies({ term, currentPage: 1 }));
      navigate(`/searchResults/${term}`);
      setTerm("");
    }
  };

  //const searchSuggestionsHandler = term => {};
  const searchChangeHandler = (term) => {
    /* 	let matches = [];
		if (term.length > 0) {
			matches =
				allMovies.results &&
				allMovies.results.filter(movie => {
					const regex = new RegExp(`${term}`, "gi");
					return movie.title.match(regex);
				});
		}
		setSuggestions(matches); */
    setTerm(term);
  };

  /* 	const onSuggestClickHandler = term => {
		setTerm(term);
		setSuggestions([]);
	}; */

  return (
    <div className="header-app">
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        className="header-app__navbar"
      >
        <Container>
          <Navbar.Brand href={"/"}>
            <div className="header-app__brand">
              <strong>The Movie DataBase</strong>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="header-navbar-id" />
          <Navbar.Collapse id="header-navbar-id">
            <Nav className="me-auto">
              <Nav.Link className="mx-lg-3" href={`/watchList`}>
                <FontAwesomeIcon icon="fa-solid fa-film" />
                <span className="ml-2">WatchList</span>
              </Nav.Link>
              <Nav.Link eventKey={2} href={`/favoriteMovies`}>
                <FontAwesomeIcon icon="fa-solid fa-heart" />
                <span className="favorites-header ml-2">Favorites</span>
              </Nav.Link>
            </Nav>
            <Nav className="ml-auto"></Nav>
            <Nav className="header-app__search ml-auto">
              <form
                onSubmit={searchSubmitHandler}
                className="form-inline my-2 my-lg-0"
              >
                <input
                  className="form-control mr-sm-2"
                  name="search-bar"
                  type="text"
                  placeholder="Search"
                  value={term}
                  //	onKeyDown={e => searchSuggestionsHandler(e.target.value)}
                  onChange={(e) => searchChangeHandler(e.target.value)}
                  /* onBlur={() => {
										setTimeout(() => {
											setSuggestions([]);
										}, 100);
									}} */
                />

                {/* 			<div className="suggestions-cont">
									{suggestions &&
										suggestions.map((suggestion, id) => {
											return (
												<div
													key={id}
													className="suggestion-item m-2 pl-1"
													onClick={() => {
														onSuggestClickHandler(suggestion.title);
													}}
												>
													{suggestion.title}
												</div>
											);
										})}
								</div> */}
              </form>
              <div
                className="switch-icon"
                onClick={() => {
                  dispatch(setColorTheme(themeColor));
                  setTheme(themeColor);
                }}
              >
                {themeColor === "lightMode" ? (
                  <div>
                    <FontAwesomeIcon
                      className="dark-icon p-2"
                      icon="fa-solid fa-moon"
                    />
                    <span className="d-lg-none">Night Mode</span>
                  </div>
                ) : (
                  <div>
                    <FontAwesomeIcon
                      className="light-icon p-2"
                      icon="fa-solid fa-sun"
                    />
                    <span className="d-lg-none">Day</span>
                  </div>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
