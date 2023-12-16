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

const { SearchInput } = SearchBarComponents;

const { width } = windowSize();

export function SearchBar() {
  const { isRtl } = useRtl();
  const navigation = useNavigation<UseNavigationType>();

  const navigateToSearchPageHandler = () => {
    navigation.navigate('Search');
  };

  return (
    <Box
      additionalStyles={{
        width: width,
        height: 96,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1000000,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        overflow: 'hidden',
      }}
    >
      <BlurView style={styles.wrapper} intensity={70} tint="dark">
        <TouchableOpacity
          style={{
            width: '100%',
          }}
          activeOpacity={1}
          onPress={navigateToSearchPageHandler}
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
  wrapper: {
    width: width,
    height: 96,
    zIndex: 10,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 24,
    backgroundColor: 'rgba(14, 14, 18, 0.50)',
    paddingRight: 24,
  },
  iconSearch: {
    position: 'relative',
    left: width - 85,
    top: -30,
  },
});
