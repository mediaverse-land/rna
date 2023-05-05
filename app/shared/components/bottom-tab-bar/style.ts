import styled from 'styled-components/native';
import { theme } from '../../../constaints/theme';

export const BottomTabBarComponents = {
    Container: styled.View`
        width: 100%;
        height: 72px;
        background-color: ${theme.color.light.WHITE_BG};
    `,
    TabItem: styled.TouchableOpacity`
        width: 25%;
        height: 72px;
        justify-content: center;
        align-items: center;
        ${(props: { isActive: boolean }) =>
            props.isActive
                ? `background-color: ${theme.color.light.HEADING}`
                : null}
    `
};
