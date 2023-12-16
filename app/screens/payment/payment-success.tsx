import { useEffect } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ICON_LIKE_BLUE } from '../../constaints/icons';
import { Box } from '../../components/box';
import { Text } from '../../components/text';
import { windowSize } from '../../utils/window-size';
import { TACKING_BOX_GRADEINT } from '../../constaints/images';
import { theme } from '../../constaints/theme';
import { ProgressBar } from '../../components/progress-bar';
import { UseNavigationType } from '../../types/use-navigation';

const { height: windowHeight } = windowSize();

export function PaymentSuccess() {
  const navigation = useNavigation<UseNavigationType>();

  const goBackAfterTwoSec = () => {
    setTimeout(() => {
      navigation.goBack();
    }, 2000);
  };

  useEffect(() => {
    goBackAfterTwoSec();
  }, []);

  return (
    <>
      <ProgressBar />
      <Box
        flex={1}
        width="100%"
        height={Math.floor(windowHeight)}
        alignItems="center"
        justifyContent="center"
      >
        <Box>
          <ICON_LIKE_BLUE
            style={{
              width: 50,
              height: 72,
            }}
          />
        </Box>
        <Box>
          <Text
            color={theme.color.light.WHITE}
            lineHeight={20}
            fontSize={20}
            fontWeight={600}
            marginTop={24}
          >
            It was successful
          </Text>
          <Box alignItems="center">
            <Text
              color={theme.color.light.TEXT}
              lineHeight={16}
              fontSize={16}
              fontWeight={400}
              marginTop={8}
            >
              Enjoy!
            </Text>
          </Box>
        </Box>
        <Box width="100%" marginTop={40} paddingLeft={48} paddingRight={48}>
          <Box width="100%" height={60} backgroundColor="rgba(78, 78, 97, 0.2)" borderRadius={16}>
            <Image
              source={{
                uri: TACKING_BOX_GRADEINT,
              }}
              style={{
                width: '100%',
                height: 60,
                position: 'absolute',
                top: 0,
                left: 1,
                borderRadius: 16,
              }}
            />
            <Box width="100%" height={60} padding={16} direction="row" alignItems="center">
              <Box
                paddingRight={16}
                height={24}
                direction="row"
                alignItems="center"
                additionalStyles={{
                  borderRightWidth: 1,
                  borderRightColor: theme.color.light.TEXT,
                }}
              >
                <Text color={theme.color.light.TEXT} fontSize={14} lineHeight={16} fontWeight={400}>
                  Tracking
                </Text>
              </Box>
              <Box
                flex={1}
                height={24}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                paddingLeft={16}
              >
                <Text
                  color={theme.color.light.WHITE}
                  fontSize={14}
                  lineHeight={16}
                  fontWeight={400}
                >
                  58741236954347
                </Text>
                <Text
                  color={theme.color.light.PRIMARY}
                  fontSize={14}
                  lineHeight={16}
                  fontWeight={400}
                >
                  Copy
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
