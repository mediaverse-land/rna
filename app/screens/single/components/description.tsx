import { FC } from 'react';
import { theme } from '../../../constaints/theme';
import { Box } from '../../../shared/components/box';
import { Text } from '../../../shared/components/text';

type Props = {
    description: string;
};

export const SingleItemDescription: FC<Props> = ({ description }) => {
    return (
        <Box position='relative' zIndex={13}>
            <Text
                color="#666680"
                fontSize={theme.numericFontSize.md}
                lineHeight={theme.numericLineHeight.md}
                fontWeight={400}
            >
                {description}
                <Text color="#A2A2B5">more...</Text>
            </Text>
        </Box>
    );
};
