import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '../../../../constaints/theme';

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#030340'
        // paddingBottom: 100
    },
    fixed: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});

export const ImagesPageComponents = {
    Container: styled.ScrollView`
        width: 100%;
        flex: 1;
        color: white;
        padding: 0 24px;
    `,
    BannerWrapper: styled.View`
        width: 100%;
        height: 170px;
        justif-content: space-between;
    `,
    BannerItem: styled.View`
        height: 170px;
        border-radius: 16px;
    `,
    DailyRecomended: styled.View`
        width: 100%;
        margin-top: 40px;
        padding-left: 24px;
    `,
    ContainerStyles: styles.container,
    FixedStyles: styles.fixed,
    TextSliderWrapper: styled.View`
        width: 100%;
        height: 154px;
        margin-top: 24px;
    `,
    TextSlide: styled.View`
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
        color: #ccccff;
        font-size: ${theme.fontSize.md};
        line-height: ${theme.lineHeight.md};
    `,
    TextSlideContentText: styled.Text`
        color: #666680;
        font-size: ${theme.fontSize.md};
        line-height: ${theme.lineHeight.md};
        margin-top: 8px;
    `
};
