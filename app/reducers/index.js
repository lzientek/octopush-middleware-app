import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import settings from './settings';
import templates from './templates';

const rootReducer = combineReducers({
    templates,
    settings,
    router,
});

export default rootReducer;
