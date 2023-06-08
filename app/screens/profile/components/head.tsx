import { Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Box } from '../../../shared/components/box';
import { Flex } from '../../../styles/grid';
import { Text } from '../../../shared/components/text';
import { theme } from '../../../constaints/theme';
import { windowSize } from './../../../utils/window-size';
import { ICON_PROFILE_SETTINGS_SVG } from '../../../constaints/icons';
import { useNavigation } from '@react-navigation/native';
import { UseNavigationType } from '../../../shared/types/use-navigation';
import { useContext } from 'react';
import { tokenContext } from '../../../context/token';
import { LoadingSpinner } from '../../../shared/components/loader-spinner';
import { User } from '../../../shared/types/user';

const { width: windowWidth, height: windowHeight } = windowSize();

const usernameBoxWidth = Math.floor(windowWidth) - 184;

const userProfileData = [
    {
        id: 1,
        value: '126',
        title: 'Assets'
    },
    {
        id: 2,
        value: '15.1 k',
        title: 'Sales'
    },
    {
        id: 3,
        value: '20k $',
        title: 'Volume'
    }
];

export function ProfileScreenHead() {
    const _tokenCtx = useContext(tokenContext);
    const navigation = useNavigation<UseNavigationType>();

    const user: User = _tokenCtx.getUser();

    console.log(user)

    if (!user) {
        return <Box
            width='100%'
            height={windowHeight}
            alignItems='center'
            justifyContent='center'
        >
            <LoadingSpinner color='red' />
        </Box>
    }


    const settingsScreenRedirect = () => {
        navigation.navigate('Settings');
    };

    return (
        <Box
            width={'100%'}
            height={248}
            backgroundColor="rgba(14, 14, 18, 0.5)"
            borderBottomLeftRadius={32}
            borderBottomRightRadius={32}
        >
            <Box width={'100%'} height={52}>
                <LinearGradient
                    colors={['#204cb4', '#b3c4ea']}
                    start={{ x: 0.6, y: 0.2 }}
                    end={{ x: 0.1, y: 0.2 }}
                    style={{
                        width: '100%',
                        height: 52
                    }}
                />
            </Box>
            <Box width={'100%'} height={200}>
                <LinearGradient
                    colors={['#0a0a2f', '#0b0b30']}
                    start={{ x: 0.7, y: 0.2 }}
                    end={{ x: 0.1, y: 0.2 }}
                    style={{
                        width: '100%',
                        height: 200,
                        borderBottomLeftRadius: 32,
                        borderBottomRightRadius: 32
                    }}
                >
                    <Box
                        width="100%"
                        height={91.25}
                        paddingLeft={24}
                        paddingRight={24}
                    >
                        <Flex
                            width="100%"
                            height="91.25px"
                            direction="row"
                            justify="space-between"
                            align="center"
                        >
                            <Box
                                width={88}
                                height={88}
                                borderRadius={100}
                                paddingBottom={10}
                                paddingRight={10}
                                paddingLeft={10}
                                paddingTop={10}
                                backgroundColor="#0B0B30"
                                position="relative"
                                top={-14}
                                left={-15}
                            >
                                <Image
                                    source={{
                                        uri: 'https://s3-alpha-sig.figma.com/img/8b38/0123/1b3bc56d8d3d28d35c9776e478125bae?Expires=1685318400&Signature=IALmUfe1pWMhc5VmvDAYHMHXLcXTNX9kst0mU3Q54mU6qqcvy5GGeYWrlOTzEmiQMyLJoD2x0wubUWW3U6fudvWhMXIuZvNE-eOjExtUyvP15lOy6XZlOyGnpCSgbXb-BUlGplDbEEn8KVzIzPe3qNOxUOBAn-HYRkRITDolol0R~jdB~xt52a00LN4SAZt1AS4hb6sGQVhc~qS5wnEzl1KTyU~1SxDZFuyuK72SswYopLVrpXSd3jqonWHOSgzceOvLmQOWR~Ev29uBpvetQhzs7bp2LMc9gmrQMo-~BSdxHtGeM6uWRUZrAl~ukddyhPZcbqg~YzzmFGJvSPyVoQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                                    }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 100
                                    }}
                                />
                            </Box>
                            <Box width={usernameBoxWidth}>
                                <Box direction="row">
                                    <Text
                                        color={theme.color.light.WHITE}
                                        fontWeight={600}
                                        fontSize={theme.numericFontSize.md}
                                    >
                                        {user.username}
                                    </Text>
                                </Box>
                                <Box direction="row">
                                    <Text
                                        color={
                                            theme.color.light.LIGHT_DESCRIPTION
                                        }
                                        fontSize={theme.numericFontSize.sm}
                                        fontWeight={400}
                                        marginTop={4}
                                    >
                                        {user.email}
                                    </Text>
                                </Box>
                            </Box>
                            <Box
                                width={48}
                                height={48}
                                borderRadius={16}
                                borderColor={
                                    theme.color.light.INPUT_PLACEHOLDER
                                }
                                backgroundColor="rgba(14, 14, 18, 0.5)"
                            >
                                <Flex
                                    align="center"
                                    justify="center"
                                    width="48px"
                                    height="48px"
                                >
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        onPress={settingsScreenRedirect}
                                    >
                                        <ICON_PROFILE_SETTINGS_SVG
                                            style={{
                                                width: 19.2,
                                                height: 20
                                            }}
                                        />
                                    </TouchableOpacity>
                                </Flex>
                            </Box>
                        </Flex>
                    </Box>

                    <Box
                        width="100%"
                        height={100}
                        paddingLeft={24}
                        paddingRight={24}
                    >
                        <Flex
                            width="100%"
                            height="100px"
                            direction="row"
                            align="center"
                            justify="space-between"
                        >
                            {userProfileData.map((data) => (
                                <Box
                                    key={data.id}
                                    backgroundColor="#181839"
                                    width="30%"
                                    height={68}
                                    borderRadius={16}
                                >
                                    {/* <Image
                                            source={{ uri: HORIZONTAL_SLIDER_GRADIENT }}
                                            style={{
                                                width: usernameBoxWidth,
                                                height: 68,
                                                position: 'absolute',
                                                left: 1,
                                                borderRadius: 8
                                            }}
                                            resizeMode="cover"
                                        /> */}
                                    <Box
                                        position="absolute"
                                        height={1}
                                        width={46}
                                        backgroundColor={
                                            theme.color.light.PRIMARY
                                        }
                                        left="29%"
                                    >
                                        <></>
                                    </Box>
                                    <Flex
                                        width="100%"
                                        height="68"
                                        align="center"
                                        justify="center"
                                    >
                                        <Text
                                            color={
                                                theme.color.light
                                                    .CARD_TITLE_TEXT
                                            }
                                            fontSize={theme.numericFontSize.md}
                                            lineHeight={20}
                                        >
                                            {data.value}
                                        </Text>
                                        <Text
                                            color={
                                                theme.color.light
                                                    .LIGHT_DESCRIPTION
                                            }
                                            fontSize={theme.numericFontSize.sm}
                                            lineHeight={12}
                                            marginTop={4}
                                        >
                                            {data.title}
                                        </Text>
                                    </Flex>
                                </Box>
                            ))}
                        </Flex>
                    </Box>
                </LinearGradient>
            </Box>
        </Box>
    );
}

// @Mahdi1212