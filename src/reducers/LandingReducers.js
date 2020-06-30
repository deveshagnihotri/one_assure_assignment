import {
  GET_INITIAL_DATA,
  IS_INTIAL_DATA_LOADING,
  ON_INPUT_SEARCH_FIELD,
  HANDLE_CLEAR_SEARCH_INPUT,
} from "../constants/ActionTypes";
import { filterSearchByName } from "../utils/CommonUtils";

const INITIAL_STATE = {
  name: "devesh",
  isLoading: false,
  data: {},
  page: 1,
  input: "",
  initialData: [],
};

export default function LandingReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case IS_INTIAL_DATA_LOADING:
      return {
        ...state,
        isLoading: true,
        page: action.payload,
      };
    case GET_INITIAL_DATA:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        initialData: action.payload.data,
      };
    case ON_INPUT_SEARCH_FIELD:
      return {
        ...state,
        input: action.payload,
        initialData: filterSearchByName(state.data.data, action.payload),
      };
    case HANDLE_CLEAR_SEARCH_INPUT:
      return {
        ...state,
        input: "",
        initialData: state.data.data,
      };
    default:
      return state;
  }
}
