import {
  GET_INITIAL_DATA,
  IS_INTIAL_DATA_LOADING,
  ON_INPUT_SEARCH_FIELD,
  HANDLE_CLEAR_SEARCH_INPUT,
} from "../constants/ActionTypes";
import { BASE_URL } from "../constants/ApiConstants";
import axios from "axios";

export const landingActions = (page) => {
  return (dispatch) => {
    dispatch({ type: IS_INTIAL_DATA_LOADING, payload: page });
    axios
      .get(BASE_URL + page)
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: GET_INITIAL_DATA, payload: res.data });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const handleSearchInput = (value) => {
  return (dispatch) => {
    dispatch({ type: ON_INPUT_SEARCH_FIELD, payload: value });
  };
};

export const handleClearSearchField = () => {
  return (dispatch) => {
    dispatch({ type: HANDLE_CLEAR_SEARCH_INPUT });
  };
};
