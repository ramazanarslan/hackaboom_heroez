import {
    SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE, SIGNIN_RESET
} from "./ActionTypes";

export const trySignIn = (email, password) => ({
    type: SIGNIN_REQUEST,
    payload: {
        email,
        password
    }
});
export const signinSuccess = (user, token) => ({
    type: SIGNIN_SUCCESS,
    payload: {
        user,
        token
    }
});
export const signinFailure = (errorData) => ({
    type: SIGNIN_FAILURE,
    payload: errorData
});
export const signinReset = () => ({
    type: SIGNIN_RESET
});
