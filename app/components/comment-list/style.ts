import styled from 'styled-components/native';
import { theme } from '../../constaints/theme';

export const CommentCardComponents = {
  CommentInput: styled.TextInput`
    width: 100%;
    height: 40px;
    border-radius: 8px;
    background-color: ${theme.color.light.DARK_GRAY};
    padding: 0 16px;
    font-size: 14px;
    line-height: 16px;
    color: #fff;
  `,
};
