export const TEMPLATES_GET = 'TEMPLATES_GET';
export const TEMPLATES_GET_SUCCESS = 'TEMPLATES_GET_SUCCESS';
export const TEMPLATES_GET_FAILURE = 'TEMPLATES_GET_FAILURE';

export const TEMPLATES_CREATE = 'TEMPLATES_CREATE';
export const TEMPLATES_CREATE_SUCCESS = 'TEMPLATES_CREATE_SUCCESS';
export const TEMPLATES_CREATE_FAILURE = 'TEMPLATES_CREATE_FAILURE';

export const getTemplates = () => {
    return {
        type: TEMPLATES_GET,
    };
};

export const saveTemplates = template => {
    return {
        type: TEMPLATES_CREATE,
        data: template,
    };
};
