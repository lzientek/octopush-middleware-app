import { SETTINGS_GET_SUCCESS, SETTINGS_SAVE_SUCCESS } from '../actions/settings';

export default (state = { settings: null }, action = {}) => {
    console.log(action);
    switch (action.type) {
        case SETTINGS_GET_SUCCESS:
        case SETTINGS_SAVE_SUCCESS:
            return { ...state, settings: action.data };
        default:
            return state;
    }
};
