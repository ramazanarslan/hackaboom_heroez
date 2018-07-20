import {
    GET_SHOPS_REQUEST, GET_SHOPS_SUCCESS, GET_SHOPS_FAILURE, GET_SHOPS_RESET
} from "./ActionTypes";

export const tryGetShops = () => ({
    type: GET_SHOPS_REQUEST
});
export const getShopsSuccess = (shopList) => ({
    type: GET_SHOPS_SUCCESS,
    payload: {
        shopList
    }
});
export const getShopsFailure = () => ({
    type: GET_SHOPS_FAILURE
});
export const getShopsReset = () => ({
    type: GET_SHOPS_RESET
});
