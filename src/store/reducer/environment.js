import {
  ADD_ENVIRONMENT,
  DELETE_ENVIRONMENT,
  GET_ENVIRONMENT,
  UPDATE_ENVIRONMENT,
} from "../type";

const initialState = {
  environments: [],
};

const environment = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ENVIRONMENT:
      console.log("Add environment");
      return {
        ...state,
        environments: [...state.environments, action.payload],
      };

    case DELETE_ENVIRONMENT:
      console.log("Delete environment");
      return {
        ...state,
        environments: state.environments.filter(
          (environment) => environment.id !== action.payload.id
        ),
      };

    case GET_ENVIRONMENT:
      return { ...state, environments: action.payload };

    case UPDATE_ENVIRONMENT: {
      console.log("update environment");
      const updatedDetails = action.payload;
      const stateDetails = state.environments.map((environment) =>
        updatedDetails.app_id === environment.id ? updatedDetails : environment
      );

      return {
        ...state,
        environments: stateDetails,
      };
    }

    default:
      return state;
  }
};

export default environment;
