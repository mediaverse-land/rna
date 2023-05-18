import styled from 'styled-components/native';
import { theme } from '../../../../constaints/theme';

export const SoundsPageComponents = {
    MusicPlayerContainer: styled.View`
        width: 100%;
        height: 504px;
        margin-top: 49px;
        border-radius: 16px;
    `,
    MusicPlayerContainerGradient: styled.Image`
        width: 100%;
        height: 504px;
        border-radius: 16px;
    `,
    MusicPlayerBox: styled.View`
        position: absolute;
        top: 0;
        z-index: 1;
        width: 100%;
        height: 504px;
        flex: 1;
        padding-top: 40px;
        align-items: center;
        border-radius: 16px;
        overflow: hidden;
    `,
    MusicPlayerBoxTitle: styled.Text`
        font-size: 25px;
        color: ${theme.color.light.WHITE_BG};
    `,
    MusicCoverSliderWrapper: styled.View`
        width: 100%;
        height: 198px;
        margin-top: 40px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    `,
    CurrentMusicCoverSlide: styled.Image`
        width: 198px;
        height: 198px;
        border-radius: 16px;
    `,
    PrevMusicCoverSlide: styled.Image`
        width: 114px;
        height: 114px;
        border-radius: 16px;
        position: absolute;
        left: -62px;
        opacity: 80;
    `,
    NextMusicCoverSlide: styled.Image`
        width: 114px;
        height: 114px;
        border-radius: 16px;
        position: absolute;
        right: -62px;
        opacity: 0.8;
    `,
    CurrentTrackTitle: styled.Text`
        color: #d9d9ff;
        font-size: ${theme.fontSize.md};
        line-height: ${theme.lineHeight.md};
        margin-top: 40px;
    `,
    CurrentTrackSinger: styled.Text`
        color: #666680;
        font-size: 12px;
        line-height: 12px;
        text-align: center;
        margin-top: 8px;
    `,
    CurrentSliderTime: styled.Text`
        color: #666680;
        width: 31px;
        height: 12px;
        font-size: 12px;
        line-height: 12px;
        margin-left: 15px;
    `,
    StartStopButton: styled.TouchableOpacity`
        width: 48px;
        height: 48px;
    `,
    StartStopButtonGradient: styled.Image`
        position: absolute;
        width: 100px;
        height: 100px;
        top: -19px;
        right: -27px;
        z-index: 1;
    `,
    StartStopButtonIcon: styled.Image`
        position: absolute;
        z-index: 2;
        width: 14.78px;
        height: 16px;
        top: 15px;
        left: 17px;
    `
};
