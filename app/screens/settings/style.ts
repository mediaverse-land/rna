import styled from 'styled-components/native';
import { theme } from '../../constaints/theme';

export const SettingsScreenComponents = {
  EditButton: styled.TouchableOpacity`
    position: absolute;
    bottom: 30px;
    left: 24px;
    background-color: rgba(78, 78, 97, 0.5);
    height: 48px;
    border-radius: 32px;
    align-items: center;
    justify-content: center;
  `,
  SaveButton: styled.TouchableOpacity`
    position: absolute;
    bottom: 30px;
    left: 24px;
    background-color: ${theme.color.light.PRIMARY};
    height: 48px;
    border-radius: 32px;
    align-items: center;
    justify-content: center;
  `,
  AddAccountButton: styled.TouchableOpacity`
    width: 100%;
    height: 48px;
    border: 1px dashed ${theme.color.light.LIGHT_DESCRIPTION};
    border-radius: 16px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `,
  AddAccountSubmitButton: styled.TouchableOpacity`
        width: 100%:
        height: 48px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-radius: 16px; 
    `,
};
