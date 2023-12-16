import { FC } from 'react';
import { Box } from '../../../components/box';
import { UserNameCard } from '../../../components/username-card';
import { Text } from '../../../components/text';
import { theme } from '../../../constaints/theme';
import { formatTime } from '../../../utils/format-time';

type Props = {
  username: string;
  profileUri: string;
  duration: number;
};

export const SingleItemUsernameAndDuration: FC<Props> = ({ username, profileUri, duration }) => {
  const durationTime = formatTime(duration);

  return (
    <Box width="100%" direction="row" alignItems="center" justifyContent="space-between">
      <UserNameCard
        username={username}
        profileUri={profileUri}
        usernameStyles={{
          color: theme.color.light.TEXT,
          marginLeft: 8,
        }}
        profileImageStyles={{
          width: 18,
          height: 18,
        }}
      />
      <Text color={theme.color.light.TEXT} fontSize={14} lineHeight={14} paddingTop={5}>
        {duration ? (
          <>
            {durationTime.minute}:{durationTime.second}
          </>
        ) : null}
      </Text>
    </Box>
  );
};
