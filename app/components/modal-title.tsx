import { TouchableOpacity } from 'react-native';
import { Box } from './box';
import { Text } from './text';
import { theme } from '../constaints/theme';

export const ModalTitle = ({
  title,
  closerHandler,
}: {
  title: string;
  closerHandler: () => void;
}) => {
  return (
    <Box id="title" direction="row" alignItems="center" justifyContent="space-between">
      <Text color={theme.color.light.WHITE} fontSize={16} fontWeight={600}>
        {title}
      </Text>
      <TouchableOpacity onPress={closerHandler}>
        <Text color={theme.color.light.LIGHT_TEXT} fontSize={14} fontWeight={400}>
          Cancel
        </Text>
      </TouchableOpacity>
    </Box>
  );
};
