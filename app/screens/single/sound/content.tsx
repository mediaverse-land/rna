import { PaddingContainer } from '../../../styles/grid';
import { Box } from '../../../components/box';
import { SingleItemDescription } from '../components/description';
import { MetaDataType, SingleItemMetaData } from '../components/item-metadata';

type Props = {
  description: string;
  metaDataList: MetaDataType[];
};

export const SingleSoundContent = ({ description, metaDataList }: Props) => {
  return (
    <PaddingContainer>
      <Box position="relative" zIndex={20} width="100%" marginTop={32}>
        <SingleItemDescription description={description} />
        <SingleItemMetaData data={metaDataList} />
      </Box>
    </PaddingContainer>
  );
};
