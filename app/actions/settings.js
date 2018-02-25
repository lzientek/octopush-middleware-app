export const SETTINGS_GET = 'SETTINGS_GET';
export const SETTINGS_GET_SUCCESS = 'SETTINGS_GET_SUCCESS';
export const SETTINGS_GET_FAILURE = 'SETTINGS_GET_FAILURE';
export const SETTINGS_SAVE = 'SETTINGS_SAVE';
export const SETTINGS_SAVE_SUCCESS = 'SETTINGS_SAVE_SUCCESS';
export const SETTINGS_SAVE_FAILURE = 'SETTINGS_SAVE_FAILURE';

export function getSettings() {
    return {
        type: SETTINGS_GET,
    };
}

export function setSettings(settings) {
    return {
        type: SETTINGS_SAVE,
        data: settings,
    };
}
