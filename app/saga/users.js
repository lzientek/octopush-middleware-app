import { all, call, put, takeLatest } from 'redux-saga/effects';

import Api from '../utils/Api';
import {
    USERS_CREATE,
    USERS_CREATE_FAILURE,
    USERS_CREATE_SUCCESS,
    USERS_GET,
    USERS_GET_FAILURE,
    USERS_GET_SUCCESS,
    USERS_SHOW,
    USERS_SHOW_FAILURE,
    USERS_SHOW_SUCCESS,
    USERS_UPDATE,
    USERS_UPDATE_FAILURE,
    USERS_UPDATE_SUCCESS,
} from '../actions/users';

function* getUsers() {
    try {
        const { data } = yield call(Api.get, {
            url: '/api/v1/users',
        });

        yield put({ type: USERS_GET_SUCCESS, users: data });
    } catch (error) {
        yield put({ type: USERS_GET_FAILURE, error });
    }
}

function* createUser({ data }) {
    try {
        const { data: user } = yield call(Api.post, {
            url: '/api/v1/users',
            data,
        });

        yield put({ type: USERS_CREATE_SUCCESS, user });
    } catch (error) {
        yield put({ type: USERS_CREATE_FAILURE, error });
    }
}

function* updateUser({ userId, data }) {
    try {
        const { data: user } = yield call(Api.put, {
            url: `/api/v1/users/${userId}`,
            data,
        });

        yield put({ type: USERS_UPDATE_SUCCESS, user });
    } catch (error) {
        yield put({ type: USERS_UPDATE_FAILURE, error });
    }
}

function* showUser({ userId }) {
    try {
        const { data: user } = yield call(Api.get, {
            url: `/api/v1/users/${userId}`,
        });

        yield put({ type: USERS_SHOW_SUCCESS, user });
    } catch (error) {
        yield put({ type: USERS_SHOW_FAILURE, error });
    }
}

export default function* usersSaga() {
    yield all([
        takeLatest(USERS_GET, getUsers),
        takeLatest(USERS_CREATE, createUser),
        takeLatest(USERS_SHOW, showUser),
        takeLatest(USERS_UPDATE, updateUser),
    ]);
}
