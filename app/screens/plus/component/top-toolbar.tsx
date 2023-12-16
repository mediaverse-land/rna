import { FC, memo } from 'react';
import { Box } from '../../../components/box';
import { GoBackButton } from '../../single/components/goback-button';
import { Text } from '../../../components/text';
import { theme } from '../../../constaints/theme';

type Props = {
  title?: string;
  goBackHandler: () => void;
};

const TopToolbarMemo: FC<Props> = ({ title, goBackHandler }) => {
  return (
    <Box
      position="relative"
      top={-4}
      direction="row"
      justifyContent="center"
      alignItems="center"
      paddingTop={30}
    >
      <GoBackButton hasBackground goBackHandler={goBackHandler} />
      {title ? (
        <Text color={theme.color.light.WHITE} fontSize={16} fontWeight={400}>
          {title}
        </Text>
      ) : null}
    </Box>
  );
};

export const TopToolbar = memo(TopToolbarMemo);
