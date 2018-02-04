import fetch from 'isomorphic-fetch';

export const getConfiguration = (type, params) => {
    const url = `${apiUrl}/v1/${params.url}`;
    const token = window.localStorage.user ? JSON.parse(window.localStorage.user).token : null;
    const { data } = params;
    const configuration = {
        method: type,
        headers: params.headers || { 'Content-Type': 'application/json' },
        mode: 'cors',
    };

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
