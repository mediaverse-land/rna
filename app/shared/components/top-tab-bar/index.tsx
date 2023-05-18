import { memo } from 'react';
import { Image, ImageStyle, View } from 'react-native';
import { TabBarComponents } from './style';
import {
    ICON_TOP_TABBAR_IMAGE,
    ICON_TOP_TABBAR_IMAGE_ACTIVE,
    ICON_TOP_TABBAR_SOUND,
    ICON_TOP_TABBAR_SOUND_ACTIVE,
    ICON_TOP_TABBAR_TEXT,
    ICON_TOP_TABBAR_TEXT_ACTIVE,
    ICON_TOP_TABBAR_VIDEO,
    ICON_TOP_TABBAR_VIDEO_ACTIVE
} from '../../../constaints/icons';

function getTobBarItemsIcon(tobBarItemName: string, isFocused: boolean) {
    let iconPath: string;
    let iconStyle: ImageStyle;

    switch (tobBarItemName) {
        case 'video':
            iconPath = isFocused ?
                ICON_TOP_TABBAR_VIDEO_ACTIVE
                :
                ICON_TOP_TABBAR_VIDEO
                ;
            iconStyle = {
                width: 19.76,
                height: 16
            }
            break;
        case 'image':
            iconPath = isFocused ?
                ICON_TOP_TABBAR_IMAGE_ACTIVE
                :
                ICON_TOP_TABBAR_IMAGE
                ;
            iconStyle = {
                width: 16,
                height: 16
            }
            break;
        case 'sound':
            iconPath = isFocused ?
                ICON_TOP_TABBAR_SOUND_ACTIVE
                :
                ICON_TOP_TABBAR_SOUND
                ;
            iconStyle = {
                width: 16,
                height: 14.39
            }
            break;
        case 'text':
            iconPath = isFocused ?
                ICON_TOP_TABBAR_TEXT_ACTIVE
                :
                ICON_TOP_TABBAR_TEXT
                ;
            iconStyle = {
                width: 16,
                height: 16
            }
            break;
        default:
            break;
    }

    return { iconPath, iconStyle }
}

function TopTabBar({ state, descriptors, navigation }: any) {
    return (
        <View style={{
            paddingLeft: 24,
            paddingRight: 24,
            position: 'absolute',
            top: 104,
            zIndex: 100,
            width: '100%'
        }}>
            {/* <TabBarComponents.TopBarBackground
                source={{ uri: BANNER_VLOG_IMAGE }}
                blurRadius={70}
            /> */}
            <TabBarComponents.TabBar style={{ flexDirection: 'row' }}>
                {state.routes.map((route: any, index: number) => {
                    const { options } = descriptors[route.key];

                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const { iconPath, iconStyle }: { iconPath: string, iconStyle: ImageStyle }
                        = getTobBarItemsIcon(options.title, isFocused)

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
                                {iconPath ?
                                    <Image
                                        source={{ uri: iconPath }}
                                        style={iconStyle}
                                    /> : null}
                                {label === 'All' ?
                                    <TabBarComponents.Label
                                        style={{
                                            color: isFocused ? '#fff' : '#666680'
                                        }}
                                    >{label}</TabBarComponents.Label>
                                    : null}
                            </TabBarComponents.Wrapper>
                            {isFocused ? (
                                <TabBarComponents.SpacerBorder />
                            ) : null}
                        </TabBarComponents.Container>
                    );
                })}
            </TabBarComponents.TabBar>
        </View>
    );
}

export default memo(TopTabBar);
