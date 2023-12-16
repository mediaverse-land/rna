import { TouchableOpacity } from 'react-native';
import { screenSize } from '../../../utils/screen-size';
import { Box } from '../../../components/box';
import { Text } from '../../../components/text';
import { ICON_ARROW_UP } from '../../../constaints/icons';

const { width: WINDOW_WIDTH } = screenSize();

const seatch_input_width = Math.floor(WINDOW_WIDTH) - 48 - 22 - 48 - 32;

type MetaSearchItemProps = { title: string; pressHandler: () => void };

export const AllLivesMetaSearchItem = ({ title, pressHandler }: MetaSearchItemProps) => {
  return (
    <TouchableOpacity
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}
      activeOpacity={1}
      onPress={pressHandler}
    >
      <Box
        width={seatch_input_width - 8}
        height={49}
        borderRadius={16}
        backgroundColor="#0E0E1280"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        paddingRight={12}
        paddingLeft={12}
        // position="absolute"
        marginBottom={8}
        right={88}
      >
        <Text color="#fff" lineHeight={16.94} fontSize={14}>
          {title}
        </Text>
        <ICON_ARROW_UP style={{ transform: [{ rotate: '180deg' }] }} />
      </Box>
    </TouchableOpacity>
  );
};
