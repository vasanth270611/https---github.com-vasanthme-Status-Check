import { SET_ENV } from "../type";

export const setConfig = (env) => (dispatch) => {
  dispatch({ type: SET_ENV, payload: env });
};
