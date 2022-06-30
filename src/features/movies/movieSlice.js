import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieDatabaseApi from "../../common/apis/movieDatabaseApi";
import { APIKey } from "../../common/apis/movieDatabaseApiKey";

export const fetchAsyncTrendingMovies = createAsyncThunk(
  "movies/fetchAsyncTrendingMovies",
  async (currentPage) => {
    const response = await movieDatabaseApi.get(
      `/trending/movie/week?page=${currentPage}&api_key=${APIKey}`
    );
    return response.data;
  }
);
export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async () => {
    const response = await movieDatabaseApi.get(
      `/trending/movie/week?&api_key=${APIKey}`
    );
    return response.data;
  }
);

export const fetchAsyncSearchMovies = createAsyncThunk(
  "movies/fetchAsyncSearchMovies",
  async ({ term, currentPage }) => {
    const response = await movieDatabaseApi.get(
      /* 			`/search/movie?&api_key=${APIKey}&query=${term}` */
      `/search/movie?api_key=${APIKey}&query=${term}?&page=${currentPage}`
    );
    return response.data;
  }
);

export const fetchAsyncMovieDetail = createAsyncThunk(
  "movies/fetchAsyncMovieDetail",
  async (id) => {
    const response = await movieDatabaseApi.get(
      `movie/${id}?api_key=${APIKey}`
    );
    return response.data;
  }
);
export const fetchAsyncMovieCredits = createAsyncThunk(
  "movies/fetchAsyncMovieCredits",
  async (id) => {
    const response = await movieDatabaseApi.get(
      `movie/${id}/credits?api_key=${APIKey}`
    );
    return response.data;
  }
);
export const fetchAsyncMovieVideos = createAsyncThunk(
  "movies/fetchAsyncMovieVideos",
  async (id) => {
    const response = await movieDatabaseApi.get(
      `movie/${id}/videos?api_key=${APIKey}`
    );
    return response.data;
  }
);

const initialState = {
  trending: [],
  movies: [],
  watchList: localStorage.getItem("watchList")
    ? JSON.parse(localStorage.getItem("watchList"))
    : [],
  favoriteMovies: localStorage.getItem("favoriteMovies")
    ? JSON.parse(localStorage.getItem("favoriteMovies"))
    : [],
  selectedMovie: {},
  selectedMovieCredit: {},
  selectedMovieVideo: {},
  searchResults: [],
  isLoading: true,
  colorTheme: localStorage.getItem("themeColor"),
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovie: (state) => {
      state.selectedMovie = {};
    },
    removeSelectedMovieCredit: (state) => {
      state.selectedMovieCredit = {};
    },
    removeSelectedMovieVideo: (state) => {
      state.selectedMovieVideo = {};
    },
    addToFavorites: (state, { payload }) => {
      const existingFavIndex = state.favoriteMovies.findIndex(
        (item) => item.id === payload.id
      );

      if (existingFavIndex >= 0) {
        state.favoriteMovies[existingFavIndex] = {
          ...state.favoriteMovies[existingFavIndex],
        };
      } else {
        state.favoriteMovies.push(payload);
      }
      localStorage.setItem(
        "favoriteMovies",
        JSON.stringify(state.favoriteMovies)
      );
    },
    removeFromFavorites(state, action) {
      state.favoriteMovies.map((favMovie) => {
        if (favMovie.id === action.payload.id) {
          const nextFavMovies = state.favoriteMovies.filter(
            (item) => item.id !== favMovie.id
          );
          state.favoriteMovies = nextFavMovies;
        }
        localStorage.setItem(
          "favoriteMovies",
          JSON.stringify(state.favoriteMovies)
        );
        return state;
      });
    },
    addToWatchlist: (state, { payload }) => {
      const existingListIndex = state.watchList.findIndex(
        (item) => item.id === payload.id
      );

      if (existingListIndex >= 0) {
        state.watchList[existingListIndex] = {
          ...state.watchList[existingListIndex],
        };
      } else {
        state.watchList.push(payload);
      }
      localStorage.setItem("watchList", JSON.stringify(state.watchList));
    },
    removeFromWatchlist(state, action) {
      state.watchList.map((watchListItem) => {
        if (watchListItem.id === action.payload.id) {
          const nextWatchListItem = state.watchList.filter(
            (item) => item.id !== watchListItem.id
          );
          state.watchList = nextWatchListItem;
        }
        localStorage.setItem("watchList", JSON.stringify(state.watchList));
        return state;
      });
    },
    setColorTheme(state) {
      if (state.colorTheme == "darkMode") {
        state.colorTheme = "lightMode";
      } else {
        state.colorTheme = "darkMode";
      }
      console.log("state.colorTheme: ", state.colorTheme);

      localStorage.setItem("themeColor", state.colorTheme);
    },
  },
  extraReducers: {
    /*Fetch All Movies start*/
    [fetchAsyncMovies.pending]: (state) => {
      console.log("Pending");
      return { ...state, isLoading: true };
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      return { ...state, movies: payload, isLoading: false };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("Rejected!");
    },
    /*end*/
    /*Fetch Trending Movies start*/
    [fetchAsyncTrendingMovies.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncTrendingMovies.fulfilled]: (state, { payload }) => {
      return { ...state, trending: payload };
    },
    [fetchAsyncTrendingMovies.rejected]: () => {
      console.log("Rejected!");
    },
    /*end*/
    /*Fetch Search Results start*/
    [fetchAsyncSearchMovies.pending]: () => {
      console.log("Searching");
    },
    [fetchAsyncSearchMovies.fulfilled]: (state, { payload }) => {
      console.log("Found!");
      return { ...state, searchResults: payload };
    },
    [fetchAsyncSearchMovies.rejected]: () => {},
    /*end*/
    /*Fetch Movie Detail start*/
    [fetchAsyncMovieDetail.pending]: (state) => {
      console.log("Searching");
      return { ...state, isLoading: true };
    },
    [fetchAsyncMovieDetail.fulfilled]: (state, { payload }) => {
      console.log("Fetched Movie Successfully!");
      return { ...state, selectedMovie: payload, isLoading: false };
    },
    [fetchAsyncMovieDetail.rejected]: (state, { payload }) => {
      console.log("Not Found!");
    },
    /*end*/
    /*Fetch Movie Detail start*/
    [fetchAsyncMovieCredits.pending]: (state) => {
      console.log("Searching");
      return { ...state, isLoading: true };
    },
    [fetchAsyncMovieCredits.fulfilled]: (state, { payload }) => {
      console.log("Fetched Movie Successfully!");
      return { ...state, selectedMovieCredit: payload, isLoading: false };
    },
    [fetchAsyncMovieCredits.rejected]: (state, { payload }) => {
      console.log("Not Found!");
    },
    /*end*/
    /*Fetch Movie Video start*/
    [fetchAsyncMovieVideos.pending]: (state) => {
      console.log("Searching");
      return { ...state, isLoading: true };
    },
    [fetchAsyncMovieVideos.fulfilled]: (state, { payload }) => {
      console.log("Fetched Movie Successfully!");
      return { ...state, selectedMovieVideo: payload, isLoading: false };
    },
    [fetchAsyncMovieVideos.rejected]: (state, { payload }) => {
      console.log("Not Found!");
    },
    /*end*/
  },
});

export const {
  removeSelectedMovie,
  addToFavorites,
  removeFromFavorites,
  addToWatchlist,
  removeFromWatchlist,
  removeSelectedMovieCredit,
  removeSelectedMovieVideo,
  setColorTheme,
} = movieSlice.actions;

export const getTrendingMovies = (state) => state.movies.trending;
export const getAllMovies = (state) => state.movies.movies;
export const getSearchResults = (state) => state.movies.searchResults;
export const getSelectedMovie = (state) => state.movies.selectedMovie;
export const getSelectedMovieCredit = (state) =>
  state.movies.selectedMovieCredit;
export const getSelectedMovieVideo = (state) => state.movies.selectedMovieVideo;
export const getFavoriteMovies = (state) => state.movies.favoriteMovies;
export const getWatchList = (state) => state.movies.watchList;
export const getIsLoading = (state) => state.movies.isLoading;
export const getColorTheme = (state) => state.movies.colorTheme;
export default movieSlice.reducer;
