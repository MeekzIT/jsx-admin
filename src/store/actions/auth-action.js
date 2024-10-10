import axios from "axios";
import Swal from "sweetalert2";
import { keys } from "../../keys";
import { HOME_PAGE, LOGIN_PAGE } from "../../routing/pats";
import { LOGIN_ACTION, SET_AUTH } from "../types";

export const loginAction = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/auth/sign-in`, data)
      .then(function (response) {
        if (response.data.succes) {
          dispatch({
            type: LOGIN_ACTION,
            payload: {
              isAuth: true,
              data: response.data.data,
              isSuper: response.data.data.role,
            },
          });
          localStorage.setItem(
            "token",
            JSON.stringify(response.data.data.token)
          );
          window.location.href = HOME_PAGE;
        } else
          Swal.fire({
            position: "center",
            iconColor: "#008491",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
            title: "Неправильные Данные",
          });
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

export const setAuthAction = (data) => {
  return (dispatch) => {
    dispatch({ type: SET_AUTH, payload: data });
  };
};

export const logoutAction = () => {
  return (dispatch) => {
    axios
      .post(
        `${keys.api}/auth/sign-out`,
        {},
        {
          headers: {
            Authorization: `Bearer ${keys.token}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.succes) {
          dispatch({ type: SET_AUTH, payload: false });
          localStorage.removeItem("token");
          window.location.href = LOGIN_PAGE;
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};
