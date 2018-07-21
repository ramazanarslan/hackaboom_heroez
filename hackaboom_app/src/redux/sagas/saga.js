import { call, put, takeLatest, take } from "redux-saga/effects";

import {
    SIGNIN_REQUEST
} from "../auth/ActionTypes";
import {
    signinSuccess, signinFailure
} from "../auth/Actions";

import {
    GET_SHOPS_REQUEST
} from "../clothes/ActionTypes";
import {
    getShopsSuccess, getShopsFailure
} from "../clothes/Actions";

import api from "./api";

const trySignInSaga = function* (action) {
    const { email, password } = action.payload;

    try {
        const signinResponse = yield call(api.doSignIn, email, password);

        console.log("signinResponse => ", signinResponse);

        if (signinResponse) {
            const { token, user } = signinResponse;

            if (user && token) {
                api.setToken(token);

                yield put(signinSuccess(user, token));
            }
            else {
                console.log("SignIn failed by api. ", signinResponse);
                yield put(signinFailure(signinResponse));
            }
        }
        else {
            console.log("SignIn failed by api. No response !");
            yield put(signinFailure({}));
        }
    } catch (err) {
        console.log("SignIn failed by api. Error => ", err);
        yield put(signinFailure({}));
    }
};

const tryGetShopList = function* (action) {
    try {
        const getShopListResponse = yield call(api.fetchShopList);

        console.log("getShopListResponse => ", getShopListResponse);

        if (getShopListResponse) {
           yield put(getShopsSuccess(getShopListResponse));
        }
        else {
            console.log("Getting shop list failed by api. No response !");
            yield put(getShopsFailure());
        }
    } catch (err) {
        console.log("Getting shop list failed by api. Error => ", err);
        yield put(getShopsFailure());
    }
};

const saga = function* () {
    //AUTH
    yield takeLatest(SIGNIN_REQUEST, trySignInSaga);

    //CLOTHES
    yield takeLatest(GET_SHOPS_REQUEST, tryGetShopList);
};

export default saga;
