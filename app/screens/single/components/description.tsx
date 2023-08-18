import { FC } from 'react';
import { theme } from '../../../constaints/theme';
import { Box } from '../../../components/box';
import { Text } from '../../../components/text';

type Props = {
    description: string;
};

export const SingleItemDescription: FC<Props> = ({ description }) => {
    return (
        <Box position="relative" zIndex={13}>
            <Text
                color={theme.color.light.TEXT}
                fontSize={theme.numericFontSize.md}
                lineHeight={theme.numericLineHeight.md}
                fontWeight={400}
            >
                {description}{' '}
            </Text>
        </Box>
    );
};
