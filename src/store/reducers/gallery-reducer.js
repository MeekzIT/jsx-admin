import { GET_GALLERY, DEL_GALLERY, ADD_GALLERY, EDIT_GALLERY } from "../types";

const initialState = {
  data: [],
};

export const galleryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GALLERY:
      return { ...state, data: action.payload };

    case DEL_GALLERY:
      return {
        ...state,
        data: state.data.filter((service) => service.id !== action.payload.id),
      };
    case EDIT_GALLERY:
      return {
        ...state,
        data: state.data.map((service) =>
          service.id === action.payload.id
            ? { ...service, ...action.payload }
            : service
        ),
      };

    case ADD_GALLERY:
      console.log(action, "[[[[");

      return {
        ...state,
        data: [...state.data, action.payload],
      };

    default:
      return state;
  }
};
