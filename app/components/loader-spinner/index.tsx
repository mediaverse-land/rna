import React, { useEffect, useRef } from 'react';
import { StyleSheet, ColorValue, Image, Animated, Easing } from 'react-native';
import { Box } from '../box';
import { LOADER, LOADER_SPINNER } from '../../constaints/images';
import { windowSize } from '../../utils/window-size';

interface Props {
    color?: ColorValue;
    durationMs?: number;
    testID?: string;
}

const startRotationAnimation = (
    durationMs: number,
    rotationDegree: Animated.Value
): void => {
    Animated.loop(
        Animated.timing(rotationDegree, {
            toValue: 360,
            duration: durationMs,
            easing: Easing.linear,
            useNativeDriver: true
        })
    ).start();
};

const { height: windowHeight } = windowSize();

export const FullScreenSpinnerLoader = () => {
    return (
        <Box
            width="100%"
            height={Math.floor(windowHeight) - 200}
            alignItems="center"
            justifyContent="center"
        >
            <LoadingSpinner color="red" />
        </Box>
    );
};

export const LoadingSpinner = ({
    durationMs = 1000,
    testID
}: Props): JSX.Element => {
    const rotationDegree = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        startRotationAnimation(durationMs, rotationDegree);
    }, [durationMs, rotationDegree]);

    return (
        <Box
            width="100%"
            direction="row"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                width={38}
                height={38}
                alignItems="center"
                justifyContent="center"
            >
                <Animated.View
                    testID={testID}
                    style={[
                        styles.container,
                        {
                            transform: [
                                {
                                    rotateZ: rotationDegree.interpolate({
                                        inputRange: [0, 360],
                                        outputRange: ['0deg', '360deg']
                                    })
                                }
                            ]
                        }
                    ]}
                    accessibilityRole="progressbar"
                >
                    <Image
                        source={{
                            uri: LOADER
                        }}
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                    <Image
                        source={{
                            uri: LOADER_SPINNER
                        }}
                        style={{
                            width: 18,
                            height: 18,
                            position: 'relative',
                            top: -19,
                            left: 7
                        }}
                    />
                </Animated.View>
            </Box>
        </Box>
    );
};

const height = 24;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        paddingTop: 15,
        left: 0
    },
    background: {
        width: '100%',
        height: '100%',
        borderRadius: height / 2,
        borderWidth: 4,
        opacity: 0.25
    },
    progress: {
        width: 30,
        height: 30,
        position: 'absolute'
    }
});
