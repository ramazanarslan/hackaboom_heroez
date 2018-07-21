import {
    GET_HAPPY_REQUEST, GET_HAPPY_SUCCESS, GET_HAPPY_FAILURE, GET_HAPPY_RESET,
    GET_ANGRY_REQUEST, GET_ANGRY_SUCCESS, GET_ANGRY_FAILURE, GET_ANGRY_RESET
} from "./ActionTypes";

export const tryGetHappy = () => ({
    type: GET_HAPPY_REQUEST
});
export const getHappySuccess = (musicList) => ({
    type: GET_HAPPY_SUCCESS,
    payload: {
        musicList
    }
});
export const getHappyFailure = () => ({
    type: GET_HAPPY_FAILURE
});
export const getHappyReset = () => ({
    type: GET_HAPPY_RESET
});

export const tryGetAngry = () => ({
    type: GET_ANGRY_REQUEST
});
export const getAngrySuccess = (musicList) => ({
    type: GET_ANGRY_SUCCESS,
    payload: {
        musicList
    }
});
export const getAngryFailure = () => ({
    type: GET_ANGRY_FAILURE
});
export const getAngryReset = () => ({
    type: GET_ANGRY_RESET
});
