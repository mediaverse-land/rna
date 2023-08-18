import { FC, ReactNode } from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import { ButtonComponents } from './style';
import { Box } from '../box';
import { Text } from '../text';
import { theme } from '../../constaints/theme';
import { LoadingSpinner } from '../loader-spinner';

type Varient = 'muted' | 'primary' | 'flat' | 'dark';
type Size = 'lg' | 'sm';

type Props = {
    onpressHandler?: (event: GestureResponderEvent) => void;
    text: string;
    icon?: ReactNode;
    varient: Varient;
    width?: number | string;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    borderRadius?: number;
    size?: Size;
    isLoading?: boolean;
    additionalStyles?: any
};

type VarientObject = Record<Varient, Record<string, string>>;
type SizeObject = Record<Size, Record<string, number>>;

const { Btn } = ButtonComponents;

export const Button: FC<Props> = ({
    onpressHandler,
    text,
    icon,
    varient,
    width,
    marginTop,
    marginLeft,
    marginBottom,
    marginRight,
    borderRadius,
    size,
    isLoading = false,
    additionalStyles
}) => {
    const varients: VarientObject = {
        muted: {
            backgroundColor: theme.color.light.BUTTON_LIGHT_GRAY_BG,
            textColor: theme.color.light.WHITE
        },
        primary: {
            backgroundColor: theme.color.light.PRIMARY,
            textColor: theme.color.light.WHITE
        },
        flat: {
            backgroundColor: 'transparent',
            textColor: theme.color.light.ADD_CARD_COLOR
        },
        dark: {
            backgroundColor: theme.color.light.DARK_GRAY,
            textColor: theme.color.light.WHITE
        }
    };

    const sizes: SizeObject = {
        sm: {
            fontSize: 12,
            fontWeight: 400,
            lineHeight: 20
        },
        lg: {
            fontWeight: 600,
            fontSize: 16,
            lineHeight: 16
        }
    };

    const { backgroundColor, textColor } = varients[varient];
    const { fontSize, fontWeight, lineHeight } = sizes[size] || sizes['sm'];

    return (
        <Box
            width={width ? width : '100%'}
            marginTop={marginTop}
            marginBottom={marginBottom}
            marginLeft={marginLeft}
            marginRight={marginRight}
        >
            <TouchableOpacity
                activeOpacity={1}
                onPress={onpressHandler}
                style={{
                    width: '100%'
                }}
            >
                <Btn isFlat={varient === 'flat' ? true : false}>
                    <Box
                        width="100%"
                        height={48}
                        alignItems="center"
                        justifyContent="center"
                        borderRadius={borderRadius || 32}
                        backgroundColor={backgroundColor}
                        direction="row"
                        additionalStyles={additionalStyles}
                    >
                        <Text
                            color={textColor}
                            lineHeight={lineHeight}
                            fontSize={fontSize}
                            fontWeight={fontWeight}
                        >
                            {isLoading ? (
                                isLoading === true ? (
                                    <LoadingSpinner color="red" />
                                ) : (
                                    text
                                )
                            ) : (
                                text
                            )}
                        </Text>
                        {icon ? (
                            <Box marginLeft={10} paddingTop={4}>
                                {icon}
                            </Box>
                        ) : null}
                    </Box>
                </Btn>
            </TouchableOpacity>
        </Box>
    );
};
