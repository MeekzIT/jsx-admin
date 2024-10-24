import axios from "axios";
import { keys } from "../../keys";
import { GET_CONTACTS } from "../types";

export const getData = () => {
  return (dispatch) => {
    axios
      .get(`${keys.api}/question`, {
        headers: {
          Authorization: `Bearer ${keys.token}`,
        },
      })
      .then(function (response) {
        if (response.data.succes) {
          dispatch({ type: GET_CONTACTS, payload: response.data });
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
      .post(`${keys.api}/question/edit`, data, {
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
      .post(`${keys.api}/question/destroy`, data, {
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
