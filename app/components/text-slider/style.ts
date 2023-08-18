import styled from 'styled-components/native';
import { theme } from '../../constaints/theme';

export const TextSliderComponents = {
    TextSliderWrapper: styled.View`
        width: 100%;
        height: 154px;
        margin-top: 24px;
    `,
    TextSlide: styled.TouchableOpacity`
        width: 190px;
        height: 154px;
        margin-right: 16px;
        border-radius: 16px;
    `,
    TextSlideBackgroundGradient: styled.Image`
        width: 190px;
        height: 154px;
        border-radius: 16px;
    `,
    TextSlideBody: styled.TouchableOpacity`
        position: absolute;
        width: 100%;
        height: 154px;
        top: 0;
        padding: 24px 16px;
    `,
    TextSlideTitle: styled.Text`
        color: ${theme.color.light.SONG_CARD_TITLE_TEXT};
        font-size: ${theme.fontSize.md};
        line-height: ${theme.lineHeight.md};
    `,
    TextSlideContentText: styled.Text`
        width: 100%;
        height: 48px;
        color: ${theme.color.light.TEXT};
        font-size: ${theme.fontSize.md};
        line-height: ${theme.lineHeight.md};
        margin-top: 8px;
    `
};
