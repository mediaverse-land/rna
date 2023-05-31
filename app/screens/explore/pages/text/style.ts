import styled from 'styled-components/native';
import { theme } from '../../../../constaints/theme';

export const TextPageComponents = {
    Container: styled.View`
        width: 100%;
        flex: 1;
    `,
    SwiperContainer: styled.View`
        margin-top: 40px;
    `,
    SwiperItem: styled.View`
        width: 100%;
        height: 520px;
    `,
    SwiperBackgroundGradient: styled.Image`
        width: 100%;
        height: 520px;
    `,
    SwiperItemInner: styled.View`
        position: absolute;
        width: 100%;
        height: 520px;
        padding: 24px;
    `,
    SwiperItemThumbnail: styled.Image`
        width: 100%;
        height: 143px;
        border-radius: 8px;
    `,
    SwiperItemTitle: styled.Text`
        margin-top: 24px;
        color: ${theme.color.light.CARD_TITLE_TEXT};
        font-size: ${theme.fontSize.md};
        line-height: ${theme.fontSize.md};
    `,
    SwiperItemContent: styled.Text`
        color: ${theme.color.light.TEXT};
        font-size: ${theme.fontSize.md};
        line-height: ${theme.fontSize.md};
        margin-top: 16px;
    `,
    SwiperItemCreationDate: styled.Text`
        color: ${theme.color.light.TEXT};
        font-size: 12px;
        line-height: 12px;
        padding-top: 4px;
    `,
    NextButton: styled.TouchableOpacity`
        width: 40px;
        height: 40px;
        border: 1px solid ${theme.color.light.INPUT_PLACEHOLDER};
        border-radius: 8px;
        align-items: center;
        justify-content: center;
    `,
    PrevButton: styled.TouchableOpacity`
        width: 40px;
        height: 40px;
        border: 1px solid ${theme.color.light.INPUT_PLACEHOLDER};
        border-radius: 8px;
        align-items: center;
        justify-content: center;
    `,
    NavButtonIcon: styled.Image`
        width: 7.78px;
        height: 14px;
    `,
    BestWritersContainer: styled.View`
        width: 100%;
        padding-left: 24px;
        margin-top: 40px;
    `,
    BestWritersSlider: styled.View`
        width: 100%;
        margin-top: 31px;
    `,
    BestWritersSlide: styled.View`
        width: 183px;
        margin-right: 32px;
    `,
    BestWritersSlideUserImage: styled.Image`
        width: 64px;
        height: 64px;
        border-radius: 100;
    `,
    BestWritersSlideTitle: styled.Text`
        margin-top: 8px;
        color: ${theme.color.light.CARD_TITLE_TEXT};
        font-size: ${theme.fontSize.md};
        line-height: ${theme.fontSize.md};
    `,
    BestWritersSlideDescription: styled.Text`
        margin-top: 16px;
        color: ${theme.color.light.TEXT};
        font-size: ${theme.fontSize.md};
        line-height: ${theme.fontSize.md};
    `
};
