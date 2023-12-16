import { Image, TouchableOpacity } from 'react-native';
import { Box } from '../../../components/box';
import {
  ADD_ACCOUNT_BUTTON_GRADIENT,
  SINGLE_VIDEO_FOOTER_GRAIDENT,
} from '../../../constaints/images';
import { Text } from '../../../components/text';
import { theme } from '../../../constaints/theme';
import { ICON_EYE_GRAY, ICON_SHRE_GRAY } from '../../../constaints/icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { UseNavigationType } from '../../../types/use-navigation';
import { StorageService } from '../../../services/storage.service';
import { Coachmark, CoachmarkComposer } from 'react-native-coachmark';
import { useEffect, useRef, useState } from 'react';
import { HAS_USER_SEEN_BUY_BUTTON_TOUR } from '../../../constaints/consts';

type Props = {
  price?: number | string;
  thumbnail: string;
  title: string;
  assetId: number;
  isLoading: boolean;
  isSubscriber: boolean;
  isOwner: boolean;
};

const TOUR_GUIDE =
  'After choosing the content you want, you have to pay for it depending on its price';

const _storageService = new StorageService();
const CoachmarkWrapper: any = Coachmark;

export function BuyBottom({
  price,
  thumbnail,
  title,
  assetId,
  isLoading,
  isSubscriber,
  isOwner,
}: Props) {
  if (isLoading) {
    return null;
  }

  if (isSubscriber || isOwner) {
    return null;
  }

  const [isTourActive, setIsTourActive] = useState(false);

  const navigation = useNavigation<UseNavigationType>();
  const isFocused = useIsFocused();

  const buttomRef = useRef();

  /**
   * Checks if user has seen the tour before or not,
   * if has seen, return true else false
   * @returns {boolean}
   */
  const hasUserSeenTour = async () => {
    const hasUserSeen = await _storageService.get(HAS_USER_SEEN_BUY_BUTTON_TOUR);
    return hasUserSeen ? true : false;
  };

  const setUserSeenTour = async () => {
    await _storageService.set(HAS_USER_SEEN_BUY_BUTTON_TOUR, HAS_USER_SEEN_BUY_BUTTON_TOUR);
  };

  const setupTour = async () => {
    const hasSeen = await hasUserSeenTour();
    if (hasSeen) {
      return;
    }

    if (buttomRef?.current) {
      setTimeout(() => {
        setIsTourActive(true);
        const composer = new CoachmarkComposer([buttomRef]);
        composer.show().then(async () => {
          await setUserSeenTour();
          setIsTourActive(false);
        });
      }, 2000);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setupTour();
    }
  }, [buttomRef]);

  const paymentScreenNavigationHandler = () => {
    if (isTourActive) {
      return;
    }
    navigation?.navigate('PaymentScreen', {
      price,
      thumbnail,
      title,
      assetId,
    });
  };

  return (
    <>
      <Box width="100%" height={176}>
        <Image
          source={{ uri: SINGLE_VIDEO_FOOTER_GRAIDENT }}
          style={{
            width: '100%',
            height: 176,
            position: 'absolute',
            top: 0,
            left: 0,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
          resizeMode="stretch"
        />
        <Box width="100%" height={176} padding={24}>
          <Box width="100%" height={56} borderRadius={16} backgroundColor="rgba(78, 78, 97, 0.5)">
            <Image
              source={{
                uri: ADD_ACCOUNT_BUTTON_GRADIENT,
              }}
              style={{
                width: '100%',
                height: 56,
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 10,
                borderRadius: 16,
              }}
              resizeMode="stretch"
            />
            <Box
              position="relative"
              zIndex={11}
              height="100%"
              direction="row"
              alignItems="center"
              paddingLeft={17}
              paddingRight={17}
            >
              <Text
                color={theme.color.light.SONG_CARD_TITLE_TEXT}
                fontSize={theme.numericFontSize.md}
                lineHeight={theme.numericLineHeight.md}
                fontWeight={400}
              >
                Ownership
              </Text>
              <Text
                color={theme.color.light.WHITE}
                fontSize={theme.numericFontSize.md}
                lineHeight={theme.numericLineHeight.md}
                marginLeft={16}
                fontWeight={600}
              >
                {price || 0} $
              </Text>
              <Box
                flex={1}
                height={20}
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
              >
                <ICON_EYE_GRAY
                  style={{
                    width: 16,
                    height: 16,
                  }}
                />
                <ICON_SHRE_GRAY
                  style={{
                    width: 16,
                    height: 16,
                    marginLeft: 16,
                  }}
                />
              </Box>
            </Box>
          </Box>
          {/* buy-buton */}
          <Box marginTop={16}>
            <CoachmarkWrapper
              allowBackgroundInteractions={false}
              ref={buttomRef}
              message={TOUR_GUIDE}
            >
              <TouchableOpacity activeOpacity={1} onPress={paymentScreenNavigationHandler}>
                <Box
                  width="100%"
                  height={48}
                  backgroundColor={theme.color.light.PRIMARY}
                  borderRadius={16}
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                >
                  <Text
                    color={theme.color.light.WHITE}
                    fontSize={14}
                    lineHeight={20}
                    fontWeight={600}
                  >
                    Buy
                  </Text>
                </Box>
              </TouchableOpacity>
            </CoachmarkWrapper>
          </Box>
          {/* ) : null} */}
        </Box>
      </Box>
    </>
  );
}
