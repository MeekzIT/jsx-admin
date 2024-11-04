import {
  ADD_CONSTRUCTOR,
  ADD_OPTION,
  DELETE_CONSTRUCTOR,
  EDIT_CONSTRUCTOR,
  GET_CONSTRUCTOR,
  GET_SINGLE_CONSTRUCTOR,
  GET_SINGLE_CONSTRUCTOR_ITEM,
} from "../types";

const initialState = {
  data: null,
  single: null,
  service: null,
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
      console.log(action.payload, state.single, "999");
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

    default:
      return state;
  }
};
