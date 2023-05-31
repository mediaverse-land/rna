import { apiGetDailyRecommended } from '../../../../api/video';

export class ExploreService {
    async getGetDailyRecommendedData() {
        const res = await apiGetDailyRecommended();
        return res;
    }
}
