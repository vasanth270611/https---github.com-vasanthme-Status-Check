import {
  ADD_RECIPIENT,
  DELETE_RECIPIENT,
  GET_RECIPIENT,
  UPDATE_ENVIRONMENT,
  UPDATE_RECIPIENT,
} from "../type";

const initialState = {
  recipients: [],
};

const recipient = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RECIPIENT:
      console.log("Add recipient");
      return {
        ...state,
        recipients: [...state.recipients, action.payload],
      };

    case DELETE_RECIPIENT:
      console.log("Delete recipient");
      return {
        ...state,
        recipients: state.recipients.filter(
          (recipient) => recipient.id !== action.payload.id
        ),
      };

    case GET_RECIPIENT:
      return { ...state, recipients: action.payload };

    case UPDATE_RECIPIENT: {
      console.log("update recipient");
      const updatedDetails = action.payload;
      const stateDetails = state.recipients.map((recipient) =>
        updatedDetails.id === recipient.id ? updatedDetails : recipient
      );

      return {
        ...state,
        recipients: stateDetails,
      };
    }

    default:
      return state;
  }
};

export default recipient;
