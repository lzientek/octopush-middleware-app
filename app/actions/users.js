export const USERS_GET = 'USERS_GET';
export const USERS_GET_SUCCESS = 'USERS_GET_SUCCESS';
export const USERS_GET_FAILURE = 'USERS_GET_FAILURE';

export const USERS_CREATE = 'USERS_CREATE';
export const USERS_CREATE_SUCCESS = 'USERS_CREATE_SUCCESS';
export const USERS_CREATE_FAILURE = 'USERS_CREATE_FAILURE';

export const USERS_UPDATE = 'USERS_UPDATED';
export const USERS_UPDATE_SUCCESS = 'USERS_UPDATED_SUCCESS';
export const USERS_UPDATE_FAILURE = 'USERS_UPDATED_FAILURE';

export const USERS_SHOW = 'USERS_SHOW';
export const USERS_SHOW_SUCCESS = 'USERS_SHOW_SUCCESS';
export const USERS_SHOW_FAILURE = 'USERS_SHOW_FAILURE';

export const getUsers = () => {
    return {
        type: USERS_GET,
    };
};

export const createUser = user => {
    return {
        type: USERS_CREATE,
        data: user,
    };
};

export const updateUser = (userId, user) => {
    return {
        type: USERS_UPDATE,
        userId,
        data: user,
    };
};

export const showUser = userId => {
    return {
        type: USERS_SHOW,
        userId,
    };
};
