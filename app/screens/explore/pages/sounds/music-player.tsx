import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SoundsPageComponents } from './style';
import { Flex, PaddingContainer } from '../../../../styles/grid';
import {
    MUSIC_PLAYER_STOP_BUTTON_GRADIENT,
    TEXT_SWIPER_GRADIENT
} from '../../../../constaints/images';
import Slider from '@react-native-community/slider';
import { ICON_PLAY_SVG, ICON_NEXT_SVG, ICON_PREV_SVG } from '../../../../constaints/icons';

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

export function SoundsPageMusicPlayer() {
    return (
        <PaddingContainer>
            <MusicPlayerContainer>
                <MusicPlayerContainerGradient
                    source={{ uri: TEXT_SWIPER_GRADIENT }}
                />
                <MusicPlayerBox>
                    <MusicPlayerBoxTitle>
                        Explore limitless!
                    </MusicPlayerBoxTitle>
                    <MusicCoverSliderWrapper>
                        <PrevMusicCoverSlide
                            source={{ uri: prevTrack.cover }}
                            blurRadius={10}
                        />
                        <CurrentMusicCoverSlide
                            source={{ uri: currentTrack.cover }}
                        />
                        <NextMusicCoverSlide
                            source={{ uri: nextTrack.cover }}
                            blurRadius={10}
                        />
                    </MusicCoverSliderWrapper>
                    <View>
                        <CurrentTrackTitle>
                            The Jordan Harbinger Show
                        </CurrentTrackTitle>
                        <CurrentTrackSinger>
                            by Jordan Harbinger
                        </CurrentTrackSinger>
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
                            onSlidingComplete={() => {
                                console.log('');
                            }}
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
                        <TouchableOpacity>
                            {/* <Image
                                source={{ uri: ICON_MUSIC_PREV }}
                                style={styles.musicTrackNextPrevButton}
                            /> */}
                            <ICON_PREV_SVG
                                width={18}
                                height={18}
                            />
                        </TouchableOpacity>
                        <StartStopButton>
                            <StartStopButtonGradient
                                source={{
                                    uri: MUSIC_PLAYER_STOP_BUTTON_GRADIENT
                                }}
                            />
                            <ICON_PLAY_SVG
                                width={18}
                                height={18}
                                style={{
                                    position: 'absolute',
                                    zIndex: 10,
                                    left: 17,
                                    top: 14
                                }}
                            />

                        </StartStopButton>
                        <TouchableOpacity>
                            {/* <Image
                                source={{ uri: ICON_MUSIC_NEXT }}
                                style={styles.musicTrackNextPrevButton}
                            /> */}
                            <ICON_NEXT_SVG
                                width={18}
                                height={18}
                            />

                        </TouchableOpacity>
                    </Flex>
                </MusicPlayerBox>
            </MusicPlayerContainer>
        </PaddingContainer>
    );
}

const currentTrack = {
    cover: 'https://s3-alpha-sig.figma.com/img/e401/c423/757e755e8011e81ce932817331eb86c3?Expires=1685318400&Signature=JceHQKQYG3KP4yN-yYLaNOBFB-nvROsklfzTzUi37QyfeQzyiI29vGAIj3eWRo77W~yAGusOhPa-lSm3mshcMPN~JR6KtRV-PR7RhvsaQKKGZ5IUJs4xHqD4fsS01pVpgCIfkk690CyTNlNLNvUsLxn7lG3nQCPjMJ~SH11mifH9PMtL~YEFFemXao34cJbuKc1MLK3SWoJAko-uwVLXet6-7cUhPGjkGANKl5uqqFFlVHnTR3aVOpPxSKs0zxQKjrr4xaXAlI03S4rUvgLyzTtQ9FsXUri6tuflx8XVliGts0-rhFMprk242lL-Rx88mw25QQwcHNHJvYwiq9Pvwg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
};

const prevTrack = {
    cover: 'https://s3-alpha-sig.figma.com/img/feeb/0a83/0b906fc36e0f9cc0c75152fd7f547c9b?Expires=1685318400&Signature=me-uJGx7a3tLXWTYej5fCVMYQfhGgyix3IYFus8a7IKIYAaTYuGvNRvrqEy~2-lQ0UX9scQvgr7UlTL~ALrr7cEHjfd3Ox4gnjc0UWpdSNRfAPjBYiIQMBTP~FjJDOq2~9q1Fdvlz0HAIMpkipEjWk6GYlIhMU2GbBPNVZco~bTrXcLb0ZDMeAuYJRQ0UloL9fuaw2GuczGyjPZ-85N5TM49v7UUdz2tGBLXMPKFrkajeTqljtBZtUPy4D6CwoWY04i-kx1Dly9ZxULLubeNA1f~z75QTmIqyHeeQP-z71emIVU9NS0QHls2K03BmRpq5JnWA-se7sKAXMj1~ExEyw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
};

const nextTrack = {
    cover: 'https://s3-alpha-sig.figma.com/img/f6f7/c35f/e39e4e87bb73b9c7b7e5c97bbd326256?Expires=1685318400&Signature=Em5vzLXk317IfL3snotpekuDpH4GO224N3vqE6wvu7EHWJp2OmQ~Pn3i62MDnMZdFRClMV6ZkcLdEZhwQ7TmfMwMesDqYrWyH96LL0mRNDjCFWKS6qfcvCBHLkPMnuJn5avnN3--r4DVN03VwuPTxbdP3xpaRyhSwQXgq4X6EBQlecNFhueZVzr78RtRmI0PM-pBouqE808DtJNNgO9oAUxkAR0d-qg33uwUzVPgQoQCzUxZEDS0cNEhvQhR4lqDs3cQyDLdOyIeQJmCTKvQw~E0QBdHTcTPs7Q34HAgMKw37D1PPa3wKsLeY33jynK2KtWRWl3j40IBu7iy~bdBdA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
};

const styles = StyleSheet.create({
    progressSlider: {
        width: 184,
        height: 12
    },
    musicTrackNextPrevButton: {
        width: 18,
        height: 18
    }
});
