import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { HeaderStyles } from './style';
import { useNavigation } from '@react-navigation/native';
import { UseNavigationType } from '../../types/use-navigation';

export function Header() {
    const navigation = useNavigation<UseNavigationType>();

    function navigateToSearchPage() {
        navigation.navigate('Search');
    }

    return (
        <>
            <HeaderStyles.HeaderWrapper>
                <HeaderStyles.Profile>
                    <Image
                        source={require('./../../../assets/img/10-profile-picture.png')}
                        style={styles.headerProfileImage}
                    />
                    <HeaderStyles.UserName>User.Name</HeaderStyles.UserName>
                </HeaderStyles.Profile>
                <HeaderStyles.SearchIconWrapper>
                    <TouchableOpacity
                        onPress={navigateToSearchPage}
                        activeOpacity={1}
                    >
                        <Image
                            source={require('./../../../assets/icons/icon__search.png')}
                            style={styles.searchIcon}
                        />
                    </TouchableOpacity>
                </HeaderStyles.SearchIconWrapper>
            </HeaderStyles.HeaderWrapper>
            <HeaderStyles.BorderIndicator />
        </>
    );
}

const styles = StyleSheet.create({
    headerProfileImage: {
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 100
    },
    searchIcon: {
        width: 18,
        height: 18
    }
});
