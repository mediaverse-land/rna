import { FC } from 'react';
import { theme } from '../../../constaints/theme';
import { Box } from '../../../shared/components/box';
import { Text } from '../../../shared/components/text';

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
                {description}
                <Text color={theme.color.light.LIGHT_TEXT}>more...</Text>
            </Text>
        </Box>
    );
};
