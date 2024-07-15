import { apiEndPoints } from "../../const";
import { httpCall } from "../../sevices/http";
import { GET_AVAILABILTIY_PERCENTAGE } from "../type";

export const getAvailabilityPercent = (env) => async (dispatch) => {
  try {
    let currentEndPoint = apiEndPoints[env].getAvailabilityPercent;
    if (!currentEndPoint)
      throw new Error(`Wrong endpoint. Endpoint not found. `);
    if (!Array.isArray(currentEndPoint)) {
      currentEndPoint = [currentEndPoint];
    }

    let result = undefined;
    for (let index in currentEndPoint) {
      let endPoint = currentEndPoint[index];
      try {
        result = await httpCall(endPoint);
        // Call was success
        break;
      } catch (ex) {
        if (index === currentEndPoint.length - 1) {
          // Last try
          throw ex;
        }
        console.log("Failed for ", endPoint);
      }
    }
    console.log("result", result);

    const filterResult = result?.filter((items) =>
      items?.app_id?.includes(env.toUpperCase())
    );
    //console.log(makeAvailabilitySummary(filterResult), "summary");
    dispatch({
      type: GET_AVAILABILTIY_PERCENTAGE,
      payload: filterResult,
    });
  } catch (error) {
    dispatch({ type: GET_AVAILABILTIY_PERCENTAGE, payload: [] });
    console.log("error while fetching availability percentage", error?.message);
  }
};

export function makeAvailabilitySummary(list) {
  let objAppID = {};
  for (let row of list) {
    if (!objAppID[row.app_id]) {
      objAppID[row.app_id] = {
        ...row,
        totalPercentages: 0,
        totalRows: 0,
      };
    }
    objAppID[row.app_id].totalPercentages += Number(
      row.availability_percentage
    );
    objAppID[row.app_id].totalRows++;
    objAppID[row.app_id].availability_percentage = (
      objAppID[row.app_id].totalPercentages / objAppID[row.app_id].totalRows
    ).toFixed(3);
  }

  return Object.values(objAppID);
}
