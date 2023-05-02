import styled from 'styled-components/native';
import { theme } from '../../../../constaints/theme';

const Container = styled.ScrollView`
    width: 100%;
`;

export const LiveVideosComponents = {
    Container: styled.View`
        width: 100%;
    `,
    Item: styled.View`
        width: 157px;
        height: 65px;
        border-radius: 8px;
        border: 1px solid ${theme.color.light.GRAY_BORDER};
        background-color: ${theme.color.light.WHITE_BG};
        padding: 8px;
        flex-direction: row;
        align-items: center;
        margin-right: 16px;
    `,
    Body: styled.View`
        width: 100%;
        padding-left: 8px;
    `,
    Title: styled.Text`
        color: ${theme.color.light.HEADING};
        height: 20px;
        font-size: ${theme.fontSize.md};
    `,
    Categoty: styled.Text`
        color: ${theme.color.light.GRAY_BORDER};
        height: 17px;
        font-size: ${theme.fontSize.sm};
    `
};

export const VideosPageComponents = {
    Container
};
