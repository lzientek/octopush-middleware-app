import fetch from 'isomorphic-fetch';

import { localStorageName } from '../saga/settings';

export const getConfiguration = (type, { data, url, headers }) => {
    const settings = JSON.parse(localStorage.getItem(localStorageName)) || {};
    const configuration = {
        method: type,
        headers: {
            ...(headers || {}),
            'Content-Type': 'application/json',
            ApiKey: settings.apiKey,
            ApiSecret: settings.ApiSecret,
            Authorization: settings.adminPassword && `Admin ${settings.adminPassword}`,
        },
    };
    url = `${settings.url}${url}`;
    if (data) {
        configuration.body = JSON.stringify(data);
    }

    return {
        url,
        configuration,
    };
};

export const call = async ({ url, configuration }) => {
    const response = await fetch(url, configuration);

    if (response.status < 300) {
        return response.status === 204 ? null : await response.json();
    } else {
        const data = await response.json();
        const error = new Error(data.error.detail);
        error.status = response.status;
        throw error;
    }
};

export const request = type => {
    return params => {
        return call(getConfiguration(type, params));
    };
};

export default {
    post: request('POST'),
    get: request('GET'),
    put: request('PUT'),
    del: request('DELETE'),
};
