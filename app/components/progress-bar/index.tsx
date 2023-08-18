import { Animated, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import Constants from 'expo-constants';
import { Box } from '../box';
import { theme } from '../../constaints/theme';

export function ProgressBar() {
    const counter = useRef(new Animated.Value(0)).current;
    const countInterval = useRef<ReturnType<typeof setInterval>>(null);
    const [count, setCount] = useState(0);
    // EFFECT HOOK TO SETUP AND CLEAN INTERvAL COUNTER
    useEffect(() => {
        // SETUP INTERVAL COUNTER TO REFERENCED HOOK
        countInterval.current = setInterval(() => setCount((prev) => prev + 10), 150);
        return () => {
            // CLEAR ON EXIT
            clearInterval(countInterval);
        };
    }, []);
    // EFFECT HOOK TO TRACK CHANGES IN PROGRESS
    useEffect(() => {
        // TRIGGER VIEW UPDATE
        load(count)
        if (count >= 100) {
            setCount(100);
            // CLEAR
            clearInterval(countInterval);
        }
    }, [count]);
    // FUNCTION TO ANIMATE VIEW
    const load = (value) => {
        // UPDATE ANIMATABLE VIEW
        Animated.timing(counter, {
            toValue: value,
            duration: 100,
            useNativeDriver: false,
        }).start();
    };
    const width = counter.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"],
        extrapolate: "clamp"
    })
    return (
        <Box
            width='100%'
            position='absolute'
            top={0}
        >
            <View style={styles.progressBar}>
                <Animated.View style={{ backgroundColor: theme.color.light.PRIMARY, width: width }} />
            </View>
        </Box>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        padding: 8,
    },
    text1: {
        fontSize: 34
    },
    text2: {
        fontSize: 22,
        margin: 5
    },
    text3: {
        fontSize: 18
    },
    progressBar: {
        width: '100%',
        height: 3,
        borderWidth: 0,
        flexDirection: "row"
    }
});
