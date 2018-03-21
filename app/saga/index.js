import { all } from 'redux-saga/effects';

import settingsSaga from './settings';
import templatesSaga from './templates';
import usersSaga from './users';

export default function* rootSaga() {
    yield all([settingsSaga(), templatesSaga(), usersSaga()]);
}
