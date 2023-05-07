import styled from 'styled-components/native';
import { theme } from '../../../../constaints/theme';

export const CreateTextComponents = {
    ContentContainer: styled.View`
        width: 100%;
    `,
    Input: styled.TextInput`
        width: 100%;
        height: 25px;
        border: none;
        color: ${theme.color.light.HEADING};
        font-size: ${theme.fontSize.xl};
        line-height: 24.71px;
    `,
    BorderSpacer: styled.View`
        width: 100%;
        height: 1px;
        background-color: ${theme.color.light.GRAY};
        margin: 16px 0;
    `,
    TagListItemStyles: styled.Text`
        font-size: ${theme.fontSize.md};
        color: ${theme.color.light.PRIMARY};
        margin-right: 8px;
    `
};
