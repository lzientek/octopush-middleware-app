export const TEMPLATES_GET = 'TEMPLATES_GET';
export const TEMPLATES_GET_SUCCESS = 'TEMPLATES_GET_SUCCESS';
export const TEMPLATES_GET_FAILURE = 'TEMPLATES_GET_FAILURE';

export const TEMPLATES_CREATE = 'TEMPLATES_CREATE';
export const TEMPLATES_CREATE_SUCCESS = 'TEMPLATES_CREATE_SUCCESS';
export const TEMPLATES_CREATE_FAILURE = 'TEMPLATES_CREATE_FAILURE';

export const TEMPLATES_UPDATE = 'TEMPLATES_UPDATED';
export const TEMPLATES_UPDATE_SUCCESS = 'TEMPLATES_UPDATED_SUCCESS';
export const TEMPLATES_UPDATE_FAILURE = 'TEMPLATES_UPDATED_FAILURE';

export const TEMPLATES_SHOW = 'TEMPLATES_SHOW';
export const TEMPLATES_SHOW_SUCCESS = 'TEMPLATES_SHOW_SUCCESS';
export const TEMPLATES_SHOW_FAILURE = 'TEMPLATES_SHOW_FAILURE';

export const TEMPLATES_SEND = 'TEMPLATES_SEND';
export const TEMPLATES_SEND_SUCCESS = 'TEMPLATES_SEND_SUCCESS';
export const TEMPLATES_SEND_FAILURE = 'TEMPLATES_SEND_FAILURE';

export const TEMPLATES_GET_SENDINGS = 'TEMPLATES_GET_SENDINGS';
export const TEMPLATES_GET_SENDINGS_SUCCESS = 'TEMPLATES_GET_SENDINGS_SUCCESS';
export const TEMPLATES_GET_SENDINGS_FAILURE = 'TEMPLATES_GET_SENDINGS_FAILURE';

export const getTemplates = () => {
    return {
        type: TEMPLATES_GET,
    };
};

export const createTemplate = template => {
    return {
        type: TEMPLATES_CREATE,
        data: template,
    };
};

export const updateTemplate = (templateId, template) => {
    return {
        type: TEMPLATES_UPDATE,
        templateId,
        data: template,
    };
};

export const showTemplate = templateId => {
    return {
        type: TEMPLATES_SHOW,
        templateId,
    };
};

export const sendTemplate = (templateId, data) => {
    return {
        type: TEMPLATES_SEND,
        templateId,
        data,
    };
};

export const getSendings = templateId => {
    return {
        type: TEMPLATES_GET_SENDINGS,
        templateId,
    };
};
