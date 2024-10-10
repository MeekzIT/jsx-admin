import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import MainLayout from "./containers/layout/layout";
import { setAuthAction } from "./store/actions/auth-action";

function App() {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      dispatch(setAuthAction(true));
    }
  }, [dispatch, token]);

  return (
    <div>
      <MainLayout />
    </div>
  );
}

export default App;
