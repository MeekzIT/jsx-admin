import { SET_AUTH } from "../types";
import { LOGIN_ACTION } from "../types";

const initialState = {
  isAuth: false,
  admin: null,
};

export const isAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ACTION:
      return {
        ...state,
        isAuth: action.payload.isAuth,
        admin: action.payload.data,
      };
    case SET_AUTH: {
      return {
        ...state,
        isAuth: action.payload,
      };
    }
    default:
      return state;
  }
};
