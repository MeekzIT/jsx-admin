import {
  ADD_EQUIPMENT,
  DELETE_EQUIPMENT,
  EDIT_EQUIPMENT,
  GET_EQUIPMENT,
  ADD_EQUIPMENT_IMAGE,
  DELETE_EQUIPMENT_IMAGE,
} from "../types";

const initialState = {
  data: [],
};

export const equipmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EQUIPMENT:
      return { ...state, data: action.payload };

    case EDIT_EQUIPMENT:
      return {
        ...state,
        data: state.data.map((service) =>
          service.id === action.payload.id
            ? { ...service, ...action.payload }
            : service
        ),
      };

    case DELETE_EQUIPMENT:
      return {
        ...state,
        data: state.data.filter((service) => service.id !== action.payload.id),
      };

    case ADD_EQUIPMENT:
      return {
        ...state,
        data: [...state.data, action.payload],
      };

    case ADD_EQUIPMENT_IMAGE:
      return {
        ...state,
        data: state.data.map((service) =>
          service.id === action.payload.id
            ? {
                ...service,
                EquipmentImages: [
                  ...(service.EquipmentImages || []),
                  action.payload.newImage,
                ],
              }
            : service
        ),
      };

    case DELETE_EQUIPMENT_IMAGE:
      return {
        ...state,
        data: state.data.map((service) =>
          service.id === action.payload.id
            ? {
                ...service,
                EquipmentImages: service.EquipmentImages.filter(
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
