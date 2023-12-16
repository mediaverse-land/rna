import styled from 'styled-components/native';
import { theme } from '../../constaints/theme';

export const WalletComponents = {
  Button: styled.TouchableOpacity`
    width: 100%;
    height: 48px;
    border-radius: 16px;
    border: 1px dashed ${theme.color.light.ADD_CARD_COLOR};
    align-items: center;
    flex-direction: row;
    justify-content: center;
  `,
};
