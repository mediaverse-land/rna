import styled from 'styled-components/native';
import { theme } from '../../constaints/theme';

export const SingleImageComponents = {
    Container: styled.View`
        padding-bottom: 24px;
    `,
    Hero: styled.View`
        width: 100%;
    `,
    Body: styled.View`
        width: 100%;
        height: 200px;
        border: 1px solid black;
    `,
    UserDataWrapper: styled.View`
        flex-direction: row;
        justify-content: space-between;
    `,
    ReportBtn: styled.Text`
        color: ${theme.color.light.PRIMARY};
        font-size: ${theme.fontSize.md};
    `,
    UserName: styled.Text`
        font-size: ${theme.fontSize.sm};
        color: ${theme.color.light.GRAY};
    `,
    ContentText: styled.Text`
        color: ${theme.color.light.CONTENT_TEXT};
        line-height: ${theme.lineHeight.conten};
        font-size: ${theme.fontSize.md};
    `
};
