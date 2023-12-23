import { Box } from '../../../../components/box';
import { PaddingContainer } from '../../../../styles/grid';
import { MetaDataType, SingleItemMetaData } from '../../components/item-metadata';

export const MetaData = () => {
  const metaDataList: MetaDataType[] =
    [
      {
        id: 1,
        key: 'Suffix',
        value: 'Something',
      },
      {
        id: 2,
        key: 'Type',
        value: 'Music',
      },
      {
        id: 3,
        key: 'Lanuage',
        value: 'en',
      },
    ] || [];

  return (
    <Box width="100%" marginTop={24}>
      <PaddingContainer>
        <SingleItemMetaData data={metaDataList} />
      </PaddingContainer>
    </Box>
  );
};
