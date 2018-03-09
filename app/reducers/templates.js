import {
    TEMPLATES_CREATE_SUCCESS,
    TEMPLATES_GET_SUCCESS,
    TEMPLATES_SHOW_SUCCESS,
    TEMPLATES_UPDATE_SUCCESS,
} from '../actions/templates';

export default (
    state = { templates: null, createdTemplate: null, updatedTemplate: null, template: null },
    action = {},
) => {
    switch (action.type) {
        case TEMPLATES_GET_SUCCESS:
            return { ...state, templates: action.templates };
        case TEMPLATES_CREATE_SUCCESS:
            return { ...state, createdTemplate: action.template };
        case TEMPLATES_UPDATE_SUCCESS:
            return { ...state, updatedTemplate: action.template };
        case TEMPLATES_SHOW_SUCCESS:
            return { ...state, template: action.template };
        default:
            return state;
    }
};
