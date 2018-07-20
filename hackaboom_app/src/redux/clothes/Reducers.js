import {
    GET_SHOPS_REQUEST, GET_SHOPS_SUCCESS, GET_SHOPS_FAILURE, GET_SHOPS_RESET
} from "./ActionTypes";

const initialState = {
    shopList: [],

    getShopsInProgress: false,
    getShopsHasError: false,
    getShopsCompleted: false
};

export default function (state = initialState, action) {

    const { payload } = action;
    if (action.type === GET_SHOPS_REQUEST) {
        return {
            ...state,
            getShopsInProgress: true,
            getShopsHasError: false,
            getShopsCompleted: false
        };
    }
    else if (action.type === GET_SHOPS_SUCCESS) {
        let { shopList } = payload;
        return {
            ...state,
            shopList,
            getShopsInProgress: false,
            getShopsHasError: false,
            getShopsCompleted: true
        };
    }
    else if (action.type === GET_SHOPS_FAILURE) {
        return {
            ...state,
            getShopsInProgress: false,
            getShopsHasError: true,
            getShopsCompleted: true
        };
    }
    else if (action.type === GET_SHOPS_RESET) {
        return {
            ...state,
            getShopsInProgress: false,
            getShopsHasError: false,
            getShopsCompleted: false
        };
    }

    return state;
}
