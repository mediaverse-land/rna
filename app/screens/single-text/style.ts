import styled from 'styled-components/native';
import { theme } from '../../constaints/theme';

export const SingleTextComponents = {
    Container: styled.View`
        width: 100%;
        flex: 1;
        padding-bottom: 24px;
    `,
    UserDataWrapper: styled.View`
        flex-direction: row;
        justify-content: space-between;
    `,
    ContentText: styled.Text`
        color: ${theme.color.light.CONTENT_TEXT};
        line-height: ${theme.lineHeight.conten};
        font-size: ${theme.fontSize.md};
    `
};
