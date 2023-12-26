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
import { openGoogleDriveShareBottomSheet } from '../../../../slices/single-text.slice';
import { assetPlans } from '../../../../constaints/states';
import { useNavigation } from '@react-navigation/native';
import { UseNavigationType } from '../../../../types/use-navigation';
import { PAYMENT_STACK } from '../../../../constaints/consts';

const { height } = windowSize();
const IS_ANDROID = isAndroid();

export const FooterCard = () => {
  const { isOwner,thumnails, isSubscriber, name, price, assetId,  plan } = useSelector(
    (state: RootState) => state.singleAssetSlice,
  );

  const currentPlan = assetPlans[plan];

  const thumbnail =thumnails?.['226x226'];

  const hasPermission = isOwner || isSubscriber;

  const CARD_HEIGHT = useMemo(() => {
    if (isSubscriber) {
      return IS_ANDROID ? 126 : 118;
    }
    if (isOwner) {
      return IS_ANDROID ? 190 : 168;
    }

    return 206;
  }, [hasPermission]);

  return (
    <Box
      width="100%"
      position="absolute"
      top={isSubscriber ? height - CARD_HEIGHT : height - CARD_HEIGHT + 14}
      height={CARD_HEIGHT}
      additionalStyles={{
        borderTopRightRadius: 16,
        borderTopLeftRadius: 16,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        overflow: 'hidden',
      }}
    >
      <BlurView
        intensity={IS_ANDROID? 10:30}
        tint="dark"
        style={{
          borderWidth: 1,
          borderColor: 'transparent',
          width: '100%',
          height: IS_ANDROID ? '82%' : '100%',
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
        }}
      >
        <Box
          width="100%"
          height="100%"
          borderColor={theme.color.light.ASSET_FOOTER_CARD_BORDER}
          paddingTop={24}
          paddingLeft={24}
          paddingRight={24}
          paddingBottom={32}
          backgroundColor={IS_ANDROID ? '#19194a26' : theme.color.light.ASSET_FOOTER_CARD_BG}
          borderBottomRightRadius={0}
          borderBottomLeftRadius={0}
          additionalStyles={{
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
          }}
        >
          {isOwner && <OwnerBox currentPlan={currentPlan} price={price} name={name} />}
          {isSubscriber && <SubscriberBox currentPlan={currentPlan} price={price} />}
          {!hasPermission && <UserBox thumbnail={thumbnail} name={name} price={price} id={assetId} currentPlan={currentPlan} />}
        </Box>
      </BlurView>
    </Box>
  );
};

const UserBox = ({
  price,
  currentPlan,
  id,
  name,
  thumbnail,
}: {
  thumbnail: string;
  name: string;
  price: number;
  id: number;
  currentPlan: string;
}) => {
  const navigation = useNavigation<UseNavigationType>();

  const onBuySumbitHandler = async () => {
    const assetId = id;

    navigation.navigate(PAYMENT_STACK, {
      price,
      assetId,
      title:name,
      thumbnail,
    });
  };

  return (
    <Box width="100%" height="100%">
      <Button varient="muted" text="" height={56} borderRadius={16} onpressHandler={() => {}}>
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
                {currentPlan}
              </Text>
            </Box>
          </Box>
          <Box>
            <Box>
              <Text color={theme.color.light.LIGHT_TEXT} fontSize={14} fontWeight={400}>
                {price} $
              </Text>
            </Box>
          </Box>
        </Box>
      </Button>
      <Button varient="primary" text="Buy" marginTop={16} onpressHandler={onBuySumbitHandler} />
    </Box>
  );
};

const SubscriberBox = ({ price, currentPlan }: { price: number; currentPlan: string }) => {
  return (
    <Box width="100%" height="100%">
      <Button varient="muted" text="" height={56} borderRadius={16} onpressHandler={() => {}}>
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
                {currentPlan}
              </Text>
            </Box>
          </Box>
          <Box>
            <Box>
              <Text color={theme.color.light.LIGHT_TEXT} fontSize={14} fontWeight={400}>
                {price} $
              </Text>
            </Box>
          </Box>
        </Box>
      </Button>
    </Box>
  );
};

const OwnerBox = ({ name, price }: { name: string; price: number; currentPlan: string }) => {
  const dispatch = useDispatch<AppDispatch>();

  const openShareGoogleDriveModalHandler = () => {
    dispatch(openGoogleDriveShareBottomSheet());
  };

  return (
    <Box width="100%" height="100%">
      <PlanButton
        planName={name}
        price={price?.toString()}
        onpressHandler={openShareGoogleDriveModalHandler}
      />
      <Button varient="muted" text="Edit information" marginTop={16} onpressHandler={() => {}} />
    </Box>
  );
};

const PlanButton = ({
  planName,
  onpressHandler,
  showIcon = true,
}: {
  planName: string;
  price: string;
  onpressHandler: () => void;
  showIcon?: boolean;
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
        <Box>{showIcon ? <ICON_DOWNLOAD_WHITE /> : null}</Box>
      </Box>
    </Button>
  );
};
