import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { Flex, PaddingContainer } from "../../../styles/grid";
import { Box } from "../../../components/box";
import { SoundsPageComponents } from "../../explore/pages/sounds/style";
import {
  COMMENT_BOX_GRADIENT,
  MUSIC_PLAYER_STOP_BUTTON_GRADIENT,
  TEXT_SWIPER_GRADIENT,
} from "../../../constaints/images";
import { ICON_PLAY_SVG, ICON_VIDEO_PAUSE } from "../../../constaints/icons";
import { formatTime } from "../../../utils/format-time";
import {useIsFocused} from '@react-navigation/native'

const {
  MusicPlayerContainer,
  MusicPlayerBox,
  MusicPlayerBoxTitle,
  MusicPlayerContainerGradient,
  MusicCoverSliderWrapper,
  CurrentMusicCoverSlide,
  PrevMusicCoverSlide,
  NextMusicCoverSlide,
  CurrentTrackTitle,
  CurrentTrackSinger,
  CurrentSliderTime,
  StartStopButton,
  StartStopButtonGradient,
} = SoundsPageComponents;

const MusicPlayer = ({ url }: any) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  const isFocused = useIsFocused();

  useEffect(() => {
    // Load the audio file
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync({ uri: url });
      setSound(sound);

      // Get the duration of the audio file
      const { durationMillis }: any = await sound.getStatusAsync();
      setDuration(durationMillis);
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
    if(!isFocused){
        sound?.unloadAsync();
        setSound(null);
        setIsPlaying(false);
    }
  }, [isFocused])

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

  if (!sound) {
    return null; // You can render a loading indicator here if needed
  }

  const formattedPosition = formatTime(position / 1000);

  return (
    <Box>
      <PaddingContainer>
        <MusicPlayerContainer
          style={{
            width: "100%",
            height: 130,
          }}
        >
          <MusicPlayerContainerGradient
            source={{ uri: COMMENT_BOX_GRADIENT }}
            style={{
              width: "100%",
              height: 130,
            }}
          />
          <MusicPlayerBox>
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
              <Box >
                <CurrentSliderTime>
                  {formattedPosition?.minute } :
                  {formattedPosition?.second }
                </CurrentSliderTime>
              </Box>
            </Flex>
            <Flex
              direction="row"
              align="center"
              justify="center"
              width="100%"
              height="48px"
              marginTop="14px"
            >
              <StartStopButton onPress={handlePlayPause} activeOpacity={1}>
                <StartStopButtonGradient
                  source={{
                    uri: MUSIC_PLAYER_STOP_BUTTON_GRADIENT,
                  }}
                />
                {isPlaying ? (
                  <ICON_VIDEO_PAUSE
                    width={18}
                    height={18}
                    style={{
                      position: "absolute",
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
                      position: "absolute",
                      zIndex: 10,
                      left: 17,
                      top: 14,
                    }}
                  />
                )}
              </StartStopButton>
            </Flex>
          </MusicPlayerBox>
        </MusicPlayerContainer>
      </PaddingContainer>
      {/* <PaddingContainer>
        <View>
          <Slider
            minimumValue={0}
            maximumValue={duration}
            value={position}
            onSlidingComplete={handleSliderChange}
            thumbTintColor="#fff"
            maximumTrackTintColor="#eee"
            minimumTrackTintColor="#ccc"    
          />
          <Button
            title={isPlaying ? "Pause" : "Play"}
            onPress={handlePlayPause}
          />
        </View>
      </PaddingContainer> */}
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
