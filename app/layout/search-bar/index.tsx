import { StyleSheet, TouchableOpacity } from 'react-native';
import { SearchBarComponents } from './style';
import { ICON_SEARCH_SVG_PATH } from '../../constaints/icons';
import { useNavigation } from '@react-navigation/native';
import { useRtl } from '../../hooks/use-rtl';
import { UseNavigationType } from '../../types/use-navigation';
import { theme } from '../../constaints/theme';
import { BlurView } from 'expo-blur';
import { windowSize } from '../../utils/window-size';
import { Box } from '../../components/box';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isIos } from '../../controllers/platform.controller';

const { SearchInput } = SearchBarComponents;

const IS_IOS = isIos();

const { width } = windowSize();

export function SearchBar() {
  const { top } = useSafeAreaInsets();

  const { isRtl } = useRtl();
  const navigation = useNavigation<UseNavigationType>();

  const navigateToSearchPageHandler = () => {
    navigation.navigate('Search');
  };

  return (
    <Box
      additionalStyles={{
        width: width,
        height: IS_IOS ? 76 + top : 96,
        position: 'absolute',
        left: 0,
        zIndex: 1000000,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        overflow: 'hidden',
      }}
    >
      <BlurView
        style={{
          width: width,
          height: IS_IOS ? 76 + top : 96,
          zIndex: 10,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: 24,
          backgroundColor: 'rgba(14, 14, 18, 0.50)',
          paddingRight: 24,
        }}
        intensity={IS_IOS ? 30 : 20}
        tint="dark"
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={navigateToSearchPageHandler}
          style={{
            width: '100%',
          }}
        >
          <SearchInput
            placeholder="Search"
            placeholderTextColor={theme.color.light.LIGHT_DESCRIPTION}
            onFocus={navigateToSearchPageHandler}
            textAlign={!isRtl ? 'left' : 'right'}
          />
          <ICON_SEARCH_SVG_PATH width={16} height={16} style={styles.iconSearch} />
        </TouchableOpacity>
      </BlurView>
    </Box>
  );
}

const styles = StyleSheet.create({
  iconSearch: {
    position: 'relative',
    left: width - 85,
    top: -30,
  },
});
