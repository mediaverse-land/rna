import styled from 'styled-components/native';
import { theme } from '../../constaints/theme';
// background-color: #0e0e12a0;

const TabBar = styled.View`
    padding: 0 20px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
  `,
  TopBarBackground = styled.Image`
    position: absolute;
    z-index: 99;
    top: 0;
    left: 24px;
    width: 100%;
    height: 40px;
  `,
  Container = styled.TouchableOpacity`
    width: 100%;
    justify-content: space-between;
    border-bottom: 1px solid ${theme.color.light.PRIMARY};
  `,
  Wrapper = styled.View`
    width: 100%;
    height: 48px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    justidy-content: center;
    position: absolute;
    top: -40px;
  `,
  Label = styled.Text`
    color: ${theme.color.light.WHITE};
    font-size: ${theme.fontSize.sm};
    margin-left: 7.76px;
    width: 100%;
    text-align: center;
    padding-right: 10px;
  `,
  SpacerBorder = styled.View`
    width: 100%;
    height: 2px;
    position: absolute;
    top: 7px;
    background-color: ${theme.color.light.PRIMARY};
  `;

export const TabBarComponents = {
  TabBar,
  Container,
  TopBarBackground,
  Wrapper,
  Label,
  SpacerBorder,
};
