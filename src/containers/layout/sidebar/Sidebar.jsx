import ClearAllIcon from "@mui/icons-material/ClearAll";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { themePallete } from "../../..";
import { useIsMobile } from "../../../hooks/useScreenType";
import {
  CONSTRUCTOR_PAGE,
  EQUIPMENT_PAGE,
  HOME_PAGE,
  MODULE_PAGE,
  SELF_PAGE,
  SERVICES_PAGE,
} from "../../../routing/pats";
import jsx from "./logos/jsx.png";
import "./sidebar.css";

const Sidebar = ({ close, setClose }) => {
  let location = useLocation();
  const isMobile = useIsMobile();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const superPages = [
    { id: 1, path: HOME_PAGE, name: "Главная" },
    { id: 2, path: SERVICES_PAGE, name: "Services" },
    { id: 3, path: SELF_PAGE, name: "Мойки Самообслуживания" },
    { id: 4, path: MODULE_PAGE, name: "Модули" },
    { id: 5, path: EQUIPMENT_PAGE, name: "Доп. Оборудования" },
    { id: 6, path: CONSTRUCTOR_PAGE, name: "Cобери сам" },
  ];

  const renderLogo = useMemo(() => {
    return <img src={jsx} alt="jsx" />;
  }, []);

  return (
    <div
      className="sidebar"
      style={{
        background: themePallete,
      }}
    >
      {isAuth && (
        <div className="top">
          <div
            className="logo"
            style={{
              fontSize: "30px",
            }}
          >
            {renderLogo}
          </div>
        </div>
      )}
      {isMobile && (
        <div className="sidebar-close">
          <Tooltip title="Sidebar" arrow>
            {close ? (
              <CloseIcon
                onClick={() => setClose(!close)}
                style={{
                  cursor: "pointer",
                }}
                fontSize="large"
                sx={{ color: "white", fontSize: "25px" }}
              />
            ) : (
              <ClearAllIcon
                onClick={() => setClose(!close)}
                style={{
                  cursor: "pointer",
                }}
                sx={{ color: "white" }}
              />
            )}
          </Tooltip>
        </div>
      )}
      <ul>
        {isAuth &&
          superPages?.map(({ id, path, name }) => {
            return (
              <div key={id}>
                <Link
                  to={path}
                  style={{ textDecoration: "none" }}
                  key={id}
                  className={
                    location.pathname === path ? "activeLink" : "pasiveLink"
                  }
                >
                  <li>{name}</li>
                </Link>
              </div>
            );
          })}
      </ul>
    </div>
  );
};

export default Sidebar;
