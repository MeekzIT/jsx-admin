import axios from "axios";
import Swal from "sweetalert2";
import { keys } from "../../keys";
import {
  ADD_SELF,
  ADD_SELF_IMAGE,
  DELETE_SELF,
  DELETE_SELF_IMAGE,
  EDIT_SELF,
  GET_SELF,
} from "../types";

export const getData = () => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/self`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then(function (response) {
        if (response.data.succes) {
          dispatch({ type: GET_SELF, payload: response.data.data });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };
};

export const deleteData = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/self/destroy`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then(function (response) {
        if (response.data.succes) {
          dispatch({
            type: DELETE_SELF,
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

export const editData = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/self/edit`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then(function (response) {
        if (response.data.succes) {
          dispatch({
            type: EDIT_SELF,
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
      .post(`${keys.api}/self`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then(function (response) {
        if (response.data.succes) {
          dispatch({
            type: ADD_SELF,
            payload: response.data.data,
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

export const addImage = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/self/image`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then(function (response) {
        if (response.data.succes) {
          dispatch({
            type: ADD_SELF_IMAGE,
            payload: response.data.data,
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

export const deleteImage = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/self/destroy-image`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then(function (response) {
        if (response.data.succes) {
          dispatch({
            type: DELETE_SELF_IMAGE,
            payload: response.data.data,
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
