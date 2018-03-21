import {
    USERS_CREATE_SUCCESS,
    USERS_GET_SUCCESS,
    USERS_SHOW_SUCCESS,
    USERS_UPDATE_SUCCESS,
} from '../actions/users';

export default (
    state = {
        users: [],
        createdUser: null,
        updatedUser: null,
        user: null,
    },
    action = {},
) => {
    switch (action.type) {
        case USERS_GET_SUCCESS:
            return { ...state, users: action.users };
        case USERS_CREATE_SUCCESS:
            return { ...state, createdUser: action.user };
        case USERS_UPDATE_SUCCESS:
            return { ...state, updatedUser: action.user };
        case USERS_SHOW_SUCCESS:
            return { ...state, user: action.user };
        default:
            return state;
    }
};
