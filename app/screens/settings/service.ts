import { ApiHandler } from '../../utils/api-handler';

const _api = new ApiHandler();

export const getSessionsApiHandler = async (token: string) => {
    const url = '/sessions';

    const config = {
        headers: { Authorization: `Bearer ${token}`,"X-App": "_Android", }
    };

    return await _api.get(url, config);
};

export const getSinginsApiHandler = async (token: string) => {
    const url = '/sign-ins';

    const config = {
        headers: { Authorization: `Bearer ${token}`,"X-App": "_Android", }
    };

    return await _api.get(url, config);
};

export const updateProfileApiHandler = async (token: string, data: object) => {
    const url = '/profile';

    const config = {
        headers: { Authorization: `Bearer ${token}` ,"X-App": "_Android",}
    };

    return await _api.put(url, data, config);
};

export const getMessagesApiHandler = async (token: string) => {
    const url = '/notifications';

    const config = {
        headers: { Authorization: `Bearer ${token}` ,"X-App": "_Android",}
    };

    return await _api.get(url, config);
};

export const getMessageDetailApiHandler = async (token: string, id: number) => {
    const url = `/notifications/${id}`;

    const config = {
        headers: { Authorization: `Bearer ${token}`,"X-App": "_Android", }
    };

    return await _api.get(url, config);
};
