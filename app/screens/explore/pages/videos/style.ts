import styled from 'styled-components/native';
import { theme } from '../../../../constaints/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#030340',
        paddingBottom: 100
    },
    fixed: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});

export const VideoPageComponents = {
    ContainerStyles: styles.container,
    FixedStyles: styles.fixed,
    ListWrapper: styled.View`
        width: 100%;
        margin-top: 56px;
        flex: 1;
    `,
    VideoListItem: styled.View`
        width: 100%;
        margin-top: 42px;
        border-radius: 8px;
    `,
    VideoListItemThumbnail: styled.Image`
        width: 100%;
        height: 226px;
        border-radius: 8px;
    `,
    VideoListItemGradietImage: styled.Image`
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 226px;
        border-radius: 8px;
    `,
    VideoListItemDescription: styled.Text`
        margin-top: 16px;
        padding: 0 8px;
        color: #666680;
        font-size: ${theme.fontSize.md};
        line-height: ${theme.lineHeight.md};
    `,
    VideoListItemDuration: styled.Text`
        color: #666680;
        font-size: 12px;
        line-height: 12px;
        margin-top: 5px;
    `
};
