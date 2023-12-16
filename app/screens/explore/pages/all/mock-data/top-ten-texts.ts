import { PROFILE_ONE, PROFILE_THREE, PROFILE_TWO } from '../../../../../constaints/images';

export type TextItem = {
  id: number;
  title: string;
  content: string;
  username: string;
  profileUri: string;
};

export const topTenTextsMockData: TextItem[] = [
  {
    id: 1,
    title: 'My thoughts',
    content: 'Amet minim mollit non deserunt ullamco est sit...',
    username: 'Ralph Edwards',
    profileUri: PROFILE_ONE,
  },
  {
    id: 2,
    title: 'Статистикч',
    content: 'Amet sint. Velit officia consequat duis enim velit...',
    username: 'Ronald Richards',
    profileUri: PROFILE_TWO,
  },
  {
    id: 3,
    title: 'Хуульч',
    content: 'Amet minim mollit non deserunt ullamco est sit...',
    username: 'Ralph Edwards',
    profileUri: PROFILE_THREE,
  },
];
