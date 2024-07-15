import { combineReducers } from "redux";
import apptype from "./appType";
import config from "./config";
import environment from "./environment";
import host from "./host";
import recipient from "./recepient";
import apiConfig from "./apiConfig";
import healthStatus from "./healthStatusReducer";
import availabilityPercentage from "./availabilityPercentageReducer";

const reducer = combineReducers({
  apptype,
  config,
  environment,
  host,
  recipient,
  apiConfig,
  healthStatus,
  availabilityPercentage,
});

export default reducer;
