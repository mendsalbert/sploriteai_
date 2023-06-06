// rootReducer.js

import { combineReducers } from "redux";
import authReducer from "../reducersSlices/authReducer";
import coursReducer from "../reducersSlices/coursReducer";
import preferenceReducer from "../reducersSlices/preferenceReducer";
import searchReducer from "../reducersSlices/searchReducer";

const rootReducer = combineReducers({
  search: searchReducer,
  auth: authReducer,
  course: coursReducer,
  preference: preferenceReducer,
});

export default rootReducer;
