import { Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Flex } from '../../../styles/grid';
import { Box } from '../../../components/box';
import { Text } from '../../../components/text';
import { theme } from '../../../constaints/theme';
import { ICON_ARROW_LEFT_SVG } from '../../../constaints/icons';
import { useNavigation } from '@react-navigation/native';
import { useRtl } from '../../../hooks/use-rtl';
import { useContext } from 'react';
import { userContext } from '../../../context/user';
import { User } from '../../../types/user';
import { LoadingSpinner } from '../../../components/loader-spinner';
import { PROFILE_IMAGE } from '../../../constaints/images';

export function SettingsScreenHeader() {
  const { isRtl } = useRtl();
  const navigation = useNavigation();

  const userCtx = useContext(userContext);

  const user: User = userCtx.getUser();

  const { username, email } = user;

  if (!username && !email) {
    return (
      <Box width="100%" height={52} alignItems="center" justifyContent="center">
        <LoadingSpinner color="red" />
      </Box>
    );
  }

  const goBackHandler = () => {
    navigation.goBack();
  };

  return (
    <>
      <LinearGradient
        colors={['#204cb4', '#b3c4ea']}
        start={{ x: 0.6, y: 0.2 }}
        end={{ x: 0.1, y: 0.2 }}
        style={{
          width: '100%',
          height: 52,
        }}
      />
      <Flex>
        <Box width="100%">
          <Flex width="100%" height="140px" align="center" justify="center">
            <Box
              width={88}
              height={88}
              backgroundColor="#0b0b30"
              position="absolute"
              top={-14}
              borderRadius={100}
              paddingLeft={5}
              paddingTop={5}
            >
              <Image
                source={{
                  uri: PROFILE_IMAGE,
                }}
                style={{
                  width: 77,
                  height: 77,
                  borderRadius: 100,
                }}
              />
            </Box>
            <Text
              fontWeight={600}
              marginTop={68}
              color={theme.color.light.WHITE}
              fontSize={theme.numericFontSize.md}
              lineHeight={theme.numericFontSize.md}
            >
              {username}
            </Text>
            <Text
              fontWeight={400}
              marginTop={8}
              color={theme.color.light.LIGHT_DESCRIPTION}
              fontSize={theme.numericFontSize.sm}
              lineHeight={theme.numericFontSize.sm}
            >
              {email}
            </Text>
          </Flex>
        </Box>
      </Flex>
      <Box position="absolute" top={76} left={24}>
        <TouchableOpacity activeOpacity={1} onPress={goBackHandler}>
          <ICON_ARROW_LEFT_SVG
            style={{
              width: 122,
              height: 16.88,
              transform: [{ rotate: isRtl ? '180deg' : '0deg' }],
            }}
          />
        </TouchableOpacity>
      </Box>
    </>
  );
}
