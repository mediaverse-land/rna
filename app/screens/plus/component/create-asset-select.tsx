import { TouchableOpacity } from 'react-native';
import { Box } from '../../../components/box';
import { Text } from '../../../components/text';
import { theme } from '../../../constaints/theme';
import { ICON_ARROW_DOWN_SVG } from '../../../constaints/icons';

/**
 * @description A select box component to retrive the selected language
 * of user
 *
 * @param OnPress
 */
export const CreateAssetSelect = ({
  onPress,
  selectedItem,
  title,
}: {
  onPress: () => void;
  selectedItem: string;
  title: string;
}) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress}>
      <Box
        width="100%"
        height={48}
        backgroundColor="rgba(14, 14, 18, 0.50)"
        borderColor="#353542"
        borderRadius={8}
        direction="row"
        alignItems="center"
        paddingLeft={16}
        paddingRight={16}
        justifyContent="space-between"
      >
        <Text color={theme.color.light.DARK_INPUT_PLACEHOLDER} fontSize={16} fontWeight={400}>
          {selectedItem || title}
        </Text>
        <ICON_ARROW_DOWN_SVG />
      </Box>
    </TouchableOpacity>
  );
};
