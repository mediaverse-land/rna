import styled from 'styled-components/native';
import { theme } from '../../constaints/theme';

export const BottomTabBarComponents = {
    Container: styled.View`
        position: absolute;
        left: 20;
        right: 20;
        height: 64px;
        bottom: 20px;
    `,
    TabItem: styled.TouchableOpacity`
        width: 20%;
        height: 64px;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
        background-color: ${theme.color.light.WHITE};
    `
};
// ${(props: { isActive: boolean }) =>
//     props.isActive
//         ? `background-color: ${theme.color.light.HEADING}`
//         : null}
