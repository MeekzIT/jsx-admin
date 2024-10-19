import { ADD_CONSTRUCTOR, DELETE_CONSTRUCTOR, EDIT_CONSTRUCTOR, GET_CONSTRUCTOR } from "../types";

const initialState = {
  data: null,
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONSTRUCTOR:
      return { ...state, data: action.payload };
    case ADD_CONSTRUCTOR:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case DELETE_CONSTRUCTOR:
      return {
        ...state,
        data: state.data.filter((service) => service.id !== action.payload.id),
      };
    case EDIT_CONSTRUCTOR:
      return {
        ...state,
        data: state.data.map((service) =>
          service.id === action.payload.id
            ? { ...service, ...action.payload }
            : service
        ),
      };
    default:
      return state;
  }
};
