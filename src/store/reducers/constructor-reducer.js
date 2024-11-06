import {
  ADD_CONSTRUCTOR,
  ADD_OPTION,
  DELETE_CONSTRUCTOR,
  EDIT_CONSTRUCTOR,
  GET_CONSTRUCTOR,
  GET_SINGLE_CONSTRUCTOR,
  GET_SINGLE_CONSTRUCTOR_ITEM,
  SET_COPY,
} from "../types";

const initialState = {
  data: null,
  single: null,
  service: null,
  copy: null,
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONSTRUCTOR:
      return { ...state, data: action.payload };
    case GET_SINGLE_CONSTRUCTOR:
      return { ...state, single: action.payload };
    case GET_SINGLE_CONSTRUCTOR_ITEM:
      return { ...state, service: action.payload };
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
    case ADD_OPTION:
      return;
    case EDIT_CONSTRUCTOR:
      return {
        ...state,
        data: state.data.map((service) =>
          service.id === action.payload.id
            ? { ...service, ...action.payload }
            : service
        ),
      };
    case SET_COPY:
      return {
        ...state,
        copy: action.payload,
      };
    default:
      return state;
  }
};
