import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import settings from './settings';
import templates from './templates';
import users from './users';

const rootReducer = combineReducers({
    templates,
    users,
    settings,
    router,
});

export default rootReducer;
