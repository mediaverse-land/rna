import { Image } from 'react-native';
import { HeaderStyles } from './style';

export function Header() {
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
                    <Image
                        source={require('./../../../assets/icons/icon__search.png')}
                        style={{ width: 18, height: 18 }}
                    />
                </HeaderStyles.SearchIconWrapper>
            </HeaderStyles.HeaderWrapper>
            <HeaderStyles.BorderIndicator />
        </>
    );
}
