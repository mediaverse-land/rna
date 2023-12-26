import React, { useState, useEffect, memo } from 'react';
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Flex, PaddingContainer } from '../../../../styles/grid';
import { Box } from '../../../../components/box';
import { MUSIC_PLAYER_STOP_BUTTON_GRADIENT } from '../../../../constaints/images';
import { ICON_PLAY_SVG, ICON_VIDEO_PAUSE } from '../../../../constaints/icons';
import { formatTime } from '../../../../utils/format-time';
import { useIsFocused } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { Text } from '../../../../components/text';
import { theme } from '../../../../constaints/theme';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store';
import { setAudioDurationMillis } from '../../../../slices/single-asset.slice';

const MusicPlayer = ({ fileUri }: { fileUri: string }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  const dispatch = useDispatch<AppDispatch>();

  const isFocused = useIsFocused();

  useEffect(() => {
    // Load the audio file
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync({ uri: fileUri });
      setSound(sound);

      // Get the duration of the audio file
      const { durationMillis }: any = await sound.getStatusAsync();
      setDuration(durationMillis);
      dispatch(setAudioDurationMillis(durationMillis));
    };
    if (!sound) {
      loadSound();
    }

    // Clean up resources when component unmounts
    return () => {
      sound?.unloadAsync();
      setSound(null);
      setIsPlaying(false);
    };
  }, []);

  useEffect(() => {
    if (!isFocused) {
      sound?.unloadAsync();
      setSound(null);
      setIsPlaying(false);
    }
  }, [isFocused]);

  const handlePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderChange = async (value: any) => {
    if (sound) {
      await sound.setPositionAsync(value);
      setPosition(value);
    }
  };

  const handleAudioUpdate = async () => {
    if (sound && isPlaying) {
      const { positionMillis } = await sound.getStatusAsync();
      setPosition(positionMillis);
    }
    setTimeout(handleAudioUpdate, 1000);
  };

  useEffect(() => {
    handleAudioUpdate();
  }, [isPlaying]);

  const formattedPosition = formatTime(position / 1000);

  return (
    <Box width="100%" height={120}>
      {!sound ? (
        <Box width="100%" height="100%" alignItems="center" justifyContent="center">
          <ActivityIndicator />
        </Box>
      ) : (
        <PaddingContainer>
          <Box width="100%" height={130}>
            <Box
              position="absolute"
              top={0}
              zIndex={1}
              width="100%"
              height={504}
              flex={1}
              paddingTop={40}
              alignItems="center"
              borderRadius={16}
              additionalStyles={{
                overflow: 'hidden',
              }}
            >
              <Flex
                direction="row"
                width="100%"
                height="12px"
                align="center"
                justify="space-between"
              >
                <Slider
                  minimumValue={0}
                  maximumValue={duration}
                  value={position}
                  onSlidingComplete={handleSliderChange}
                  thumbTintColor="#fff"
                  maximumTrackTintColor="#eee"
                  minimumTrackTintColor="#ccc"
                  style={styles.progressSlider}
                />
                <Box>
                  <Box width={50} height={12}>
                    <Text fontSize={12} marginLeft={15} color={theme.color.light.TEXT}>
                      {formattedPosition?.minute}:{formattedPosition?.second}
                    </Text>
                  </Box>
                </Box>
              </Flex>
              <Box
                direction="row"
                alignItems="center"
                justifyContent="center"
                width="100%"
                height={48}
                marginTop={8}
              >
                <TouchableOpacity
                  style={{
                    width: 48,
                    height: 48,
                  }}
                  onPress={handlePlayPause}
                  activeOpacity={1}
                >
                  <Image
                    source={{
                      uri: MUSIC_PLAYER_STOP_BUTTON_GRADIENT,
                    }}
                    style={{
                      position: 'absolute',
                      width: 100,
                      height: 100,
                      top: -19,
                      right: -27,
                      zIndex: 1,
                    }}
                  />
                  {isPlaying ? (
                    <ICON_VIDEO_PAUSE
                      width={18}
                      height={18}
                      style={{
                        position: 'absolute',
                        zIndex: 10,
                        left: 17,
                        top: 14,
                      }}
                    />
                  ) : (
                    <ICON_PLAY_SVG
                      width={18}
                      height={18}
                      style={{
                        position: 'absolute',
                        zIndex: 10,
                        left: 17,
                        top: 14,
                      }}
                    />
                  )}
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
        </PaddingContainer>
      )}
    </Box>
  );
};

export default MusicPlayer;

const styles = StyleSheet.create({
  progressSlider: {
    flex: 1,
    // width: '100%',
    height: 12,
  },
  musicTrackNextPrevButton: {
    width: 18,
    height: 18,
  },
});
