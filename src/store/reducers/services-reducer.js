import {
  ADD_SERVICES,
  DELETE_SERVICES,
  EDIT_SERVICES,
  GET_SERVICES,
} from "../types";

const initialState = {
  data: [],
};

export const servicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SERVICES:
      return { ...state, data: action.payload };
    case EDIT_SERVICES:
      return {
        ...state,
        data: state.data.map((service) =>
          service.id === action.payload.id
            ? { ...service, ...action.payload }
            : service
        ),
      };
    case DELETE_SERVICES:
      return {
        ...state,
        data: state.data.filter((service) => service.id !== action.payload.id),
      };
    case ADD_SERVICES:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    default:
      return state;
  }
};
