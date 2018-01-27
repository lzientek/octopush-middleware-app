// @flow
declare var apiUrl: string;

import fetch from 'isomorphic-fetch';

type Params = {
    url: string,
    data?: Object,
    headers?: {
        'Content-Type'?: string,
        authorization?: string,
    },
};

type Configuration = {
    method: string,
    headers: Object,
    mode: string,
    body?: Object,
};

const checkIsFileRequest = (data: Object): boolean => {
    for (const name in data) {
        if (data[name] instanceof File) {
            return true;
        }
    }
    return false;
};

const formatData = (data: Object): FormData => {
    const formData = new FormData();

    for (const name in data) {
        if (data[name] != undefined) {
            formData.append(name, data[name]);
        }
    }

    return formData;
};

export const getConfiguration = (type: string, params: Params): Object => {
    const url = `${apiUrl}/v1/${params.url}`;
    const token = window.localStorage.user ? JSON.parse(window.localStorage.user).token : null;
    const configuration: Configuration = {
        method: type,
        headers: params.headers || { 'Content-Type': 'application/json' },
        mode: 'cors',
    };

    if (token) {
        configuration.headers.authorization = `Bearer ${token}`;
    }

    if (params.data && checkIsFileRequest(params.data)) {
        delete configuration.headers['Content-Type'];
        configuration.body = formatData(params.data);
    } else if (params.data) {
        const { data } = params;
        configuration.body = JSON.stringify(data);
    }

    return {
        url,
        configuration,
    };
};

export const call = async ({
    url,
    configuration,
}: {
    url: string,
    configuration: Object,
}): Promise<mixed> => {
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

export const request = (type: string): Function => {
    return (params: Params) => {
        return call(getConfiguration(type, params));
    };
};

export default {
    post: request('POST'),
    get: request('GET'),
    put: request('PUT'),
    del: request('DELETE'),
};
