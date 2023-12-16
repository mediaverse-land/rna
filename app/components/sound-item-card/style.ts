import styled from 'styled-components/native';
import { theme } from '../../constaints/theme';

export const SoundCardItemComponents = {
  Container: styled.View`
    width: 100%;
    height: 104px;
    background-color: ${theme.color.light.WHITE_BG};
    border-radius: 8px;
    border: 1px solid ${theme.color.light.GRAY_BORDER};
    flex-direction: row;
    margin-bottom: 8px;
  `,
  CoverBox: styled.View`
    width: 104px;
    height: 102px;
    border-radius: 8px;
    background-color: ${theme.color.light.GRAY_BORDER};
    justify-content: center;
    align-items: center;
  `,
  Title: styled.Text`
    height: 20px;
    margin-bottom: 4px;
    color: ${theme.color.light.HEADING};
    font-size: ${theme.fontSize.md};
  `,
  Description: styled.Text`
    height: 17px;
    color: ${theme.color.light.GRAY};
    font-size: ${theme.fontSize.sm};
    line-height: ${theme.lineHeight.itemCard};
    margin-bottom: 13px;
  `,
  UserInfoBox: styled.View`
    flex-direction: row;
  `,
  UserName: styled.Text`
    color: ${theme.color.light.GRAY};
    font-size: ${theme.fontSize.sm};
    line-height: ${theme.lineHeight.itemCard};
    margin-left: 8px;
  `,
};
