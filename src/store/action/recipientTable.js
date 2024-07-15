import { apiEndPoints } from "../../const";
import { httpCall } from "../../sevices/http";
import {
  ADD_RECIPIENT,
  DELETE_RECIPIENT,
  GET_RECIPIENT,
  UPDATE_RECIPIENT,
} from "../type";

export const getRecipient = (env) => async (dispatch) => {
  try {
    const currentEndPoint = apiEndPoints[env].getdetails + "?table=recipient";
    const result = await httpCall(currentEndPoint);

    dispatch({ type: GET_RECIPIENT, payload: result });
  } catch (error) {
    dispatch({ type: GET_RECIPIENT, payload: [] });
    console.log("error while fetching the table recipient", error?.message);
  }
};

export const addRecipient = (env, requestBody) => async (dispatch) => {
  try {
    const currentEndPoint = apiEndPoints[env].adddetails + "?table=recipient";
    const result = await httpCall(currentEndPoint, "POST", requestBody);

    dispatch({ type: ADD_RECIPIENT, payload: result });
  } catch (error) {
    console.log("error while adding the table recipient", error?.message);
  }
};

export const updateRecipient = (env, requestBody) => async (dispatch) => {
  try {
    const currentEndPoint =
      apiEndPoints[env].updatedetails + "?table=recipient";
    const result = await httpCall(currentEndPoint, "POST", requestBody);

    dispatch({ type: UPDATE_RECIPIENT, payload: result });
  } catch (error) {
    console.log("error while adding the table recipient", error?.message);
  }
};

export const deleteRecipient = (env, id) => async (dispatch) => {
  try {
    const currentEndPoint =
      apiEndPoints[env].deletedetails + `?table=recipient&id=${id}`;
    const result = await httpCall(currentEndPoint, "POST");

    dispatch({ type: DELETE_RECIPIENT, payload: result });
  } catch (error) {
    console.log("error while deleting the table recipient", error?.message);
  }
};
