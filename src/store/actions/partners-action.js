import axios from "axios";
import Swal from "sweetalert2";
import { keys } from "../../keys";
import {
  ADD_PARTNERS,
  DEL_PARTNERS,
  EDIT_PARTNERS,
  GET_PARTNERS,
} from "../types";

export const getData = () => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/partners`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then(function (response) {
        if (response.data.succes) {
          dispatch({ type: GET_PARTNERS, payload: response.data.data });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

export const editData = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/partners/edit`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then(function (response) {
        if (response.data.succes) {
          dispatch({
            type: EDIT_PARTNERS,
            payload: data,
          });
          Swal.fire({
            position: "center",
            iconColor: "#008491",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
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

export const deleteData = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/partners/destroy`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then(function (response) {
        if (response.data.succes) {
          dispatch({
            type: DEL_PARTNERS,
            payload: data,
          });
          Swal.fire({
            position: "center",
            iconColor: "#008491",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
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

export const addData = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/partners`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then(function (response) {
        if (response.data.succes) {
          dispatch({
            type: ADD_PARTNERS,
            payload: data,
          });
          Swal.fire({
            position: "center",
            iconColor: "#008491",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
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
