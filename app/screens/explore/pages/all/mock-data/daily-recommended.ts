import {
    DAILY_RECOMMENDED_IMG_ONE,
    DAILY_RECOMMENDED_IMG_THREE,
    DAILY_RECOMMENDED_IMG_TWO,
    PROFILE_ONE,
    PROFILE_THREE,
    PROFILE_TWO
} from '../../../../../constaints/images';
import { HorizontailSlideType } from '../../../../../shared/components/horizontal-slider';

export const dailyRecommendedMockData: HorizontailSlideType[] = [
    {
        id: 1,
        title: 'Its raining.',
        username: 'Robert junior',
        thumbnailPath: DAILY_RECOMMENDED_IMG_ONE,
        profileUri: PROFILE_ONE,
        type: 'image'
    },
    {
        id: 2,
        title: 'Wedding m...',
        username: 'Ross',
        thumbnailPath: DAILY_RECOMMENDED_IMG_TWO,
        profileUri: PROFILE_TWO,
        type: 'video'
    },
    {
        id: 3,
        title: 'PAIN',
        username: 'Rayan jones',
        thumbnailPath: DAILY_RECOMMENDED_IMG_THREE,
        profileUri: PROFILE_THREE,
        type: 'sound'
    }
];
