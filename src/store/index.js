import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { isAuthReducer } from "./reducers/auth-reducer";

const rootReducer = combineReducers({
  auth: isAuthReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
