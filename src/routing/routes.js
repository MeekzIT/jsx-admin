import {
  BOARD_PAGE,
  CONSTRUCTOR__DETAIL_PAGE,
  CONSTRUCTOR_PAGE,
  CONTACT_PAGE,
  EQUIPMENT_PAGE,
  HOME_PAGE,
  LOGIN_PAGE,
  MODULE_PAGE,
  ORDER_PAGE,
  SELF_PAGE,
  SERVICES_PAGE,
  SPARE_PAGE,
} from "./pats";
import HomePage from "../Pages/home/Home";
import LoginPage from "../Pages/login/Login";
import ServicesPage from "../Pages/services/Services";
import SelfPage from "../Pages/self/Self";
import ModulePage from "../Pages/module/Module";
import EquipmentPage from "../Pages/equipment/Equipment";
import ConstructorPage from "../Pages/constructor/Constructor";
import BoardPage from "../Pages/board/Board";
import SparePage from "../Pages/spare/Spare";
import Detail from "../Pages/constructor/Detail";
import Contacts from "../Pages/contacts/Contacts";
import Orders from "../Pages/orders/Orders";

export const isAuthPages = [
  { id: 1, path: HOME_PAGE, Component: <HomePage /> },
  { id: 2, path: SERVICES_PAGE, Component: <ServicesPage /> },
  { id: 3, path: SELF_PAGE, Component: <SelfPage /> },
  { id: 4, path: MODULE_PAGE, Component: <ModulePage /> },
  { id: 5, path: EQUIPMENT_PAGE, Component: <EquipmentPage /> },
  { id: 6, path: BOARD_PAGE, Component: <BoardPage /> },
  { id: 7, path: SPARE_PAGE, Component: <SparePage /> },
  { id: 8, path: CONSTRUCTOR_PAGE, Component: <ConstructorPage /> },
  { id: 9, path: CONSTRUCTOR__DETAIL_PAGE, Component: <Detail /> },
  { id: 10, path: CONTACT_PAGE, Component: <Contacts /> },
  { id: 11, path: ORDER_PAGE, Component: <Orders /> },
];

export const notAuthPages = [{ id: 2, path: LOGIN_PAGE, Component: LoginPage }];
