import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#030340'
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
        margin-top: 96px;
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
    FixedStyles: styles.fixed
};
