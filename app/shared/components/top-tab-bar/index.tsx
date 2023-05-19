import { memo, useEffect, useState } from 'react';
import { ImageStyle, View } from 'react-native';
import { TabBarComponents } from './style';
import { ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG, ICON_TOP_TABBAR_IMAGE_SVG, ICON_TOP_TABBAR_SOUND_ACTIVE_SVG, ICON_TOP_TABBAR_SOUND_SVG, ICON_TOP_TABBAR_TEXT_ACTIVE_SVG, ICON_TOP_TABBAR_TEXT_SVG, ICON_TOP_TABBAR_VIDEO_ACTIVE_SVG, ICON_TOP_TABBAR_VIDEO_SVG } from '../../../constaints/icons';

function getTobBarItemsIcon(tobBarItemName: string, isFocused: boolean) {
    let iconPath: any;
    let iconStyle: ImageStyle;

    switch (tobBarItemName) {
        case 'video':
            iconPath = isFocused
                ? <ICON_TOP_TABBAR_VIDEO_ACTIVE_SVG width={19.76} height={16} />
                : <ICON_TOP_TABBAR_VIDEO_SVG width={19.76} height={16} />
            break;
        case 'image':
            iconPath = isFocused
                ? <ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG width={19.76} height={16} />
                : <ICON_TOP_TABBAR_IMAGE_SVG width={19.76} height={16} />
            break;
        case 'sound':
            iconPath = isFocused
                ? <ICON_TOP_TABBAR_SOUND_ACTIVE_SVG width={19.76} height={16} />
                : <ICON_TOP_TABBAR_SOUND_SVG width={19.76} height={16} />
            break;
        case 'text':
            iconPath = isFocused
                ? <ICON_TOP_TABBAR_TEXT_ACTIVE_SVG width={19.76} height={16} />
                : <ICON_TOP_TABBAR_TEXT_SVG width={19.76} height={16} />
            break;
        default:
            break;
    }

    return { iconPath, iconStyle };
}

function TopTabBar({
    state,
    descriptors,
    navigation,
    hasFullWidth = false
}: any) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    return (
        <>
            {isLoaded ?
                <View
                    style={{
                        paddingLeft: hasFullWidth ? 0 : 24,
                        paddingRight: hasFullWidth ? 0 : 24,
                        position: 'absolute',
                        top: hasFullWidth ? 120 : 104,
                        zIndex: 100,
                        width: '100%'
                    }}
                >
                    <TabBarComponents.TabBar
                        style={{
                            flexDirection: 'row',
                            borderRadius: hasFullWidth ? 0 : 16
                        }}
                    >
                        {state.routes.map((route: any, index: number) => {
                            const { options } = descriptors[route.key];

                            const label =
                                options.tabBarLabel !== undefined
                                    ? options.tabBarLabel
                                    : options.title !== undefined
                                        ? options.title
                                        : route.name;

                            const isFocused = state.index === index;

                            const {
                                iconPath,
                            }: { iconPath: string; iconStyle: ImageStyle } =
                                getTobBarItemsIcon(options.title, isFocused);

                            const onPress = () => {
                                const event = navigation.emit({
                                    type: 'tabPress',
                                    target: route.key,
                                    canPreventDefault: true
                                });

                                if (!isFocused && !event.defaultPrevented) {
                                    navigation.navigate({
                                        name: route.name,
                                        merge: true
                                    });
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
                                    accessibilityState={
                                        isFocused ? { selected: true } : {}
                                    }
                                    accessibilityLabel={
                                        options.tabBarAccessibilityLabel
                                    }
                                    testID={options.tabBarTestID}
                                    onPress={onPress}
                                    onLongPress={onLongPress}
                                    key={index}
                                    style={{ flex: 1 }}
                                >
                                    <TabBarComponents.Wrapper>
                                        {iconPath ?
                                            iconPath
                                            : null}
                                        {label === 'All' ? (
                                            <TabBarComponents.Label
                                                style={{
                                                    color: isFocused
                                                        ? '#fff'
                                                        : '#666680'
                                                }}
                                            >
                                                {label}
                                            </TabBarComponents.Label>
                                        ) : null}
                                    </TabBarComponents.Wrapper>
                                    {isFocused ? (
                                        <TabBarComponents.SpacerBorder />
                                    ) : null}
                                </TabBarComponents.Container>
                            );
                        })}
                    </TabBarComponents.TabBar>
                </View>
                : null}
        </>
    );
}

export default TopTabBar
