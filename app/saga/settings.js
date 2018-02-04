import { put, takeLatest } from 'redux-saga/effects';

import {
    SETTINGS_GET,
    SETTINGS_GET_FAILURE,
    SETTINGS_GET_SUCCESS,
    SETTINGS_SAVE,
    SETTINGS_SAVE_FAILURE,
    SETTINGS_SAVE_SUCCESS,
} from '../actions/settings';

export const localStorageName = 'settings';

function* getSettings() {
    try {
        const data = localStorage.getItem(localStorageName) || {};

        yield put({ type: SETTINGS_GET_SUCCESS, data });
    } catch (error) {
        yield put({ type: SETTINGS_GET_FAILURE, error });
    }
}

function* saveSettings({ data }) {
    try {
        localStorage.setItem(localStorageName, JSON.stringify(data));

        yield put({ type: SETTINGS_SAVE_SUCCESS, data });
    } catch (error) {
        yield put({ type: SETTINGS_SAVE_FAILURE, error });
    }
}

export default function* settingsSaga() {
    yield [takeLatest(SETTINGS_GET, getSettings), takeLatest(SETTINGS_SAVE, saveSettings)];
}
