import { ReactNode } from 'react';
import { ViewComponent } from './style';
import { LayoutChangeEvent, ViewStyle } from 'react-native';

type Props = {
    children: ReactNode;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    flex?: number;
    width?: number | string;
    height?: number | string;
    hasBlackBorder?: boolean;
    position?: 'absolute' | 'relative';
    top?: number | string;
    bottom?: number | string;
    right?: number | string;
    left?: number | string;
    zIndex?: number;
    backgroundColor?: string;
    borderRadius?: number;
    borderTopEndRadius?: number;
    borderTopStartRadius?: number;
    borderTopRightRadius?: number;
    borderTopLeftRadius?: number;

    borderBottomEndRadius?: number;
    borderBottomStartRadius?: number;
    borderBottomRightRadius?: number;
    borderBottomLeftRadius?: number;

    borderColor?: string;

    alignItems?: 'center' | 'flex-start' | 'flex-end';
    justifyContent?:
        | 'center'
        | 'flex-start'
        | 'flex-end'
        | 'space-between'
        | 'space-around';
    additionalStyles?: ViewStyle;
    onlayout?: LayoutChangeEvent;
};

export function Box({
    children,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    direction,
    flex,
    width,
    height,
    hasBlackBorder = false,
    position,
    top,
    bottom,
    right,
    left,
    zIndex,
    borderRadius,
    backgroundColor,

    borderTopEndRadius,
    borderTopStartRadius,
    borderTopRightRadius,
    borderTopLeftRadius,

    borderBottomEndRadius,
    borderBottomStartRadius,
    borderBottomRightRadius,
    borderBottomLeftRadius,
    borderColor,
    alignItems,
    justifyContent,
    additionalStyles,
    onlayout
}: Props) {
    const styles = [
        width && { width },
        height && { height },
        marginTop && { marginTop },
        marginBottom && { marginBottom },
        marginRight && { marginRight },
        marginLeft && { marginLeft },
        paddingTop && { paddingTop },
        paddingBottom && { paddingBottom },
        paddingRight && { paddingRight },
        paddingLeft && { paddingLeft },
        direction && { flexDirection: direction },
        flex && { flex: 1 },
        position && { position },
        top && { top },
        bottom && { bottom },
        right && { right },
        left && { left },
        zIndex && { zIndex },
        borderRadius && { borderRadius },

        borderTopEndRadius && { borderTopEndRadius },
        borderTopStartRadius && { borderTopStartRadius },
        borderTopRightRadius && borderTopRightRadius,
        borderTopLeftRadius && borderTopLeftRadius,

        borderBottomEndRadius && { borderBottomEndRadius },
        borderBottomStartRadius && { borderBottomStartRadius },
        borderBottomRightRadius && { borderBottomRightRadius },
        borderBottomLeftRadius && { borderBottomLeftRadius },
        backgroundColor && { backgroundColor },
        alignItems && { alignItems },
        justifyContent && { justifyContent }
    ];

    return (
        <ViewComponent
            style={[...styles, additionalStyles]}
            hasBlackBorder={hasBlackBorder}
            borderColor={borderColor}
            onLayout={onlayout}
        >
            {children}
        </ViewComponent>
    );
}
