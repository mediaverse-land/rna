import { ApiHandler } from '../../utils/api-handler';

const _api = new ApiHandler();

export const getProfileAllDataApiHandler = async (token:string, url: string) => {

    const config = {
        headers: { Authorization: `Bearer ${token}`,
        "X-App": "_Android", }
    };

    return await _api.get(url, config);
};

export const getProfileImageDataApiHandler = async (token:string, uri: string) => {
    const url = `/profile/images`;

    const config = {
        headers: { Authorization: `Bearer ${token}`,
        "X-App": "_Android", }
    };

    return await _api.get(uri, config);
};

export const getProfileTextDataApiHandler = async (token:string, uri: string) => {
    const url = `/profile/texts`;

    const config = {
        headers: { Authorization: `Bearer ${token}`,
        "X-App": "_Android", }
    };

    return await _api.get(uri, config);
};

export const getProfileSoundDataApiHandler = async (token:string, uri: string) => {
    const url = `/profile/audios`;

    const config = {
        headers: { Authorization: `Bearer ${token}`,"X-App": "_Android", }
    };

    return await _api.get(uri, config);
};

export const getProfileVideoDataApiHandler = async (token:string, uri: string) => {
    const url = `/profile/videos`;

    const config = {
        headers: { Authorization: `Bearer ${token}`,"X-App": "_Android", }
    };

    return await _api.get(uri, config);
};

export const getProfileStaticsApiHandler = async (token:string) => {
    const url = `/profile/statics`;

    const config = {
        headers: { Authorization: `Bearer ${token}`,"X-App": "_Android", }
    };

    return await _api.get(url, config);
};


export const removeAssetApiHandler = async (token:string, type: string, id: number) => {
    const url = `/${type}/${id}`;

    const config = {
        headers: { Authorization: `Bearer ${token}`,"X-App": "_Android", }
    };

    return await _api.delete(url, config);
};
