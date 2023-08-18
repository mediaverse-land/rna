import { ApiHandler } from '../utils/api-handler';

const _app = new ApiHandler();

export class SingleService {
    async getSubscriptions(token: string, assetId: number) {
        const url = `/assets/${assetId}/subscribers`;

        const config = {
            headers: { Authorization: `Bearer ${token}`,"X-App": "_ReactNative", }
        };

        return await _app.get(url, config);
    }
}
