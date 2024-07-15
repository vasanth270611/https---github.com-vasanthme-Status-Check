import { apiEndPoints } from "../../const";
import { httpCall } from "../../sevices/http";
import {
  ADD_APP_TYPE,
  DELETE_APP_TYPE,
  GET_APP_TYPE,
  UPDATE_APP_TYPE,
} from "../type";

export const getAppType = (env) => async (dispatch) => {
  try {
    const currentEndPoint = apiEndPoints[env].getdetails + "?table=apptype";
    const result = await httpCall(currentEndPoint);

    dispatch({ type: GET_APP_TYPE, payload: result });
  } catch (error) {
    dispatch({ type: GET_APP_TYPE, payload: [] });
    console.log("error while fetching the table appType", error?.message);
  }
};

export const addAppType = (env, requestBody) => async (dispatch) => {
  try {
    const currentEndPoint = apiEndPoints[env].adddetails + "?table=apptype";
    const result = await httpCall(currentEndPoint, "POST", requestBody);

    dispatch({ type: ADD_APP_TYPE, payload: result });
  } catch (error) {
    console.log("error while adding the table appType", error?.message);
  }
};

export const updateAppType = (env, requestBody) => async (dispatch) => {
  try {
    const currentEndPoint = apiEndPoints[env].updatedetails + "?table=apptype";
    const result = await httpCall(currentEndPoint, "POST", requestBody);

    dispatch({ type: UPDATE_APP_TYPE, payload: result });
  } catch (error) {
    console.log("error while adding the table appType", error?.message);
  }
};

export const deleteAppType = (env, id) => async (dispatch) => {
  try {
    const currentEndPoint =
      apiEndPoints[env].deletedetails + `?table=apptype&id=${id}`;
    const result = await httpCall(currentEndPoint, "POST");

    dispatch({ type: DELETE_APP_TYPE, payload: result });
  } catch (error) {
    console.log("error while deleting the table appType", error?.message);
  }
};
