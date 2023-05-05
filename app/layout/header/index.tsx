import { Image, TouchableOpacity } from 'react-native';
import { HeaderStyles } from './style';
import { useNavigation } from '@react-navigation/native';

export function Header() {
    const navigation = useNavigation<any>();

    function navigateToSearchPage() {
        navigation.navigate('Search');
    }

    return (
        <>
            <HeaderStyles.HeaderWrapper>
                <HeaderStyles.Profile>
                    <Image
                        source={require('./../../../assets/img/10-profile-picture.png')}
                        style={{
                            width: 40,
                            height: 40,
                            marginRight: 10,
                            borderRadius: 100
                        }}
                    />
                    <HeaderStyles.UserName>User.Name</HeaderStyles.UserName>
                </HeaderStyles.Profile>
                <HeaderStyles.SearchIconWrapper>
                    <TouchableOpacity onPress={navigateToSearchPage}>
                        <Image
                            source={require('./../../../assets/icons/icon__search.png')}
                            style={{ width: 18, height: 18 }}
                        />
                    </TouchableOpacity>
                </HeaderStyles.SearchIconWrapper>
            </HeaderStyles.HeaderWrapper>
            <HeaderStyles.BorderIndicator />
        </>
    );
}
