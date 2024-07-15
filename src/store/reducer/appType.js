import {
  ADD_APP_TYPE,
  DELETE_APP_TYPE,
  GET_APP_TYPE,
  UPDATE_APP_TYPE,
} from "../type";

const initialState = {
  apptypes: [],
};

const apptype = (state = initialState, action) => {
  switch (action.type) {
    case ADD_APP_TYPE:
      console.log("Add apptype");
      return { ...state, apptypes: [...state.apptypes, action.payload] };

    case DELETE_APP_TYPE:
      console.log("Delete apptype");
      return {
        ...state,
        apptypes: state.apptypes.filter(
          (apptype) => apptype.id !== action.payload.id
        ),
      };

    case GET_APP_TYPE:
      return { ...state, apptypes: action.payload };

    case UPDATE_APP_TYPE: {
      console.log("update app type");
      const updatedDetails = action.payload;
      const stateDetails = state.apptypes.map((apptype) =>
        updatedDetails.id === apptype.id ? updatedDetails : apptype
      );

      return {
        ...state,
        apptypes: stateDetails,
      };
    }

    default:
      return state;
  }
};

export default apptype;
