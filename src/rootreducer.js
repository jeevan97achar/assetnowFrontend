import { combineReducers } from "redux";
import products from "./productreducer";
import reducer from './reducer';
import AnalystData from "../src/Pages/Redux/Reducers/AnalystReducer"
import filterreducer from '../src/Pages/Redux/Reducers/FilterReducer'
export default combineReducers({
  products,
  reducer,
  filterreducer,
  AnalystData,
});
