import styled from 'styled-components/native';
import { theme } from '../../../constaints/theme';

export const ConfirmModalComponents = {
    Button: styled.TouchableOpacity`
        width: 100%;
        height: 48px;
        border-radius: 32px;
        background-color: ${theme.color.light.DARK_GRAY};
        justify-content: center;
        align-items: center;
    `
};
