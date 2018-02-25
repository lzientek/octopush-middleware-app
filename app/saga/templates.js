import { call, put, takeLatest } from 'redux-saga/effects';

import Api from '../utils/Api';

import { TEMPLATES_GET, TEMPLATES_GET_FAILURE, TEMPLATES_GET_SUCCESS } from '../actions/templates';

export const localStorageName = 'settings';

function* getTemplates() {
    try {
        const { data } = yield call(Api.get, {
            url: '/api/v1/templates',
        });

        yield put({ type: TEMPLATES_GET_SUCCESS, templates: data });
    } catch (error) {
        yield put({ type: TEMPLATES_GET_FAILURE, error });
    }
}

export default function* settingsSaga() {
    yield [takeLatest(TEMPLATES_GET, getTemplates)];
}
