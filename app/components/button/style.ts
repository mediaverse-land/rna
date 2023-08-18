import styled from 'styled-components/native';
import { theme } from '../../constaints/theme';

export const ButtonComponents = {
    Btn: styled.View<{ isFlat: boolean }>`
        ${(props) =>
            props.isFlat &&
            `
                border: 1px dashed ${theme.color.light.ADD_CARD_COLOR};
                border-radius:16px;
            `}
    `
};
