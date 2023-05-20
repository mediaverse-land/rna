import styled from 'styled-components/native';

export const ViewComponent = styled.View`
    ${(props: { hasBlackBorder: boolean }) =>
        props.hasBlackBorder ? `border: 1px solid black` : null}
`;
