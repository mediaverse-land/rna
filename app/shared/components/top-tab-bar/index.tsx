import { memo } from 'react';
import { Image } from 'react-native';
import { TabBarComponents } from './style';

function TopTabBar({ state, descriptors, navigation, position }: any) {
    return (
        <TabBarComponents.TabBar style={{ flexDirection: 'row' }}>
            {state.routes.map((route: any, index: any) => {
                const { options } = descriptors[route.key];

                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                let icon;

                switch (options.title) {
                    case 'video':
                        icon = isFocused ? (
                            <Image
                                source={require('./../../../../assets/icons/icon__video-active.png')}
                            />
                        ) : (
                            <Image
                                source={require('./../../../../assets/icons/icon__video.png')}
                            />
                        );
                        break;
                    case 'image':
                        icon = isFocused ? (
                            <Image
                                source={require('./../../../../assets/icons/icon__img-active.png')}
                            />
                        ) : (
                            <Image
                                source={require('./../../../../assets/icons/icon__img.png')}
                            />
                        );
                        break;
                    case 'sound':
                        icon = isFocused ? (
                            <Image
                                source={require('./../../../../assets/icons/icon__sound-active.png')}
                            />
                        ) : (
                            <Image
                                source={require('./../../../../assets/icons/icon__sound.png')}
                            />
                        );
                        break;
                    case 'text':
                        icon = isFocused ? (
                            <Image
                                source={require('./../../../../assets/icons/icon__text-active.png')}
                            />
                        ) : (
                            <Image
                                source={require('./../../../../assets/icons/icon__text.png')}
                            />
                        );
                        break;
                    default:
                        icon = isFocused ? (
                            <Image
                                source={require('./../../../../assets/icons/icon__img-active.png')}
                            />
                        ) : (
                            <Image
                                source={require('./../../../../assets/icons/icon__img.png')}
                            />
                        );
                        break;
                }

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key
                    });
                };

                return (
                    <TabBarComponents.Container
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        key={index}
                        style={{ flex: 1 }}
                    >
                        <TabBarComponents.Wrapper>
                            {icon}
                            {isFocused ? (
                                <>
                                    <TabBarComponents.Label>
                                        {label}
                                    </TabBarComponents.Label>
                                </>
                            ) : null}
                        </TabBarComponents.Wrapper>
                        {isFocused ? (
                            <TabBarComponents.SpacerBorder></TabBarComponents.SpacerBorder>
                        ) : null}
                    </TabBarComponents.Container>
                );
            })}
        </TabBarComponents.TabBar>
    );
}

export default memo(TopTabBar);
