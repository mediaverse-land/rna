import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SoundsPageComponents } from './style';
import { Flex, PaddingContainer } from '../../../../styles/grid';
import {
  AUDIO_THUMBNAIL_PLACEHOLDER,
  MUSIC_PLAYER_STOP_BUTTON_GRADIENT,
  TEXT_SWIPER_GRADIENT,
} from '../../../../constaints/images';
import Slider from '@react-native-community/slider';
import { ICON_PLAY_SVG, ICON_NEXT_SVG, ICON_PREV_SVG } from '../../../../constaints/icons';
import { Sound } from '../../../../types/sound';

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

type Props = {
  data: Sound[] | any;
};

export function SoundsPageMusicPlayer({ data }: Props) {
  if (data.length === 0) {
    return null;
  }

  const [currentSlide, setCurrentSlide] = useState<Sound | any>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(1);

  useEffect(() => {
    setCurrentSlide(data[currentSlideIndex]);
  }, [currentSlideIndex]);

  const nextSlideHandler = () => {
    if (currentSlideIndex === data.length - 1) {
      return;
    }

    setCurrentSlideIndex((slide) => slide + 1);
  };

  const prevSlideHandler = () => {
    if (currentSlideIndex === 0) {
      return;
    }
    setCurrentSlideIndex((slide) => slide - 1);
  };

  const currentSlideThumbnail = {
    thumbnail:
      currentSlide?.asset?.thumbnail?.thumbnails?.['852x480'] || AUDIO_THUMBNAIL_PLACEHOLDER,
    title: currentSlide?.name || '',
  };
  const prevSlideThumbnail =
    data[currentSlideIndex - 1]?.asset?.thumbnail?.thumbnails?.['852x480'] ||
    AUDIO_THUMBNAIL_PLACEHOLDER;
  const nextSlideThumbnail =
    data[currentSlideIndex + 1]?.asset?.thumbnail?.thumbnails?.['852x480'] ||
    AUDIO_THUMBNAIL_PLACEHOLDER;

  return (
    <PaddingContainer>
      <MusicPlayerContainer>
        <MusicPlayerContainerGradient source={{ uri: TEXT_SWIPER_GRADIENT }} />
        <MusicPlayerBox>
          <MusicPlayerBoxTitle>Explore limitless!</MusicPlayerBoxTitle>
          <MusicCoverSliderWrapper>
            <PrevMusicCoverSlide source={{ uri: prevSlideThumbnail }} blurRadius={10} />
            <CurrentMusicCoverSlide source={{ uri: currentSlideThumbnail.thumbnail }} />
            <NextMusicCoverSlide source={{ uri: nextSlideThumbnail }} blurRadius={10} />
          </MusicCoverSliderWrapper>
          <View>
            <CurrentTrackTitle>{currentSlideThumbnail.title}</CurrentTrackTitle>
            <CurrentTrackSinger>by Jordan Harbinger</CurrentTrackSinger>
          </View>
          <Flex
            direction="row"
            width="230px"
            height="12px"
            align="center"
            justify="space-between"
            marginTop="14px"
          >
            <Slider
              style={styles.progressSlider}
              value={10}
              minimumValue={0}
              maximumValue={100}
              thumbTintColor="#0E0E12"
              minimumTrackTintColor="#0E0E12"
              maximumTrackTintColor="#0E0E12"
              // onSlidingComplete={() => {
              //   console.log("");
              // }}
            />
            <CurrentSliderTime>20:15</CurrentSliderTime>
          </Flex>
          <Flex
            direction="row"
            align="center"
            justify="space-between"
            width="180px"
            height="48px"
            marginTop="28px"
          >
            <TouchableOpacity onPress={prevSlideHandler} activeOpacity={1}>
              <ICON_PREV_SVG width={18} height={18} />
            </TouchableOpacity>
            <StartStopButton>
              <StartStopButtonGradient
                source={{
                  uri: MUSIC_PLAYER_STOP_BUTTON_GRADIENT,
                }}
              />
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
            </StartStopButton>
            <TouchableOpacity onPress={nextSlideHandler} activeOpacity={1}>
              <ICON_NEXT_SVG width={18} height={18} />
            </TouchableOpacity>
          </Flex>
        </MusicPlayerBox>
      </MusicPlayerContainer>
    </PaddingContainer>
  );
}

const styles = StyleSheet.create({
  progressSlider: {
    width: 184,
    height: 12,
  },
  musicTrackNextPrevButton: {
    width: 18,
    height: 18,
  },
});
