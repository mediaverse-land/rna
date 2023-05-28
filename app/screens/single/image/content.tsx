import { Box } from '../../../shared/components/box';
import { PaddingContainer } from '../../../styles/grid';
import { PROFILE_ONE } from '../../../constaints/images';
import { SingleItemDescription } from '../components/description';
import { SingleItemUsernameAndDuration } from '../components/username-and-duration';
import {
    SingleItemMetaData,
    MetaDataType
} from '../components/item-metadata';

const description =
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat. ';
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


export function SingleImageContent() {
    return (
        <PaddingContainer>
            <Box width="100%" marginTop={16}>
                {/* description */}
                <SingleItemDescription
                    description={description}
                />
                <Box marginTop={16}>
                    <SingleItemUsernameAndDuration
                        username={username}
                        profileUri={PROFILE_ONE}
                        duration={duration}
                    />
                </Box>
                <SingleItemMetaData
                    data={videoData}
                />
            </Box>
        </PaddingContainer>
    );
}
