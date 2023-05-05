import styled from 'styled-components/native';
import { theme } from '../../constaints/theme';

const HeaderWrapper = styled.View`
        width: 100%;
        height: 80px;
        background-color: ${theme.color.light.WHITE_BG};
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 24px;
    `,
    Profile = styled.View`
        flex-direction: row;
        align-items: center;
    `,
    UserName = styled.Text`
        font-size: ${theme.fontSize.lg};
        color: ${theme.color.light.HEADING};
    `,
    SearchIconWrapper = styled.View`
        width: 48px;
        height: 48px;
        background-color: ${theme.color.light.LIGHT_GRAY_BG};
        border-radius: 8px;
        align-items: center;
        justify-content: center;
    `,
    BorderIndicator = styled.View`
        width: 100%;
        border: 0.5px solid ${theme.color.light.GRAY};
        border-bottom-color: #fff;
    `;

export const HeaderStyles = {
    HeaderWrapper,
    Profile,
    UserName,
    SearchIconWrapper,
    BorderIndicator
};
