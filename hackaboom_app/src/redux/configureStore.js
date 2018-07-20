import { createStore, combineReducers, applyMiddleware } from "redux";

import createSagaMiddleware from "redux-saga";

import authReducer from "../redux/auth/Reducers";

import saga from "../redux/sagas/saga";

const reducers = combineReducers({
    auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(saga);
export default store;