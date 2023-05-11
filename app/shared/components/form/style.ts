import styled from 'styled-components/native';
import { theme } from '../../../constaints/theme';

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
    Label: styled.Text`
        color: ${theme.color.light.GRAY};
        font-size: ${theme.fontSize.md};
        line-height: 19.77px;
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
    InputBox: styled.TextInput`
        height: 56px;
        background-color: ${(props: { flat: boolean }) =>
            props.flat
                ? theme.color.light.TRANSPARENT
                : theme.color.light.WHITE_BG};
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
    `,
    HorizontalRadioWrapper: styled.View`
        height: 56px;
        flex-direction: row;
        justify-content: space-between;
    `,
    HorizontalRadioItem: styled.TouchableOpacity`
        width: 32%;
        height: 56px;
        border: 1px solid ${theme.color.light.GRAY};
        border-radius: 4px;
        justify-content: center;
        align-items: center;
    `,
    HorizontalRadioItemText: styled.Text`
        font-size: ${theme.fontSize.md};
        color: ${theme.color.light.GRAY};
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
    `,
    OptionText: styled.Text`
        margin-left: 15px;
        color: ${(props: { color: string }) => props.color};
        font-size: ${theme.fontSize.md};
    `
};
