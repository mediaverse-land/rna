import styled from 'styled-components/native';
import { theme } from '../../constaints/theme';

export const EditScreenStyles = {
  ThumbnailWrapper: styled.View`
    width: 100%;
  `,
  EditableTitleInput: styled.TextInput<{ isFocused: boolean }>`
        width: 100%;
        color:${theme.color.light.WHITE};
        font-weight: 600;
        line-height: 20px
        font-size: 20px;
        border-radius: 8px;
        padding: 5px 10px;
    `,
  EditableInput: styled.TextInput<{ isLarge?: boolean }>`
    width: 100%;
    color: ${theme.color.light.TEXT};
    font-weight: 400;
    line-height: 14px;
    font-size: ${(props) => (props.isLarge ? '20px' : '14px')};
    border: 1px solid ${theme.color.light.TEXT};
    border-radius: 8px;
    padding: 5px 10px;
    padding-top: ${(props) => (props.isLarge ? '13px' : '5px')};
  `,
};
