import axios from "axios";
import {
  MOVIES_INFO_REQUEST,
  MOVIES_INFO_SUCCESS,
  MOVIES_INFO_ERROR,
  MOVIE_DETAILS_ERROR,
  MOVIE_DETAILS_REQUEST,
  MOVIE_DETAILS_SUCCESS,
  MOVIE_DETAILS_CLEAR,
  MOVIE_CHANGE_PAGE_NUMBER,
} from "../constants/constants";

export const getMoviesInfo = page => dispatch => {
  dispatch({
    type: MOVIES_INFO_REQUEST
  });

  axios
    .get(
      `http://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&page=${page}`
    )
    .then(response => {
      dispatch({ type: MOVIES_INFO_SUCCESS, payload: response });
    })
    .catch(err => {
      dispatch({ type: MOVIES_INFO_ERROR, payload: err });
    });
};

export const getMovieDetails = pathname => dispatch => {
  dispatch({
    type: MOVIE_DETAILS_REQUEST
  });

  axios
    .get(
      `http://api.themoviedb.org/3/movie${pathname}?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c`
    )
    .then(response => {
      dispatch({ type: MOVIE_DETAILS_SUCCESS, payload: response });
    })
    .catch(err => {
      dispatch({ type: MOVIE_DETAILS_ERROR, payload: err });
    });
};

export const clearMovieDetails = () => {
  return {
    type: MOVIE_DETAILS_CLEAR,
    payload: {}
  };
};

export const changePageNumber = page => {
  return {
    type: MOVIE_CHANGE_PAGE_NUMBER,
    payload: page
  };
};
