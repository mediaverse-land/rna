import { useSelector } from 'react-redux';
import { Box } from '../../../../components/box';
import { PaddingContainer } from '../../../../styles/grid';
import { MetaDataType, SingleItemMetaData } from '../../components/item-metadata';
import { RootState } from '../../../../store';

export const SoundMetaData = () => {
  const {asset} = useSelector((state:RootState) => state.singleAssetSlice);

  console.log(asset?.asset?.lng)

  const metaDataList: MetaDataType[] =
    [
      {
        id: 1,
        key: 'Suffix',
        value: 'mp3',
      },
      {
        id: 2,
        key: 'Type',
        value: 'Audio',
      },
      {
        id: 3,
        key: 'Lanuage',
        value: asset?.asset?.lng,
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
