import { GET_PARTNERS, DEL_PARTNERS, ADD_PARTNERS, EDIT_PARTNERS } from "../types";

const initialState = {
  data: [],
};

export const partnersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PARTNERS:
      return { ...state, data: action.payload };

    case DEL_PARTNERS:
      return {
        ...state,
        data: state.data.filter((service) => service.id !== action.payload.id),
      };
    case EDIT_PARTNERS:
      return {
        ...state,
        data: state.data.map((service) =>
          service.id === action.payload.id
            ? { ...service, ...action.payload }
            : service
        ),
      };

    case ADD_PARTNERS:

      return {
        ...state,
        data: [...state.data, action.payload],
      };

    default:
      return state;
  }
};
