import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { isAuthReducer } from "./reducers/auth-reducer";
import { servicesReducer } from "./reducers/services-reducer";
import { selfReducer } from "./reducers/self-reducer";
import { moduleReducer } from "./reducers/mudule-reducer";
import { equipmentReducer } from "./reducers/equipment-reducer";
import { boardReducer } from "./reducers/board-reducer";
import { spareReducer } from "./reducers/spare-reducer";
import { constructorReducer } from "./reducers/constructor-reducer";
import { contactsReducer } from "./reducers/contacts-reducer";
import { orderReducer } from "./reducers/order-reducer";
import { aboutReducer } from "./reducers/about-reducer";
import { galleryReducer } from "./reducers/gallery-reducer";
import { partnersReducer } from "./reducers/partners-reducer";

const rootReducer = combineReducers({
  auth: isAuthReducer,
  services: servicesReducer,
  self: selfReducer,
  module: moduleReducer,
  equipment: equipmentReducer,
  board: boardReducer,
  spare: spareReducer,
  construct: constructorReducer,
  contacts: contactsReducer,
  orders: orderReducer,
  about: aboutReducer,
  gallery: galleryReducer,
  partners: partnersReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
