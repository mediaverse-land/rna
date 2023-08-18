import { useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { InputComponent } from './style';
import { theme } from '../../constaints/theme';
import { windowSize } from '../../utils/window-size';

const { FlatFormGroup, InputBox, FlatLabel } = InputComponent;

type Props = {
    labelText: string;
    placeholder?: string;
    labelInSeperateLine: boolean;
};

const windowWidth = windowSize().width;

export function FlatInput({
    labelText,
    labelInSeperateLine = false,
    placeholder
}: Props) {
    const [labelWidth, setLabelWidth] = useState<number>(0);

    // 63 = (24 +24 => padding of <PaddingContainer></PaddingContainer> + 15 =>(marginRight of label))
    const inputWidth = labelInSeperateLine
        ? '100%'
        : Math.floor(windowWidth) - (79 + labelWidth);

    function ditectLabelWidthHandler(width: number) {
        setLabelWidth(width);
    }

    return (
        <FlatFormGroup
            style={{
                flexDirection: labelInSeperateLine ? 'column' : 'row',
                alignItems: 'center'
            }}
        >
            <FlatLabel
                style={{
                    marginRight: 15,
                    borderRightColor: theme.color.light.GRAY,
                    borderRightWidth: 0.5
                }}
                onLayout={(event: LayoutChangeEvent) => {
                    const { width } = event.nativeEvent.layout;
                    ditectLabelWidthHandler(width);
                }}
            >
                {labelText}
            </FlatLabel>

            <InputBox
                placeholder={placeholder}
                placeholderTextColor={theme.color.light.GRAY}
                style={{
                    width: inputWidth,
                    paddingLeft: 70
                }}
                flat
            />
        </FlatFormGroup>
    );
}
