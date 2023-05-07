import styled from 'styled-components/native';
import { theme } from '../../../../constaints/theme';

export const CreateContentLandingPageComponents = {
    Container: styled.View`
        flex: 1;
        justify-content: center;
        align-items: center;
        padding: 24px 0;
    `,
    CreateContentItem: styled.TouchableOpacity`
        height: 127px;
        width: 50%;
        border-radius: 8px;
        background-color: ${theme.color.light.WHITE_BG};
        border: 1px solid ${theme.color.light.GRAY};
        flex: 1;
        justify-content: center;
        align-items: center;
    `,
    TitleText: styled.Text`
        font-size: 25px;
        line-height: 30.89px;
        color: ${theme.color.light.HEADING};
    `,
    ItemText: styled.Text`
        color: ${theme.color.light.GRAY};
        font-size: ${theme.fontSize.lg};
    `
};
