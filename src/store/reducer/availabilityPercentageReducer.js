import { GET_AVAILABILTIY_PERCENTAGE } from "../type";

const initialState = {
  availabilityPercentages: [],
};

const availabilityPercentage = (state = initialState, action) => {
  switch (action.type) {
    case GET_AVAILABILTIY_PERCENTAGE:
      return { ...state, availabilityPercentages: action.payload };

    default:
      return state;
  }
};

export default availabilityPercentage;
