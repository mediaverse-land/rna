import { ApiHandler } from '../../utils/api-handler';

const _api = new ApiHandler();

export class RootService {
    async getUserData(token: string) {
        const url = '/profile';
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        return await _api.get(url, config);
    }
}
