import { ReactElement } from 'react';
import { ImageStyle } from 'react-native';
import { Box } from '../box';
import { TabBarComponents } from './style';
import {
    ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG,
    ICON_TOP_TABBAR_IMAGE_SVG,
    ICON_TOP_TABBAR_SOUND_ACTIVE_SVG,
    ICON_TOP_TABBAR_SOUND_SVG,
    ICON_TOP_TABBAR_TEXT_ACTIVE_SVG,
    ICON_TOP_TABBAR_TEXT_SVG,
    ICON_TOP_TABBAR_VIDEO_ACTIVE_SVG,
    ICON_TOP_TABBAR_VIDEO_SVG
} from '../../../constaints/icons';
import { theme } from '../../../constaints/theme';

function getTobBarItemsIcon(tobBarItemName: string, isFocused: boolean) {
    let iconPath: ReactElement<SVGElement>;
    let iconStyle: ImageStyle;

    switch (tobBarItemName) {
        case 'video':
            iconPath = isFocused ? (
                <ICON_TOP_TABBAR_VIDEO_ACTIVE_SVG width={19.76} height={16} />
            ) : (
                <ICON_TOP_TABBAR_VIDEO_SVG width={19.76} height={16} />
            );
            break;
        case 'image':
            iconPath = isFocused ? (
                <ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG width={19.76} height={16} />
            ) : (
                <ICON_TOP_TABBAR_IMAGE_SVG width={19.76} height={16} />
            );
            break;
        case 'sound':
            iconPath = isFocused ? (
                <ICON_TOP_TABBAR_SOUND_ACTIVE_SVG width={19.76} height={16} />
            ) : (
                <ICON_TOP_TABBAR_SOUND_SVG width={19.76} height={16} />
            );
            break;
        case 'text':
            iconPath = isFocused ? (
                <ICON_TOP_TABBAR_TEXT_ACTIVE_SVG width={19.76} height={16} />
            ) : (
                <ICON_TOP_TABBAR_TEXT_SVG width={19.76} height={16} />
            );
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
    hasFullWidth = false,
    isProfilePage = false
}: any) {
    const topStyle = isProfilePage ? 8 : hasFullWidth ? 120 : 104;

    return (
        <Box
            paddingLeft={hasFullWidth ? 0 : 24}
            paddingRight={hasFullWidth ? 0 : 24}
            position="absolute"
            top={topStyle}
            zIndex={100}
            width="100%"
            backgroundColor="transparent"
        >
            <TabBarComponents.TabBar
                style={{
                    flexDirection: 'row',
                    borderRadius: hasFullWidth ? 0 : 16
                }}
            >
                {state.routes.map(
                    (
                        route: ReturnType<(typeof state.routes)[0]>,
                        index: number
                    ) => {
                        const { options } = descriptors[route.key];

                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.name;

                        const isFocused = state.index === index;

                        const { iconPath } = getTobBarItemsIcon(
                            options.title,
                            isFocused
                        );

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
                                    {iconPath ? iconPath : null}
                                    {label === 'All' ? (
                                        <TabBarComponents.Label
                                            style={{
                                                color: isFocused
                                                    ? theme.color.light.WHITE
                                                    : theme.color.light.TEXT
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
                    }
                )}
            </TabBarComponents.TabBar>
        </Box>
    );
}

export default TopTabBar;
