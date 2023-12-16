import { Image, TouchableOpacity } from 'react-native';
import { Box } from '../../../components/box';
import { PaddingContainer } from '../../../styles/grid';
import { SIGNINS_LIST_ITEM_GRADIET } from '../../../constaints/images';
import { theme } from '../../../constaints/theme';
import { Text } from '../../../components/text';
import { ICON_CHECK_WHITE } from '../../../constaints/icons';
import { Transaction } from '../../../types/transaction';
import { formatDate } from '../../../utils/format-date';

type Props = {
  data: Transaction;
  isDownloadActive: boolean;
  toggleAddToDownloadItem: (id: number) => void;
  isSelected: boolean;
};

export function HistoryListItem({
  data,
  isDownloadActive,
  toggleAddToDownloadItem,
  isSelected,
}: Props) {
  if (!data.id) {
    return null;
  }

  const creationDate = formatDate(data.created_at);

  return (
    <PaddingContainer>
      <Box direction="row" justifyContent="space-between">
        <Box
          width={isDownloadActive ? '85%' : '100%'}
          height={100}
          paddingTop={22}
          paddingBottom={22}
          alignItems="center"
          marginBottom={8}
          borderRadius={16}
        >
          <Image
            source={{
              uri: SIGNINS_LIST_ITEM_GRADIET,
            }}
            style={{
              width: '100%',
              height: 98,
              position: 'absolute',
              left: 0,
              top: 0,
              borderRadius: 16,
            }}
          />
          <Box
            width="100%"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            paddingLeft={16}
            paddingRight={16}
            marginBottom={8}
          >
            <Text color={theme.color.light.WHITE} fontSize={14} lineHeight={17.3}>
              {data.value}
            </Text>
            <Text
              color={theme.color.light.TEXT}
              fontSize={theme.numericFontSize.sm}
              lineHeight={theme.numericLineHeight.md}
            >
              {creationDate}
            </Text>
          </Box>
          <Box width="100%" direction="row">
            <Text color={theme.color.light.TEXT} paddingLeft={16} paddingRight={16}>
              {data.description}
            </Text>
          </Box>
        </Box>
        {isDownloadActive ? (
          <Checkbox
            id={data.id}
            isSelected={isSelected}
            toggleAddToDownloadItem={toggleAddToDownloadItem}
          />
        ) : null}
      </Box>
    </PaddingContainer>
  );
}

export function Checkbox({
  toggleAddToDownloadItem,
  id,
  isSelected,
}: {
  toggleAddToDownloadItem: (id: number) => void;
  id: number;
  isSelected: boolean;
}) {
  return (
    <Box width="15%" height={95} alignItems="center" justifyContent="center">
      <TouchableOpacity onPress={() => toggleAddToDownloadItem(id)}>
        <Box
          width={25}
          height={25}
          alignItems="center"
          justifyContent="center"
          borderColor={theme.color.light.LIGHT_GRAY}
          borderRadius={8}
          backgroundColor={isSelected ? theme.color.light.PRIMARY : 'transparent'}
        >
          {isSelected ? <ICON_CHECK_WHITE width={12} height={12} /> : null}
        </Box>
      </TouchableOpacity>
    </Box>
  );
}
