import { Box } from '../../../components/box';
import { PaddingContainer } from '../../../styles/grid';
import { PROFILE_ONE } from '../../../constaints/images';
import { SingleItemDescription } from '../components/description';
import { SingleItemUsernameAndDuration } from '../components/username-and-duration';
import { SingleItemMetaData, MetaDataType } from '../components/item-metadata';

type Props = {
    description: string;
    metaDataList: MetaDataType[],
    username: string,
    userProfileUri: string
};

export function SingleImageContent({ description, metaDataList, userProfileUri, username }: Props) {
    return (
        <PaddingContainer>
            <Box width="100%" marginTop={16}>
                {/* description */}
                <SingleItemDescription description={description} />
                <Box marginTop={16}>
                    <SingleItemUsernameAndDuration
                        username={username}
                        profileUri={userProfileUri || PROFILE_ONE}
                        duration={''}
                    />
                </Box>
                <SingleItemMetaData data={metaDataList} />
            </Box>
        </PaddingContainer>
    );
}
