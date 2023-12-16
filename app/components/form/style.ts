import styled from 'styled-components/native';
import { theme } from '../../constaints/theme';

export const InputComponent: any = {
  FormGroup: styled.View`
    width: 100%;
  `,
  FlatFormGroup: styled.View`
    width: 100%;
    border: 0.5px solid ${theme.color.light.GRAY};
    padding-left: 16px;
    border-radius: 8px;
  `,
  Label: styled.Text<{ isRtl: boolean; isIOS?: boolean }>`
    height: 100%;
    ${(props) => (!props?.isIOS ? 'padding: 16px' : null)}
    position: absolute;
    color: #fff;
    ${(props) => (!props.isRtl ? `right: 0` : `left: 0`)};
  `,
  FlatLabel: styled.Text`
    width: 52px;
    font-size: ${theme.fontSize.md};
    height: 30;
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 13px;
    left: 17px;
    z-index: 3;
    padding-top: 3px;
    color: ${theme.color.light.GRAY};
  `,
  InputBox: styled.TextInput<{
    textAlign: string;
    hasError?: boolean;
    showBorder: boolean;
  }>`
    width: 100%;
    height: 48px;
    border-radius: 8px;
    border: 1px solid
      ${(props) =>
        props.hasError
          ? theme.color.light.DANGER
          : props.showBorder
          ? theme.color.light.INPUT_PLACEHOLDER
          : 'transparent'};
    background-color: rgba(14, 14, 18, 0.5);
    color: ${(props) => (props.hasError ? theme.color.light.DANGER : theme.color.light.WHITE)};
    font-size: ${theme.fontSize.md};
    line-height: ${theme.lineHeight.md};
    text-align: ${(props) => props.textAlign};
  `,
  datePiclerIconStyles: {
    width: 22,
    height: 22,
    position: 'absolute',
    top: 17,
    zIndex: 3,
    right: 19,
  },
  PickerPlaceholder: styled.Text`
    width: 52px;
    font-size: ${theme.fontSize.md};
    height: 30;
    flex-direction: row;
    align-items: center;
    position: absolute;
    top: 13px;
    left: 17px;
    z-index: 3;
    padding-top: 3px;
    color: ${theme.color.light.GRAY};
  `,
  HorizontalRadioWrapper: styled.View`
    width: 100%;
    margin-top: -20px;
  `,
  HorizontalRadioItem: styled.TouchableOpacity`
    width: 100%;
    height: 48px;
    border: 1px solid ${theme.color.light.TEXT};
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;
  `,
  HorizontalRadioItemText: styled.Text`
    font-size: ${theme.fontSize.sm};
    color: ${theme.color.light.TEXT};
  `,
  Select: styled.View`
    width: 100%;
    flex: 1;
    align-items: center;
  `,
  Option: styled.TouchableOpacity`
    width: 100%;
    height: 48px;
    padding: 0 16px;
    border: 0.5px solid ${(props: { color: string }) => props.color};
    border-radius: 8px;
    margin-top: 8px;
    justify-content: center;
    border: 1px solid ${theme.color.light.TEXT};
  `,
  OptionText: styled.Text`
    margin-left: 15px;
    color: ${(props: { color: string }) => props.color};
    font-size: ${theme.fontSize.md};
  `,
};
