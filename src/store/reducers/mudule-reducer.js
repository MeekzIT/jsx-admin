import {
  ADD_MODULE,
  DELETE_MODULE,
  EDIT_MODULE,
  GET_MODULE,
  ADD_MODULE_IMAGE,
  DELETE_MODULE_IMAGE,
} from "../types";

const initialState = {
  data: [],
};

export const moduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MODULE:
      return { ...state, data: action.payload };

    case EDIT_MODULE:
      return {
        ...state,
        data: state.data.map((service) =>
          service.id === action.payload.id
            ? { ...service, ...action.payload }
            : service
        ),
      };

    case DELETE_MODULE:
      return {
        ...state,
        data: state.data.filter((service) => service.id !== action.payload.id),
      };

    case ADD_MODULE:
      return {
        ...state,
        data: [...state.data, action.payload],
      };

    case ADD_MODULE_IMAGE:
      return {
        ...state,
        data: state.data.map((service) =>
          service.id === action.payload.id
            ? {
                ...service,
                ModuleImages: [
                  ...(service.ModuleImages || []),
                  action.payload.newImage,
                ],
              }
            : service
        ),
      };

    case DELETE_MODULE_IMAGE:
      return {
        ...state,
        data: state.data.map((service) =>
          service.id === action.payload.id
            ? {
                ...service,
                ModuleImages: service.ModuleImages.filter(
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
