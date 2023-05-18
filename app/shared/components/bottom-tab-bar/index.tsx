import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import {
    ICON_BOTTOM_TABBAR_ACTIVE_APPS,
    ICON_BOTTOM_TABBAR_ACTIVE_EXPLORE,
    ICON_BOTTOM_TABBAR_ACTIVE_PROFILE,
    ICON_BOTTOM_TABBAR_ACTIVE_WALLET,
    ICON_BOTTOM_TABBAR_APPS,
    ICON_BOTTOM_TABBAR_EXPLORE,
    ICON_BOTTOM_TABBAR_PLUS,
    ICON_BOTTOM_TABBAR_PROFILE,
    ICON_BOTTOM_TABBAR_WALLET
} from '../../../constaints/icons';

const icons: any = {
    explore: {
        path: ICON_BOTTOM_TABBAR_EXPLORE,
        activePath: ICON_BOTTOM_TABBAR_ACTIVE_EXPLORE,
        styles: {
            width: 20,
            height: 20,
            marginTop: 10
        }
    },
    apps: {
        path: ICON_BOTTOM_TABBAR_APPS,
        activePath: ICON_BOTTOM_TABBAR_ACTIVE_APPS,
        styles: {
            width: 20,
            height: 20,
            marginTop: 10
        }
    },
    wallet: {
        path: ICON_BOTTOM_TABBAR_WALLET,
        activePath: ICON_BOTTOM_TABBAR_ACTIVE_WALLET,
        styles: {
            width: 20,
            height: 16,
            marginTop: 10
        }
    },
    profile: {
        path: ICON_BOTTOM_TABBAR_PROFILE,
        activePath: ICON_BOTTOM_TABBAR_ACTIVE_PROFILE,
        styles: {
            width: 16,
            height: 20,
            marginTop: 10
        }
    }
};

const states = {
    pathX: '357',
    pathY: '675',
    pathA: '689',
    pathB: '706'
};

export function BottomTabBar({ state, descriptors, navigation }: any) {
    const tabBarItemClickNavigateHandler = (screenName: string) => {
        navigation?.navigate(screenName);
    };

    return (
        <View style={[styles.container]}>
            <View style={[styles.content]}>
                <TouchableOpacity style={styles.plusButton}>
                    <Image
                        source={{ uri: ICON_BOTTOM_TABBAR_PLUS }}
                        style={{
                            width: 20,
                            height: 20
                        }}
                    />
                </TouchableOpacity>
                <View style={styles.subContent}>
                    {state.routes.map((route: any, i: number) => {
                        const isFocused = state.index === i;
                        const icon = icons[route.name.toLowerCase()];

                        const currentIcon = isFocused
                            ? icon?.activePath
                            : icon?.path;
                        const currentIconStyles = icon?.styles;

                        return (
                            <TouchableOpacity
                                key={i}
                                onPress={() =>
                                    tabBarItemClickNavigateHandler(route.name)
                                }
                                style={[
                                    {
                                        height: 64,
                                        borderWidth: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderColor: 'transparent'
                                    },
                                    i === 0 && {
                                        width: '17.5%'
                                    },
                                    i === 1 && {
                                        width: '17.5%'
                                    },
                                    i === 2 && {
                                        width: '30%'
                                    },
                                    i === 3 && {
                                        width: '17.5%'
                                    },
                                    i === 4 && {
                                        width: '17.5%'
                                    }
                                ]}
                            >
                                {currentIcon ? (
                                    <Image
                                        source={{ uri: currentIcon }}
                                        style={currentIconStyles}
                                    />
                                ) : null}
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <Svg
                    id="bottom-bar"
                    x="0px"
                    y="0px"
                    width="100%"
                    height="100"
                    viewBox="0 0 1092 260"
                >
                    <Path
                        fill={'#4e4e61d8'}
                        stroke={'#4e4e61d8'}
                        d={`M30,60h${states.pathX}.3c17.2,0,31,14.4,30,31.6c-0.2,2.7-0.3,5.5-0.3,8.2c0,71.2,58.1,129.6,129.4,130c72.1,0.3,130.6-58,130.6-130c0-2.7-0.1-5.4-0.2-8.1C${states.pathY}.7,74.5,${states.pathA}.5,60,${states.pathB}.7,60H1062c16.6,0,30,13.4,30,30v94c0,42-34,76-76,76H76c-42,0-76-34-76-76V90C0,73.4,13.4,60,30,60z`}
                    />
                    <Circle
                        fill={'#597AFF'}
                        stroke={'#597AFF'}
                        cx="546"
                        cy="100"
                        r="100"
                    />
                </Svg>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    content: {
        flexDirection: 'column',
        zIndex: 0,
        width: Dimensions.get('window').width - 30,
        marginBottom: '4%',
        left: '4%',
        right: '4%',
        position: 'absolute',
        bottom: '1%'
    },
    subContent: {
        flexDirection: 'row',
        marginBottom: 10,
        zIndex: 1,
        position: 'absolute',
        bottom: 5,
        justifyContent: 'space-between'
    },
    plusButton: {
        width: 56,
        height: 56,
        borderRadius: 100,
        position: 'absolute',
        top: 12,
        zIndex: 10,
        left: '42.3%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
