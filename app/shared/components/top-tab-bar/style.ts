import styled from 'styled-components/native';
import { theme } from '../../../constaints/theme';

const TabBar = styled.View`
        padding: 0 20px;
        flex-direction: row;
        background-color: ${theme.color.light.WHITE_BG};
    `,
    Container = styled.TouchableOpacity`
        width: 100%;
        justify-content: space-between;
        border-bottom: 1px solid ${theme.color.light.PRIMARY};
    `,
    Wrapper = styled.View`
        width: 100%;
        height: 56px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        justidy-content: center;
    `,
    Label = styled.Text`
        color: ${theme.color.light.PRIMARY};
        font-size: ${theme.fontSize.md};
        margin-left: 7.76px;
        border: 1px solid #fff;
    `,
    SpacerBorder = styled.View`
        width: 100%;
        height: 2px;
        background-color: ${theme.color.light.PRIMARY};
    `;

export const TabBarComponents = {
    TabBar,
    Container,
    Wrapper,
    Label,
    SpacerBorder
};
