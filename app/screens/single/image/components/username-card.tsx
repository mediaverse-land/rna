import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '../../../../components/box';
import { UserNameCard } from '../../../../components/username-card';
import { theme } from '../../../../constaints/theme';
import { PaddingContainer } from '../../../../styles/grid';
import { RootState } from '../../../../store';

const ImageUsernameCardMemo = () => {
  const { assetUsername, assetUserProfile } = useSelector(
    (state: RootState) => state.singleAssetSlice,
  );

  return (
    <PaddingContainer>
      <Box direction="row" alignItems="center" marginTop={16}>
        <UserNameCard
          usernameStyles={{
            color: theme.color.light.TEXT,
          }}
          profileUri={assetUserProfile}
          username={assetUsername}
        />
      </Box>
    </PaddingContainer>
  );
};

export const ImageUsernameCard = memo(ImageUsernameCardMemo);
