import { theme } from '../../../constaints/theme';
import { useRtl } from '../../../hooks/use-rtl';
import { Box } from '../../../components/box';
import { windowSize } from '../../../utils/window-size';
import { Text } from '../../../components/text';
import { useMemo } from 'react';

export type MetaDataType = {
  id: number;
  key: string;
  value: string;
};

const { width } = windowSize();

const ITEM_WIDTH = (width - 48) / 2 - 4;

export function SingleItemMetaData({ data }: { data: MetaDataType[] }) {
  const { isRtl } = useRtl();

  const boxDirection = useMemo(() => (isRtl ? 'row-reverse' : 'row'), [isRtl]);

  const labelDirectionStyles = useMemo(() => {
    return [
      isRtl
        ? {
            borderLeftWidth: 1,
          }
        : {
            borderRightWidth: 1,
          },
      isRtl
        ? {
            borderLeftColor: theme.color.light.TEXT,
          }
        : {
            borderRightColor: theme.color.light.TEXT,
          },
    ];
  }, [isRtl]);

  return (
    <Box
      direction={boxDirection}
      justifyContent="space-between"
      flexWrap="wrap"
      position="relative"
      zIndex={20}
    >
      {data.map((item: MetaDataType, index: number) => (
        <Box
          key={item.id}
          width={ITEM_WIDTH}
          height={32}
          borderColor={theme.color.light.SINGLE_METADATA_BORDER_COLOR}
          borderRadius={8}
          marginTop={index !== 0 && index !== 1 ? 8 : 0}
          direction={boxDirection}
          alignItems="center"
          justifyContent="center"
        >
          <Box
            height={17}
            paddingLeft={16}
            paddingRight={18}
            additionalStyles={labelDirectionStyles}
          >
            <Text color={theme.color.light.TEXT} fontSize={12} fontWeight={400}>
              {item.key}
            </Text>
          </Box>
          <Box height={17} flex={1} justifyContent="center" alignItems="center">
            <Text color={theme.color.light.WHITE} fontSize={12} fontWeight={400}>
              {item.key}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
