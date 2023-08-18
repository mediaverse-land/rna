import { ApiHandler } from '../../../../utils/api-handler';

const _api = new ApiHandler();

export const getExploreDailyRecommendedApiHandler = async () => {
    const url = '/search';

    return await _api.get(url);
};

export const getExploreTopTenTextApiHandler = async () => {
    const url = '/texts/daily-recommended';

    return await _api.get(url);
};

export const getExploreSongsApiHandler = async () => {
    const url = '/audios';

    const res = await _api.get(url);
    return res;
};

export const getExploreImagesApiHandler = async () => {
    const url = '/images';

    return await _api.get(url);
};

export const getLivesApiHandler = async () => {
    const url = '/lives';

    return await _api.get(url);
};
