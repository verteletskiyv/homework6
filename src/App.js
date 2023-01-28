import React from "react";
import { applyMiddleware, createStore, } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { combinedReducer } from "./Calculator/reducers";
import Calculator from "./Calculator";


const store = createStore(
    combinedReducer,
    applyMiddleware(thunkMiddleware),
);

export default () => (
    <Provider store={store}>
        <Calculator />
    </Provider>
);