import { Image, TouchableOpacity, View } from 'react-native';
import { BottomTabBarComponents } from './style';

import ICON_EXPLORE_PNG from './../../../../assets/icons/icon__explore.png';
import ICON_EXPLORE_ACTIVE_PNG from './../../../../assets/icons/icon__explore-active.png';
import ICON_ADD_PNG from './../../../../assets/icons/icon__add.png';
import ICON_ADD_ACTIVE_PNG from './../../../../assets/icons/icon__add-active.png';
import ICON_MATCH_APPS_PNG from './../../../../assets/icons/icon__match-apps.png';
import ICON_PROFILE_PNG from './../../../../assets/icons/icon__profile.png';
import ICON_PROFILE_ACTIVE_PNG from './../../../../assets/icons/icon__profile-active.png';
import { imageUriResolver } from '../../../utils/image-uri-resolver';

const ICON_EXPLORE = imageUriResolver(ICON_EXPLORE_PNG);
const ICON_EXPLORE_ACTIVE = imageUriResolver(ICON_EXPLORE_ACTIVE_PNG);
const ICON_ADD = imageUriResolver(ICON_ADD_PNG);
const ICON_ADD_ACTIVE = imageUriResolver(ICON_ADD_ACTIVE_PNG);
const ICON_MATCH_APPS = imageUriResolver(ICON_MATCH_APPS_PNG);
const ICON_PROFILE = imageUriResolver(ICON_PROFILE_PNG);
const ICON_PROFILE_ACTIVE = imageUriResolver(ICON_PROFILE_ACTIVE_PNG);

const { Container, TabItem } = BottomTabBarComponents;

export function BottomTabBar({ state, descriptors, navigation }: any) {
    return (
        <Container style={{ flexDirection: 'row' }}>
            {state.routes.map((route: any, index: number) => {
                const { options } = descriptors[route.key];

                const isFocused = state.index === index;

                let icon;

                switch (options.title) {
                    case 'explore':
                        icon = isFocused ? (
                            <Image
                                source={{ uri: ICON_EXPLORE_ACTIVE }}
                                style={{
                                    width: 25,
                                    height: 25
                                }}
                            />
                        ) : (
                            <Image
                                source={{ uri: ICON_EXPLORE }}
                                style={{
                                    width: 25,
                                    height: 25
                                }}
                            />
                        );
                        break;
                    case 'createContent':
                        icon = isFocused ? (
                            <Image
                                source={{ uri: ICON_ADD_ACTIVE }}
                                style={{
                                    width: 24,
                                    height: 24
                                }}
                            />
                        ) : (
                            <Image
                                source={{ uri: ICON_ADD }}
                                style={{
                                    width: 24,
                                    height: 24
                                }}
                            />
                        );
                        break;
                    case 'matchOtherDevices':
                        icon = isFocused ? (
                            <Image
                                source={{ uri: ICON_MATCH_APPS }}
                                style={{
                                    width: 24.16,
                                    height: 25.5
                                }}
                            />
                        ) : (
                            <Image
                                source={{ uri: ICON_MATCH_APPS }}
                                style={{
                                    width: 24.16,
                                    height: 25.5
                                }}
                            />
                        );
                        break;
                    case 'profile':
                        icon = isFocused ? (
                            <Image
                                source={{ uri: ICON_PROFILE_ACTIVE }}
                                style={{
                                    width: 19.2,
                                    height: 24
                                }}
                            />
                        ) : (
                            <Image
                                source={{ uri: ICON_PROFILE }}
                                style={{
                                    width: 19.2,
                                    height: 24
                                }}
                            />
                        );
                        break;
                    default:
                        icon = <Image source={{ uri: ICON_MATCH_APPS }} />;

                        break;
                }

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key
                    });
                };

                if (options.title === 'plus') {
                    return (
                        <View
                            style={{
                                flex: 1,
                                width: 77,
                                height: 77,
                                padding: 10,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <TouchableOpacity
                                accessibilityRole="button"
                                accessibilityState={isFocused ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                style={{
                                    flex: 1,
                                    width: 67,
                                    height: 67,
                                    backgroundColor: 'rgba(89, 122, 255, 1)',
                                    borderRadius: 200
                                }}
                            >
                                {icon}
                            </TouchableOpacity>
                        </View>

                    );
                }
                else {
                    return (
                        <TabItem
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ flex: 1 }}
                            isActive={isFocused ? true : false}
                        >
                            {icon}
                        </TabItem>
                    );
                }


            })}
        </Container>
    );
}
