import { DEV_STATUS } from "../type";

export const getDevStatus = () => (dispatch) => {
  //Dev health status environment URL
  fetch("http://localhost:8090/dev/healthstatus")
    .then((response) => {
      if (!response.ok) {
        throw Error(
          JSON.stringify({
            status: response.status,
            message: response.text(),
          })
        );
      }
      return response.json();
    })
    .then((data) => {
      dispatch({ type: DEV_STATUS, payload: data });
    })
    .catch((error) => console.log(error));
};

export * from "./apiConfig";
export * from "./healthStatus";
export * from "./configTable";
export * from "./appType";
export * from "./envirenmentTable";
export * from "./hostTable";
export * from "./recipientTable";
export * from "./availabilityPercentage";
