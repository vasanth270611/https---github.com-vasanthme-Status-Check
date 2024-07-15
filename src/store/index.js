import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

//const store = configureStore(
export default configureStore({
  reducer,
});
// const { dispatch} = store;
//export {store, dispatch};
