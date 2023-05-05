import { useState, useEffect } from 'react';
import { View, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import Slider from '@react-native-community/slider';
import { Center, Flex, PaddingContainer } from '../../styles/grid';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { imageUriResolver } from '../../utils/image-uri-resolver';
import { SingleSoundComponents } from './style';
import { theme } from '../../constaints/theme';
import PLAYER_BAR_PNG from './../../../assets/icons/icon__music-play-bar.png';
import START_PLAY_MUSIC_PNG from './../../../assets/icons/icon__start-play-music.png';

const PLAYER_BAR = imageUriResolver(PLAYER_BAR_PNG);
const START_PLAY_MUSIC = imageUriResolver(START_PLAY_MUSIC_PNG);

export function SingleSoundPagePlayer() {
    function playHandler() {
        console.log('playHandler');
    }

    return (
        <View>
            {/* <PlaylistItem
                index={index}
                title={item.title}
                isCurrent={currentTrack == index} /> */}
            <PaddingContainer>
                <SingleSoundComponents.PlayerBar>
                    <Center>
                        <Image
                            source={{ uri: PLAYER_BAR }}
                            style={SingleSoundComponents.PlayerBarImage}
                        />
                    </Center>
                </SingleSoundComponents.PlayerBar>

                <SingleSoundComponents.PlayerCard>
                    <View style={{ width: '100%' }}>
                        <View style={{ width: '100%' }}>
                            <Slider
                                style={{ width: '100%', height: 5 }}
                                minimumValue={0}
                                maximumValue={1}
                                minimumTrackTintColor={
                                    theme.color.light.NAV_ICON_COLOR
                                }
                                maximumTrackTintColor={theme.color.light.GRAY}
                                thumbTintColor={
                                    theme.color.light.NAV_ICON_COLOR
                                }
                            />
                        </View>
                        <Flex
                            height="20"
                            direction="row"
                            align="center"
                            justify="space-between"
                            style={SingleSoundComponents.MusicTimes}
                        >
                            <SingleSoundComponents.TimeText>
                                00:00
                            </SingleSoundComponents.TimeText>
                            <SingleSoundComponents.TimeText>
                                01:23
                            </SingleSoundComponents.TimeText>
                        </Flex>
                    </View>
                    <SingleSoundComponents.PlayMusicIconWrapper>
                        <TouchableOpacity onPress={playHandler}>
                            <Image
                                source={{ uri: START_PLAY_MUSIC }}
                                style={SingleSoundComponents.PlayMusicIcon}
                            />
                        </TouchableOpacity>
                    </SingleSoundComponents.PlayMusicIconWrapper>
                </SingleSoundComponents.PlayerCard>
            </PaddingContainer>
        </View>
    );
}
