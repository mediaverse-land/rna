import styled from 'styled-components/native';
import { theme } from '../../../constaints/theme';

export const HorizontalSliderComponents = {
    Wrapper: styled.View`
        width: 100%;
        height: 200px;
    `,
    Slide: styled.TouchableOpacity`
        width: 143px;
        height: 200px;
        margin-right: 16px;
    `,
    SlideThumbnail: styled.Image`
        width: 143px;
        height: 143px;
        border-radius: 16px;
    `,
    SliderThumbnailGradient: styled.Image`
        width: 143px;
        height: 143px;
        border-radius: 16px;
        position: absolute;
    `,
    SlideTitle: styled.Text`
        margin-top: 16px;
        color: #666680;
        font-size: ${theme.fontSize.md};
        line-height: ${theme.lineHeight.md};
    `
};
