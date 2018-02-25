import { TEMPLATES_GET_SUCCESS } from '../actions/templates';

export default (state = { templates: [] }, action = {}) => {
    switch (action.type) {
        case TEMPLATES_GET_SUCCESS:
            return { ...state, templates: action.templates };
        default:
            return state;
    }
};
