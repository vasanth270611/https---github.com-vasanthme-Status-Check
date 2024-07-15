import { apiEndPoints } from "../../const";
import { httpCall } from "../../sevices/http";
import { ADD_HOST, DELETE_HOST, GET_HOST, UPDATE_HOST } from "../type";

export const getHost = (env) => async (dispatch) => {
  try {
    const currentEndPoint = apiEndPoints[env].getdetails + "?table=host";
    const result = await httpCall(currentEndPoint);

    dispatch({ type: GET_HOST, payload: result });
  } catch (error) {
    dispatch({ type: GET_HOST, payload: [] });
    console.log("error while fetching the table host", error?.message);
  }
};

export const addHost = (env, requestBody) => async (dispatch) => {
  try {
    const currentEndPoint = apiEndPoints[env].adddetails + "?table=host";
    const result = await httpCall(currentEndPoint, "POST", requestBody);

    dispatch({ type: ADD_HOST, payload: result });
  } catch (error) {
    console.log("error while adding the table host", error?.message);
  }
};

export const updateHost = (env, requestBody) => async (dispatch) => {
  try {
    const currentEndPoint = apiEndPoints[env].updatedetails + "?table=host";
    const result = await httpCall(currentEndPoint, "POST", requestBody);

    dispatch({ type: UPDATE_HOST, payload: result });
  } catch (error) {
    console.log("error while adding the table host", error?.message);
  }
};

export const deleteHost = (env, id) => async (dispatch) => {
  try {
    const currentEndPoint =
      apiEndPoints[env].deletedetails + `?table=host&id=${id}`;
    const result = await httpCall(currentEndPoint, "POST");

    dispatch({ type: DELETE_HOST, payload: result });
  } catch (error) {
    console.log("error while deleting the table host", error?.message);
  }
};
