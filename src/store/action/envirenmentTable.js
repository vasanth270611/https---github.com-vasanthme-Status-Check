import { apiEndPoints } from "../../const";
import { httpCall } from "../../sevices/http";
import {
  ADD_CONFIG,
  ADD_ENVIRONMENT,
  DELETE_CONFIG,
  DELETE_ENVIRONMENT,
  GET_CONFIG,
  GET_ENVIRONMENT,
  UPDATE_CONFIG,
  UPDATE_ENVIRONMENT,
} from "../type";

export const getEnvironment = (env) => async (dispatch) => {
  try {
    const currentEndPoint = apiEndPoints[env].getdetails + "?table=environment";
    const result = await httpCall(currentEndPoint);

    dispatch({ type: GET_ENVIRONMENT, payload: result });
  } catch (error) {
    dispatch({ type: GET_ENVIRONMENT, payload: [] });
    console.log("error while fetching the table environment", error?.message);
  }
};

export const addEnvironment = (env, requestBody) => async (dispatch) => {
  try {
    const currentEndPoint = apiEndPoints[env].adddetails + "?table=environment";
    const result = await httpCall(currentEndPoint, "POST", requestBody);

    dispatch({ type: ADD_ENVIRONMENT, payload: result });
  } catch (error) {
    console.log("error while adding the table environment", error?.message);
  }
};

export const updateEnvironment = (env, requestBody) => async (dispatch) => {
  try {
    const currentEndPoint =
      apiEndPoints[env].updatedetails + "?table=environment";
    const result = await httpCall(currentEndPoint, "POST", requestBody);

    dispatch({ type: UPDATE_ENVIRONMENT, payload: result });
  } catch (error) {
    console.log("error while adding the table environment", error?.message);
  }
};

export const deleteEnvironment = (env, id) => async (dispatch) => {
  try {
    const currentEndPoint =
      apiEndPoints[env].deletedetails + `?table=environment&id=${id}`;
    const result = await httpCall(currentEndPoint, "POST");

    dispatch({ type: DELETE_ENVIRONMENT, payload: result });
  } catch (error) {
    console.log("error while deleting the table environment", error?.message);
  }
};
