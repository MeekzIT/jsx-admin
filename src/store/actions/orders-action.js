import axios from "axios";
import { keys } from "../../keys";
import { GET_ORDERS } from "../types";

export const getData = () => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/constuctor/order`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then(function (response) {
        if (response.data.succes) {
          dispatch({ type: GET_ORDERS, payload: response.data });
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
      .post(`${keys.api}/constuctor/order/edit`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then(function (response) {})
      .catch(function (error) {
        console.error(error);
      });
  };
};

export const deleteData = (data) => {
  return (dispatch) => {
    axios
      .post(`${keys.api}/constuctor/order/destroy`, data, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then(function (response) {})
      .catch(function (error) {
        console.error(error);
      });
  };
};
