import { apiEndPoints } from "../../const";
import { httpCall } from "../../sevices/http";
import { GET_HEALTH_STATUS } from "../type";

export const getHealthStatus = (env) => async (dispatch) => {
  try {
    const currentEndPoint = apiEndPoints[env].healthstatus;
    const result = await httpCall(currentEndPoint);
    const filterResult = result?.filter(
      (data) => data.env === env.toUpperCase()
    );
    dispatch({ type: GET_HEALTH_STATUS, payload: filterResult });
  } catch (error) {
    dispatch({ type: GET_HEALTH_STATUS, payload: [] });
    console.log("error while fetching the health status", error?.message);
  }
};
