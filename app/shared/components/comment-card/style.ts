import styled from 'styled-components/native';
import { theme } from '../../../constaints/theme';

export const CommentCardComponents = {
    Wrapper: styled.View`
        width: 100%;
        background-color: ${theme.color.light.COMMENT_BOX_BG};
        padding-left: 17px;
        padding-right: 17px;
        padding-bottom: 17px;
        padding-top: 16px;
        border-radius: 8px;
    `,
    Title: styled.Text`
        font-size: ${theme.fontSize.md};
        color: ${theme.color.light.COMMENT_BOX_TITLE_COLOR};
    `,
    CommentsCound: styled.Text`
        color: ${theme.color.light.GRAY};
        font-size: ${theme.fontSize.md};
        margin-left: 8px;
    `,
    TextBoxWrapper: styled.View`
        width: 100%;
        height: 40px;
        margin-top: 16px;
    `,
    TextBox: styled.TextInput`
        width: 100%;
        height: 40px;
        color: ${theme.color.light.GRAY};
        padding-left: 16px;
        padding-top: 12px;
        padding-bottom: 11px;
        background-color: ${theme.color.light.WHITE_BG};
        border-radius: 8px;
        font-size: ${theme.fontSize.sm};
    `
};
