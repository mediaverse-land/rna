import { BlurView } from 'expo-blur';
import { Box } from '../../../../components/box';
import { windowSize } from '../../../../utils/window-size';
import { theme } from '../../../../constaints/theme';
import { Button } from '../../../../components/button';
import { Text } from '../../../../components/text';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import { isAndroid } from '../../../../controllers/platform.controller';
import { ICON_DOWNLOAD_WHITE } from '../../../../constaints/icons';
import { useNavigation } from '@react-navigation/native';
import { UseNavigationType } from '../../../../types/use-navigation';
import { EDIT_SCREEN } from '../../../../constaints/consts';
import { openGoogleDriveShareBottomSheet } from '../../../../slices/single-text.slice';

const { height } = windowSize();
const IS_ANDROID = isAndroid();

export const FooterCard = () => {
  const { isOwner, name } = useSelector((state: RootState) => state.singelTextSlice);

  const CARD_HEIGHT = useMemo(() => {
    if (isOwner) {
      return IS_ANDROID ? 190 : 168;
    }
    return 176;
  }, [isOwner]);

  return (
    <Box
      width="100%"
      position="absolute"
      top={height - CARD_HEIGHT}
      height={CARD_HEIGHT}
      additionalStyles={{
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        overflow: 'hidden',
      }}
    >
      <BlurView
        intensity={40}
        tint="dark"
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <Box
          width="100%"
          height="100%"
          borderColor={theme.color.light.ASSET_FOOTER_CARD_BORDER}
          borderRadius={16}
          paddingTop={24}
          paddingLeft={24}
          paddingRight={24}
          paddingBottom={32}
          backgroundColor={IS_ANDROID ? '#19194a' : theme.color.light.ASSET_FOOTER_CARD_BG}
        >
          {isOwner ? <OwnerBox name={name} /> : <UserBox />}
        </Box>
      </BlurView>
    </Box>
  );
};

const UserBox = () => {
  const navigation = useNavigation<UseNavigationType>();

  const { id } = useSelector((state: RootState) => state.singelTextSlice);

  const navigateToEditScreen = () => {
    navigation.navigate(EDIT_SCREEN, {
      id: id,
      assetType: 'text',
    });
  };

  return (
    <Box width="100%" height="100%">
      <PlanButton planName="Ownership" price={150} onpressHandler={navigateToEditScreen} />
      <Button varient="primary" text="Buy" marginTop={16} />
    </Box>
  );
};

const OwnerBox = ({ name }: { name: string }) => {
  const dispatch = useDispatch<AppDispatch>();

  const openShareGoogleDriveModalHandler = () => {
    dispatch(openGoogleDriveShareBottomSheet());
  };

  return (
    <Box width="100%" height="100%">
      <PlanButton planName={name} price={20} onpressHandler={openShareGoogleDriveModalHandler} />
      <Button varient="muted" text="Edit information" marginTop={16} onpressHandler={() => {}} />
    </Box>
  );
};

const PlanButton = ({
  planName,
  onpressHandler,
}: {
  planName: string;
  price: number;
  onpressHandler: () => void;
}) => {
  return (
    <Button
      varient="muted"
      text="sdfds"
      height={56}
      borderRadius={16}
      onpressHandler={onpressHandler}
    >
      <Box
        width="100%"
        height="100%"
        paddingLeft={17}
        paddingRight={17}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box width="70%" direction="row" height={20}>
          <Box>
            <Text
              color={theme.color.light.ASSET_FOOTER_CARD_PLAN_TEXT}
              fontSize={16}
              fontWeight={400}
            >
              {planName}
            </Text>
          </Box>
          {planName?.length > 27 ? (
            <Box>
              <Text
                color={theme.color.light.ASSET_FOOTER_CARD_PLAN_TEXT}
                fontSize={16}
                fontWeight={400}
              >
                ...
              </Text>
            </Box>
          ) : null}
        </Box>
        <Box>
          <ICON_DOWNLOAD_WHITE />
        </Box>
      </Box>
    </Button>
  );
};
