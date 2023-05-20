import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const PaddingContainer = styled.View`
    width: 100%;
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
    ${(props: { height?: string }) => (props.height ? props.height : null)};
`;

interface FlexStyleProps {
    justify?:
        | 'center'
        | 'space-between'
        | 'space-around'
        | 'flex-start'
        | 'flex-end';
    direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    align?: 'center' | 'flex-start' | 'flex-end';
    height?: string;
    width?: string;
    marginTop?: string;
    marginLeft?: string;
    marginRight?: string;
    marginBottom?: string;
}

export const Flex = styled.View<FlexStyleProps>`
    width: ${(props) => (props.width ? props.width : '100%')}};
    flex-wrap: nowrap;
    ${(props) => (props.height ? `height: ${props.height}` : null)}};
    ${(props) =>
        props.justify ? `justify-content: ${props.justify}` : null}};   
    ${(props) =>
        props.direction ? `flex-direction: ${props.direction}` : null}};
    ${(props) => (props.align ? `align-items: ${props.align}` : null)}};   
    ${(props) => (props.marginTop ? `margin-top: ${props.marginTop}` : null)}};
    ${(props) =>
        props.marginLeft ? `margin-top: ${props.marginLeft}` : null}};
    ${(props) =>
        props.marginRight ? `margin-top: ${props.marginRight}` : null}};
    ${(props) =>
        props.marginBottom ? `margin-top: ${props.marginBottom}` : null}};

`;

export const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#030340',
        paddingBottom: 100
    },
    fixed: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});
