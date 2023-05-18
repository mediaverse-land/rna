import { StyleSheet, TouchableOpacity } from 'react-native';
import { SearchBarComponents } from './style';
import { ICON_SEARCH } from '../../constaints/icons';
import { useNavigation } from '@react-navigation/native';

const { SearchInput, SearchIcon } = SearchBarComponents;

export function SearchBar() {
    const navigation = useNavigation<any>();

    const navigateToSearchPageHandler = () => {
        navigation.navigate('Search')
    }

    return (
        <TouchableOpacity
            style={styles.wrapper}
            onPress={navigateToSearchPageHandler}
        >
            <SearchIcon source={{ uri: ICON_SEARCH }} />
            <SearchInput
                placeholder="Search"
                placeholderTextColor="#83839C"
                onFocus={navigateToSearchPageHandler}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: 132,
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
