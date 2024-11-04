import { GET_ABOUT, EDIT_ABOUT } from "../types";

const initialState = {
  data: [],
};

export const aboutReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ABOUT:
      return { ...state, data: action.payload };

    case EDIT_ABOUT:
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
