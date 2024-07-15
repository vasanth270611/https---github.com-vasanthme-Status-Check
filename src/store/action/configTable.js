import { apiEndPoints } from "../../const";
import { httpCall } from "../../sevices/http";
import { ADD_CONFIG, DELETE_CONFIG, GET_CONFIG, UPDATE_CONFIG } from "../type";

export const getTableConfig = (env) => async (dispatch) => {
  try {
    const currentEndPoint = apiEndPoints[env].getdetails + "?table=config";
    const result = await httpCall(currentEndPoint);

    // const filterResult = result?.filter((items) =>
    //   items?.app_id?.includes(env.toUpperCase())
    // );

    dispatch({ type: GET_CONFIG, payload: result });
  } catch (error) {
    dispatch({ type: GET_CONFIG, payload: [] });
    console.log("error while fetching the table config", error?.message);
  }
};

export const addConfig = (env, requestBody) => async (dispatch) => {
  try {
    const currentEndPoint = apiEndPoints[env].adddetails + "?table=config";
    const result = await httpCall(currentEndPoint, "POST", requestBody);

    dispatch({ type: ADD_CONFIG, payload: result });
  } catch (error) {
    console.log("error while adding the table config", error?.message);
  }
};

export const updateConfig = (env, requestBody) => async (dispatch) => {
  try {
    const currentEndPoint = apiEndPoints[env].updatedetails + "?table=config";
    const result = await httpCall(currentEndPoint, "POST", requestBody);

    dispatch({ type: UPDATE_CONFIG, payload: result });
  } catch (error) {
    console.log("error while adding the table config", error?.message);
  }
};

export const deleteConfig = (env, id) => async (dispatch) => {
  try {
    const currentEndPoint =
      apiEndPoints[env].deletedetails + `?table=config&id=${id}`;
    const result = await httpCall(currentEndPoint, "POST");

    dispatch({ type: DELETE_CONFIG, payload: result });
  } catch (error) {
    console.log("error while deleting the table config", error?.message);
  }
};
