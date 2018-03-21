import {
    TEMPLATES_CREATE_SUCCESS,
    TEMPLATES_GET_SENDINGS_SUCCESS,
    TEMPLATES_GET_SUCCESS,
    TEMPLATES_SEND_SUCCESS,
    TEMPLATES_SHOW_SUCCESS,
    TEMPLATES_UPDATE_SUCCESS,
} from '../actions/templates';

export default (
    state = {
        templates: [],
        createdTemplate: null,
        updatedTemplate: null,
        template: null,
        sentTemplate: null,
        sendings: [],
    },
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
        case TEMPLATES_SEND_SUCCESS:
            return { ...state, sentTemplate: action.sentTemplate };
        case TEMPLATES_GET_SENDINGS_SUCCESS:
            return { ...state, sendings: action.sendings };
        default:
            return state;
    }
};
