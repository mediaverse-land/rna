import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UseNavigationType } from '../../../../types/use-navigation';
import { Box } from '../../../../components/box';
import { Text } from '../../../../components/text';
import { Input } from '../../../../components/form';
import { theme } from '../../../../constaints/theme';
import { AuthWindows } from '../types';

type Props = {
  setWindowHandler: (window: AuthWindows) => void;
};

export const SendCode = ({ setWindowHandler }: Props) => {
  const navigation = useNavigation<UseNavigationType>();

  const navigateToExploreHandler = () => {
    navigation.navigate('AppStack');
  };

  const navigateToSignupPage = () => {
    setWindowHandler('singin');
  };

  return (
    <>
      <Box flex={1} alignItems="center">
        <Box position="relative" top={'27%'} alignItems="center">
          <Text color={theme.color.light.WHITE} lineHeight={20} fontSize={12} fontWeight={600}>
            We send the code to +339012910407
          </Text>

          <Box width="100%" marginTop={40} position="relative">
            <Input placeholder="your number..." labelText="Code" />
          </Box>
        </Box>
        <Box width="100%" alignItems="center" position="absolute" bottom={10}>
          <TouchableOpacity activeOpacity={1} onPress={navigateToSignupPage}>
            <Text
              color={theme.color.light.LIGHT_DESCRIPTION}
              lineHeight={20}
              fontSize={12}
              fontWeight={600}
              marginBottom={24}
            >
              Dont have an account?
              <Text color={theme.color.light.PRIMARY}> Log in</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.fullWidth}
            onPress={navigateToExploreHandler}
          >
            <Box
              width="100%"
              height={48}
              alignItems="center"
              justifyContent="center"
              borderRadius={32}
              backgroundColor="rgba(78, 78, 97, 0.5)"
            >
              <Text color={theme.color.light.WHITE} lineHeight={20} fontSize={12} fontWeight={600}>
                Send code
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
});
