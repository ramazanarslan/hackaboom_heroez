import {
    SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_FAILURE, SIGNIN_RESET
} from "./ActionTypes";

const initialState = {
    user: {},
    token: "",

    loggedIn: false,

    signinInProgress: false,
    signinHasError: false,
    signinCompleted: false
};

export default function (state = initialState, action) {

    const { payload } = action;
    if (action.type === SIGNIN_REQUEST) {
        return {
            ...state,
            signinInProgress: true,
            signinHasError: false,
            signinCompleted: false
        };
    }
    else if (action.type === SIGNIN_SUCCESS) {
        let { user, token } = payload;
        return {
            ...state,
            user,
            token,
            loggedIn: true,
            signinInProgress: false,
            signinHasError: false,
            signinCompleted: true
        };
    }
    else if (action.type === SIGNIN_FAILURE) {
        return {
            ...state,
            signinInProgress: false,
            signinHasError: true,
            signinCompleted: true
        };
    }
    else if (action.type === SIGNIN_RESET) {
        return {
            ...state,
            signinInProgress: false,
            signinHasError: false,
            signinCompleted: false
        };
    }

    return state;
}
