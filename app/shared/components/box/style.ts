import styled from 'styled-components/native';
import { theme } from '../../../constaints/theme';

export const ViewComponent: any = styled.View`
    ${(props: { hasBlackBorder: boolean; borderColor: string }) =>
        props.hasBlackBorder
            ? `border: 1px solid ${theme.color.light.WHITE}`
            : null};

    ${(props: { hasBlackBorder: boolean; borderColor: string }) =>
        props.borderColor ? `border: 1px solid ${props.borderColor}` : null}
`;
