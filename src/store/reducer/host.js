import { ADD_HOST, DELETE_HOST, GET_HOST, UPDATE_HOST } from "../type";

const initialState = {
  hosts: [],
};

const host = (state = initialState, action) => {
  switch (action.type) {
    case ADD_HOST:
      console.log("Add host");
      return {
        ...state,
        hosts: [...state.hosts, action.payload],
      };

    case DELETE_HOST:
      console.log("Delete Host");
      return {
        ...state,
        hosts: state.hosts.filter((host) => host.id !== action.payload.id),
      };

    case GET_HOST:
      return { ...state, hosts: action.payload };

    case UPDATE_HOST: {
      console.log("update host");
      const updatedDetails = action.payload;
      const stateDetails = state.hosts.map((host) =>
        updatedDetails.id === host.id ? updatedDetails : host
      );

      return {
        ...state,
        hosts: stateDetails,
      };
    }

    default:
      return state;
  }
};

export default host;
