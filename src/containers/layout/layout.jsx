import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useIsMobile } from "../../hooks/useScreenType";
import { isAuthPages, notAuthPages } from "../../routing/routes";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

import "./layout.css";

export default function MainLayout() {
  const isMobile = useIsMobile();
  const [close, setClose] = useState(!isMobile);
  const auth = useSelector((state) => state.auth.isAuth);
  const data = useSelector((state) => state.auth.admin);
  useEffect(() => {
    setClose(!isMobile);
  }, [isMobile]);

  return (
    <div className="home">
      {data?.role == "owner" ? (
        data?.subscribe && close ? (
          <Sidebar close={close} setClose={setClose} />
        ) : data?.variant == "0" && close ? (
          <Sidebar close={close} setClose={setClose} />
        ) : null
      ) : (
        close && <Sidebar close={close} setClose={setClose} />
      )}
      <div
        className="homeContainer"
        style={{ display: isMobile && close ? "none" : "block" }}
      >
        <Navbar close={close} setClose={setClose} />

        <Routes>
          {auth
            ? isAuthPages.map((i) => {
                return <Route path={i.path} element={i.Component} key={i.id} />;
              })
            : notAuthPages.map((i) => {
                return (
                  <Route path={i.path} element={<i.Component />} key={i.id} />
                );
              })}
        </Routes>
      </div>
    </div>
  );
}
