import { GET_ORDERS } from "../types";

const initialState = {
  newOrders: [],
  oldOrders: [],
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        newOrders: action.payload.newOrders,
        oldOrders: action.payload.oldOrders,
      };

    default:
      return state;
  }
};
