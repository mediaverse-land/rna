import { useSelector } from 'react-redux';
import { Box } from '../../../../components/box';
import { UserNameCard } from '../../../../components/username-card';
import { theme } from '../../../../constaints/theme';
import { PaddingContainer } from '../../../../styles/grid';
import { RootState } from '../../../../store';
import { formatTime } from '../../../../utils/format-time';
import { Text } from '../../../../components/text';

export const SoundUsernameCard = () => {
  const { assetUsername, assetUserProfile, audio } = useSelector(
    (state: RootState) => state.singleAssetSlice,
  );

  const formattedPosition = audio.durationMilis ? formatTime(audio.durationMilis / 1000) : '';

  return (
    <PaddingContainer>
      <Box
        direction="row"
        paddingRight={19}
        alignItems="center"
        justifyContent="space-between"
        marginTop={16}
      >
        <UserNameCard
          usernameStyles={{
            color: theme.color.light.TEXT,
          }}
          profileUri={assetUserProfile}
          username={assetUsername}
        />
        <Text color={theme.color.light.TEXT} fontSize={14} fontWeight={400}>
          {formattedPosition ? (
            <>
              {formattedPosition?.minute}:{formattedPosition?.second}
            </>
          ) : null}
        </Text>
      </Box>
    </PaddingContainer>
  );
};
