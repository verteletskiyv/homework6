import React from "react";
import { applyMiddleware, createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import Calculator from "./Calculator";
import examplesReducer from './Calculator/reducers/examples'

const resReducer = combineReducers({
   examples: examplesReducer,
});

const store = createStore(
    resReducer,
    applyMiddleware(thunkMiddleware),
);

export default () => (
    <Provider store={store}>
        <Calculator />
    </Provider>
)