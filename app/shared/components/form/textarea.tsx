import { InputComponent } from './style';
import { theme } from '../../../constaints/theme';

const { FormGroup, Label, InputBox } = InputComponent;

type Props = {
    labelText: string;
};

export function TextArea({ labelText }: Props) {
    return (
        <FormGroup
            style={{
                flexDirection: 'column'
            }}
        >
            <Label
                style={{
                    marginRight: 15,
                    marginBottom: 8
                }}
            >
                {labelText}
            </Label>
            <InputBox
                multiline
                placeholderTextColor={theme.color.light.GRAY}
                style={{
                    width: '100%',
                    height: 128,
                    textAlignVertical: 'top',
                    paddingTop: 16
                }}
            />
        </FormGroup>
    );
}
