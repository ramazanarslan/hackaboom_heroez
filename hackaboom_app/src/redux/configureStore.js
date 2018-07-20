import { createStore, combineReducers, applyMiddleware } from "redux";

import createSagaMiddleware from "redux-saga";

import authReducer from "../redux/auth/Reducers";
import clothesReducer from "../redux/clothes/Reducers";

import saga from "../redux/sagas/saga";

const reducers = combineReducers({
    auth: authReducer,
    clothes: clothesReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(saga);
export default store;