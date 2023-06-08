import { FC } from 'react';
import { Box } from '../../../shared/components/box';
import { UserNameCard } from '../../../shared/components/username-card';
import { Text } from '../../../shared/components/text';
import { theme } from '../../../constaints/theme';

type Props = {
    username: string;
    profileUri: string;
    duration: string;
};

export const SingleItemUsernameAndDuration: FC<Props> = ({
    username,
    profileUri,
    duration
}) => {
    return (
        <Box
            width="100%"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            // marginTop={16}
        >
            <UserNameCard
                username={username}
                profileUri={profileUri}
                usernameStyles={{
                    color: theme.color.light.TEXT,
                    marginLeft: 8
                }}
                profileImageStyles={{
                    width: 18,
                    height: 18
                }}
            />
            <Text
                color={theme.color.light.TEXT}
                fontSize={14}
                lineHeight={14}
                paddingTop={5}
            >
                {duration}
            </Text>
        </Box>
    );
};
