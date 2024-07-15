import { SET_ENV } from "../type";

const initialState = {
  env: "dev",
};

const apiConfig = (state = initialState, action) => {
  switch (action.type) {
    case SET_ENV:
      return { ...state, env: action.payload };

    default:
      return state;
  }
};

export default apiConfig;
