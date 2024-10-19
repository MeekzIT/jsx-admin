import {
  ADD_SPARE,
  DELETE_SPARE,
  EDIT_SPARE,
  GET_SPARE,
  ADD_SPARE_IMAGE,
  DELETE_SPARE_IMAGE,
} from "../types";

const initialState = {
  data: [],
};

export const spareReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPARE:
      return { ...state, data: action.payload };

    case EDIT_SPARE:
      return {
        ...state,
        data: state.data.map((service) =>
          service.id === action.payload.id
            ? { ...service, ...action.payload }
            : service
        ),
      };

    case DELETE_SPARE:
      return {
        ...state,
        data: state.data.filter((service) => service.id !== action.payload.id),
      };

    case ADD_SPARE:
      return {
        ...state,
        data: [...state.data, action.payload],
      };

    case ADD_SPARE_IMAGE:
      return {
        ...state,
        data: state.data.map((service) =>
          service.id === action.payload.id
            ? {
                ...service,
                SelfWashImages: [
                  ...(service.SelfWashImages || []),
                  action.payload.newImage,
                ],
              }
            : service
        ),
      };

    case DELETE_SPARE_IMAGE:
      return {
        ...state,
        data: state.data.map((service) =>
          service.id === action.payload.id
            ? {
                ...service,
                SelfWashImages: service.SelfWashImages.filter(
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
