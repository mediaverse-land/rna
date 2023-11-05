import { ApiHandler } from '../../utils/api-handler';

const _api = new ApiHandler();

export const buyAssetApiHandler = async (token: string, assedId: number) => {
    const url = `/assets/${assedId}/buy`;

    const config = {
        headers: { Authorization: `Bearer ${token}`,       "X-App": "_Android",
    }
    };

    return await _api.patch(url, {}, config);
};
