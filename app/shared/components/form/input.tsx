import { Box } from '../box';
import { InputComponent } from './style';
import { Text } from '../text';
import { theme } from '../../../constaints/theme';
import { LayoutChangeEvent } from 'react-native';
import { useState } from 'react';

const { InputBox, Label } = InputComponent;

type Props = {
    labelText: string;
    placeholder?: string;
};

export function Input({ labelText, placeholder }: Props) {
    const [labelWidth, setLabelWidth] = useState<number>(0);

    return (
        <Box width="100%">
            <Label
                onLayout={(e: LayoutChangeEvent) => {
                    const { width } = e.nativeEvent.layout;
                    setLabelWidth(Math.floor(width));
                }}
            >
                <Box
                    height="100%"
                    additionalStyles={{
                        borderRightWidth: 1,
                        borderRightColor: '#fff'
                    }}
                >
                    <Text
                        fontSize={14}
                        lineHeight={theme.numericLineHeight.md}
                        color="#666680"
                        paddingRight={16}
                    >
                        {labelText}
                    </Text>
                </Box>
            </Label>
            <InputBox
                placeholder={placeholder}
                placeholderTextColor="#353542"
                style={{
                    paddingLeft: labelWidth
                }}
            />
        </Box>
    );
}
