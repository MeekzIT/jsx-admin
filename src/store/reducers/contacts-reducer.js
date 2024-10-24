import { GET_CONTACTS } from "../types";

const initialState = {
  newQuestions: [],
  oldQuestions: [],
};

export const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        newQuestions: action.payload.newQuestions,
        oldQuestions: action.payload.oldQuestions,
      };

    default:
      return state;
  }
};
