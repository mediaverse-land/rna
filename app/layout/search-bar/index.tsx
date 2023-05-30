import { StyleSheet, TouchableOpacity } from 'react-native';
import { SearchBarComponents } from './style';
import { ICON_SEARCH_SVG_PATH } from '../../constaints/icons';
import { useNavigation } from '@react-navigation/native';
import { useRtl } from '../../hooks/use-rtl';
import { UseNavigationType } from '../../shared/types/use-navigation';

const { SearchInput } = SearchBarComponents;

export function SearchBar() {
    const { isRtl } = useRtl();
    const navigation = useNavigation<UseNavigationType>();

    const navigateToSearchPageHandler = () => {
        navigation.navigate('Search');
    };

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={styles.wrapper}
            onPress={navigateToSearchPageHandler}
        >
            <SearchInput
                placeholder="Search"
                placeholderTextColor="#83839C"
                onFocus={navigateToSearchPageHandler}
                textAlign={!isRtl ? 'left' : 'right'}
            />
            <ICON_SEARCH_SVG_PATH
                width={16}
                height={16}
                style={{
                    position: 'relative',
                    left: '40%',
                    top: -30
                }}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: 96,
        zIndex: 10,
        backgroundColor: '#0e0e12a0',
        position: 'absolute',
        top: 0,
        left: 0,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 24,
        paddingRight: 24
    }
});
