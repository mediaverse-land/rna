import styled from 'styled-components/native';
import { theme } from '../../../constaints/theme';

export const InputComponent: any = {
    FormGroup: styled.View`
        width: 100%;
    `,
    Label: styled.Text`
        color: ${theme.color.light.GRAY};
        font-size: ${theme.fontSize.md};
        line-height: 19.77px;
    `,
    InputBox: styled.TextInput`
        height: 56px;
        background-color: ${theme.color.light.WHITE_BG};
        // padding: 16px 18px;
        padding: 0 18px;
        border-radius: 8px;
        color: ${theme.color.light.HEADING};
        font-size: ${theme.fontSize.md};
    `,
    datePiclerIconStyles: {
        width: 22,
        height: 22,
        position: 'absolute',
        top: 17,
        zIndex: 3,
        right: 19
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
    `
};
