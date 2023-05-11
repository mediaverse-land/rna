import styled from 'styled-components/native';
import { theme } from '../../../constaints/theme';

export const BottomTabBarComponents = {
    Container: styled.View`
        position: absolute;
        left: 20;
        right: 20;
        height: 64px;
        bottom: 20px;
        background-color: ${theme.color.light.WHITE_BG};
        border-radius: 20px;
    `,
    TabItem: styled.TouchableOpacity`
        width: 25%;
        height: 64px;
        justify-content: center;
        align-items: center;
        border-radius: 20px;

        ${(props: { isActive: boolean }) =>
            props.isActive
                ? `background-color: ${theme.color.light.HEADING}`
                : null}
    `
};
