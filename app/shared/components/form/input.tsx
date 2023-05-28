import { Box } from '../box';
import { InputComponent } from './style';
import { Text } from '../text';
import { theme } from '../../../constaints/theme';
import { LayoutChangeEvent } from 'react-native';
import { useState } from 'react';
import { useRtl } from '../../../hooks/use-rtl';

const { InputBox, Label } = InputComponent;

type Props = {
    labelText: string;
    placeholder?: string;
    labelIcon?: any;
};

export function Input({ labelText, placeholder, labelIcon }: Props) {
    const [labelWidth, setLabelWidth] = useState<number>(0);

    const { isRtl } = useRtl();

    return (
        <Box width="100%" direction='row-reverse'>
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
                        borderRightColor: '#fff',
                    }}
                >
                    <Text
                        fontSize={14}
                        lineHeight={theme.numericLineHeight.md}
                        color="#666680"
                        paddingRight={!isRtl ? 16 : 0}
                        paddingLeft={isRtl ? 16 : 0}
                    >
                        {labelIcon ? (
                            <Box marginTop={10} paddingTop={20}>
                                {labelIcon}
                            </Box>
                        ) : null}
                        <Text>
                            {labelIcon ? '   ' : null}
                            {labelText}
                        </Text>
                    </Text>
                </Box>
            </Label>
            <InputBox
                placeholder={placeholder}
                placeholderTextColor="#353542"
                style={{
                    paddingLeft: labelWidth
                }}
                textAlign={isRtl ? 'right' : 'left'}
            />
        </Box>
    );
}
