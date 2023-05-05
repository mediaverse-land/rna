import styled from 'styled-components/native';

export const PaddingContainer = styled.View`
    width: 100%;
    margin-top: 30px;
    padding: 0 24px;
`;

export const LeftPaddingContainer = styled.View`
    width: 100%;
    margin-top: 30px;
    padding-left: 24px;
`;

export const RowAlignCenter = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Center = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
    ${(props: any) => (props.height ? props.height : null)};
`;

interface FlexStyleProps {
    justify?: string;
    direction?: string;
    align?: string;
    height?: string;
}

export const Flex = styled.View<FlexStyleProps>`
    width: 100%;
    flex-wrap: nowrap;
    ${(props) => (props.height ? `height: ${props.height}` : null)}};
    ${(props) =>
        props.justify ? `justify-content: ${props.justify}` : null}};   
    ${(props) =>
        props.direction ? `flex-direction: ${props.direction}` : null}};
    ${(props) => (props.align ? `align-items: ${props.align}` : null)}};   
`;
