import {
  ADD_SELF,
  DELETE_SELF,
  EDIT_SELF,
  GET_SELF,
  ADD_SELF_IMAGE,
  DELETE_SELF_IMAGE,
} from "../types";

const initialState = {
  data: [],
};

export const selfReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELF:
      return { ...state, data: action.payload };

    case EDIT_SELF:
      return {
        ...state,
        data: state.data.map((service) =>
          service.id === action.payload.id
            ? { ...service, ...action.payload }
            : service
        ),
      };

    case DELETE_SELF:
      return {
        ...state,
        data: state.data.filter((service) => service.id !== action.payload.id),
      };

    case ADD_SELF:
      return {
        ...state,
        data: [...state.data, action.payload],
      };

    case ADD_SELF_IMAGE:
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

    case DELETE_SELF_IMAGE:
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
