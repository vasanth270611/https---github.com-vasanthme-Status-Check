import { ADD_CONFIG, DELETE_CONFIG, GET_CONFIG, UPDATE_CONFIG } from "../type";

const initialState = {
  configs: [],
};

const config = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONFIG:
      console.log("Add Config");
      return { ...state, configs: [...state.configs, action.payload] };

    case DELETE_CONFIG:
      console.log("Delete Config");
      return {
        ...state,
        configs: state.configs.filter(
          (config) => config.app_id !== action.payload.id
        ),
      };

    case GET_CONFIG:
      return { ...state, configs: action.payload };

    case UPDATE_CONFIG: {
      console.log("update config");
      const updatedDetails = action.payload;
      const stateDetails = state.configs.map((config) =>
        updatedDetails.app_id === config.app_id ? updatedDetails : config
      );

      return {
        ...state,
        configs: stateDetails,
      };
    }

    default:
      return state;
  }
};

export default config;
