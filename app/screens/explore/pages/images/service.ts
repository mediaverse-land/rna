import { ApiHandler } from '../../../../utils/api-handler';

const _api = new ApiHandler();

export const getImagesPageDatApiHandler = async (path: string) => {
    return await _api.get(path);
};

export const getBestInMonthApiHandler = async (token: string) => {
    const url = '/images/daily-recommended';

    const config = {
        headers: { Authorization: `Bearer ${token}` ,
        "X-App": "_ReactNative",
    }
    };
    return await _api.get(url, config);
};
