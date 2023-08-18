import { Box } from '../../../components/box';
import { PaddingContainer } from '../../../styles/grid';
import { PROFILE_ONE } from '../../../constaints/images';
import { SingleItemDescription } from '../components/description';
import { SingleItemUsernameAndDuration } from '../components/username-and-duration';
import { MetaDataType, SingleItemMetaData } from '../components/item-metadata';
import { FileType, SingleItemFiles } from '../components/files';

const username = 'Ralph Edwards';
const duration = '8:15';

const videoData: MetaDataType[] = [
    {
        id: 1,
        key: 'Genre',
        value: 'Sci-fi'
    },
    {
        id: 2,
        key: 'Type',
        value: 'Clip'
    },
    {
        id: 3,
        key: 'Lanuage',
        value: 'En'
    }
];

const videoFiles: FileType[] = [
    {
        id: 1,
        chapterName: 'Chapter 01',
        duration: '10:14'
    },
    {
        id: 2,
        chapterName: 'Chapter 02',
        duration: '12:64'
    },
    {
        id: 3,
        chapterName: 'Chapter 03',
        duration: '56:20'
    },
    {
        id: 4,
        chapterName: 'Chapter 04',
        duration: '1:14:58'
    },
    {
        id: 5,
        chapterName: 'Chapter 05',
        duration: '36:04'
    }
];

type Props = {
    description: string;
    metaDataList: MetaDataType[],
    username: string,
    userProfile: string,
    duration: number
};

export function SingleVideoContent({ description, metaDataList, username, userProfile, duration }: Props) {
    return (
        <PaddingContainer>
            <Box width="100%" marginTop={16}>
                <SingleItemDescription description={description} />
                <Box marginTop={16}>
                    <SingleItemUsernameAndDuration
                        username={username}
                        profileUri={userProfile}
                        duration={duration}
                    />
                </Box>
                <SingleItemMetaData data={metaDataList} />
            </Box>
        </PaddingContainer>
    );
}
