import { combineReducers } from "redux";
import examplesReducer from '../reducers/examples'


export const combinedReducer = combineReducers({
    examples: examplesReducer,
});