import {
    GET_HAPPY_REQUEST, GET_HAPPY_SUCCESS, GET_HAPPY_FAILURE, GET_HAPPY_RESET,
    GET_ANGRY_REQUEST, GET_ANGRY_SUCCESS, GET_ANGRY_FAILURE, GET_ANGRY_RESET
} from "./ActionTypes";

const initialState = {
    musicList: [],

    getHappyInProgress: false,
    getHappyHasError: false,
    getHappyCompleted: false,

    getAngryInProgress: false,
    getAngryHasError: false,
    getAngryCompleted: false
};

export default function (state = initialState, action) {

    const { payload } = action;
    if (action.type === GET_HAPPY_REQUEST) {
        return {
            ...state,
            getHappyInProgress: true,
            getHappyHasError: false,
            getHappyCompleted: false
        };
    }
    else if (action.type === GET_HAPPY_SUCCESS) {
        let { musicList } = payload;
        return {
            ...state,
            musicList,
            getHappyInProgress: false,
            getHappyHasError: false,
            getHappyCompleted: true
        };
    }
    else if (action.type === GET_HAPPY_FAILURE) {
        return {
            ...state,
            getHappyInProgress: false,
            getHappyHasError: true,
            getHappyCompleted: true
        };
    }
    else if (action.type === GET_HAPPY_RESET) {
        return {
            ...state,
            getHappyInProgress: false,
            getHappyHasError: false,
            getHappyCompleted: false
        };
    }

    else if (action.type === GET_ANGRY_REQUEST) {
        return {
            ...state,
            getAngryInProgress: true,
            getAngryHasError: false,
            getAngryCompleted: false
        };
    }
    else if (action.type === GET_ANGRY_SUCCESS) {
        let { musicList } = payload;
        return {
            ...state,
            musicList,
            getAngryInProgress: false,
            getAngryHasError: false,
            getAngryCompleted: true
        };
    }
    else if (action.type === GET_ANGRY_FAILURE) {
        return {
            ...state,
            getAngryInProgress: false,
            getAngryHasError: true,
            getAngryCompleted: true
        };
    }
    else if (action.type === GET_ANGRY_RESET) {
        return {
            ...state,
            getAngryInProgress: false,
            getAngryHasError: false,
            getAngryCompleted: false
        };
    }

    return state;
}
