import { useState } from 'react';
import { LayoutChangeEvent } from "react-native";
import { InputComponent } from './style';
import { theme } from '../../../constaints/theme';
import { windowSize } from '../../../utils/window-size';

const { FormGroup, Label, InputBox } = InputComponent;

type Props = {
    labelText: string;
    placeholder?: string;
    labelInSeperateLine: boolean;
};

const windowWidth = windowSize().width;

export function Input({
    labelText,
    labelInSeperateLine = false,
    placeholder
}: Props) {
    const [labelWidth, setLabelWidth] = useState<number>(0);

    // 63 = (24 +24 => padding of <PaddingContainer></PaddingContainer> + 15 =>(marginRight of label))
    const inputWidth = labelInSeperateLine
        ? '100%'
        : Math.floor(windowWidth) - (63 + labelWidth);

    function ditectLabelWidthHandler(width: number) {
        setLabelWidth(width);
    }

    return (
        <FormGroup
            style={{
                flexDirection: labelInSeperateLine ? 'column' : 'row',
                alignItems: 'center'
            }}
        >
            <Label
                style={{
                    marginRight: 15
                }}
                onLayout={(event: LayoutChangeEvent) => {
                    const { width } = event.nativeEvent.layout;
                    ditectLabelWidthHandler(width);
                }}
            >
                {labelText}
            </Label>
            <InputBox
                placeholder={placeholder}
                placeholderTextColor={theme.color.light.GRAY}
                style={{ width: inputWidth }}
            />
        </FormGroup>
    );
}
