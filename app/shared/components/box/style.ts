import styled from 'styled-components/native';

export const ViewComponent: any = styled.View`
    ${(props: { hasBlackBorder: boolean; borderColor: string }) =>
        props.hasBlackBorder ? `border: 1px solid #fff` : null};

    ${(props: { hasBlackBorder: boolean; borderColor: string }) =>
        props.borderColor ? `border: 1px solid ${props.borderColor}` : null}
`;
