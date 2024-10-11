import {
  ADD_BOARD,
  DELETE_BOARD,
  EDIT_BOARD,
  GET_BOARD,
  ADD_BOARD_IMAGE,
  DELETE_BOARD_IMAGE,
} from "../types";

const initialState = {
  data: [],
};

export const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOARD:
      return { ...state, data: action.payload };

    case EDIT_BOARD:
      return {
        ...state,
        data: state.data.map((service) =>
          service.id === action.payload.id
            ? { ...service, ...action.payload }
            : service
        ),
      };

    case DELETE_BOARD:
      return {
        ...state,
        data: state.data.filter((service) => service.id !== action.payload.id),
      };

    case ADD_BOARD:
      return {
        ...state,
        data: [...state.data, action.payload],
      };

    case ADD_BOARD_IMAGE:
      return {
        ...state,
        data: state.data.map((service) =>
          service.id === action.payload.id
            ? {
                ...service,
                BoardImages: [
                  ...(service.BoardImages || []),
                  action.payload.newImage,
                ],
              }
            : service
        ),
      };

    case DELETE_BOARD_IMAGE:
      return {
        ...state,
        data: state.data.map((service) =>
          service.id === action.payload.id
            ? {
                ...service,
                BoardImages: service.BoardImages.filter(
                  (image) => image.id !== action.payload.imageId
                ),
              }
            : service
        ),
      };

    default:
      return state;
  }
};
