import {
  BOARD_PAGE,
  CONSTRUCTOR_PAGE,
  EQUIPMENT_PAGE,
  HOME_PAGE,
  LOGIN_PAGE,
  MODULE_PAGE,
  SELF_PAGE,
  SERVICES_PAGE,
} from "./pats";
import HomePage from "../Pages/home/Home";
import LoginPage from "../Pages/login/Login";
import ServicesPage from "../Pages/services/Services";
import SelfPage from "../Pages/self/Self";
import ModulePage from "../Pages/module/Module";
import EquipmentPage from "../Pages/equipment/Equipment";
import ConstructorPage from "../Pages/constructor/Constructor";
import BoardPage from "../Pages/board/Board";

export const isAuthPages = [
  { id: 1, path: HOME_PAGE, Component: <HomePage /> },
  { id: 2, path: SERVICES_PAGE, Component: <ServicesPage /> },
  { id: 3, path: SELF_PAGE, Component: <SelfPage /> },
  { id: 4, path: MODULE_PAGE, Component: <ModulePage /> },
  { id: 5, path: EQUIPMENT_PAGE, Component: <EquipmentPage /> },
  { id: 6, path: BOARD_PAGE, Component: <BoardPage /> },
  { id: 7, path: CONSTRUCTOR_PAGE, Component: <ConstructorPage /> },
];

export const notAuthPages = [{ id: 2, path: LOGIN_PAGE, Component: LoginPage }];
