import { all, call, put, takeLatest } from 'redux-saga/effects';

import Api from '../utils/Api';
import {
    TEMPLATES_CREATE,
    TEMPLATES_CREATE_FAILURE,
    TEMPLATES_CREATE_SUCCESS,
    TEMPLATES_GET,
    TEMPLATES_GET_FAILURE,
    TEMPLATES_GET_SUCCESS,
    TEMPLATES_SEND,
    TEMPLATES_SEND_FAILURE,
    TEMPLATES_SEND_SUCCESS,
    TEMPLATES_SHOW,
    TEMPLATES_SHOW_FAILURE,
    TEMPLATES_SHOW_SUCCESS,
    TEMPLATES_UPDATE,
    TEMPLATES_UPDATE_FAILURE,
    TEMPLATES_UPDATE_SUCCESS,
} from '../actions/templates';

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

function* createTemplate({ data }) {
    try {
        const { data: template } = yield call(Api.post, {
            url: '/api/v1/templates',
            data,
        });

        yield put({ type: TEMPLATES_CREATE_SUCCESS, template });
    } catch (error) {
        yield put({ type: TEMPLATES_CREATE_FAILURE, error });
    }
}

function* updateTemplate({ templateId, data }) {
    try {
        const { data: template } = yield call(Api.put, {
            url: `/api/v1/templates/${templateId}`,
            data,
        });

        yield put({ type: TEMPLATES_UPDATE_SUCCESS, template });
    } catch (error) {
        yield put({ type: TEMPLATES_UPDATE_FAILURE, error });
    }
}

function* showTemplate({ templateId }) {
    try {
        const { data: template } = yield call(Api.get, {
            url: `/api/v1/templates/${templateId}`,
        });

        yield put({ type: TEMPLATES_SHOW_SUCCESS, template });
    } catch (error) {
        yield put({ type: TEMPLATES_SHOW_FAILURE, error });
    }
}

function* sendTemplate({ templateId, data }) {
    try {
        const { data: sentTemplate } = yield call(Api.post, {
            url: `/api/v1/send/${templateId}`,
            data,
        });

        yield put({ type: TEMPLATES_SEND_SUCCESS, sentTemplate });
    } catch (error) {
        yield put({ type: TEMPLATES_SEND_FAILURE, error });
    }
}

export default function* templatesSaga() {
    yield all([
        takeLatest(TEMPLATES_GET, getTemplates),
        takeLatest(TEMPLATES_CREATE, createTemplate),
        takeLatest(TEMPLATES_SHOW, showTemplate),
        takeLatest(TEMPLATES_UPDATE, updateTemplate),
        takeLatest(TEMPLATES_SEND, sendTemplate),
    ]);
}
