import { GET_HEALTH_STATUS, UPDATE_HEALTH_STATUS } from "../type";

const initialState = {
  data: [],
};

const healthStatus = (state = initialState, action) => {
  switch (action.type) {
    case GET_HEALTH_STATUS:
      return {
        ...state,
        data: action.payload,
      };
    case UPDATE_HEALTH_STATUS:
      return {
        ...state,
        data: state.data.map((item) =>
          item.appname === action.payload.app_name &&
          item.env === action.payload.envName
            ? { ...item, healthcheckstatus: action.payload.status }
            : item
        ),
      };
    default:
      return state;
  }
};

export default healthStatus;
