import { ReactNode } from 'react'
import { ViewComponent } from './style'

type Props = {
    children: ReactNode,
    marginTop?: number
    marginBottom?: number
    marginLeft?: number
    marginRight?: number
    paddingTop?: number
    paddingBottom?: number
    paddingLeft?: number
    paddingRight?: number,
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse',
    flex?: number,
    width?: number | string
    height?: number | string,
    hasBlackBorder?: boolean,
    position?: 'absolute' | 'relative',
    top?: number | string,
    bottom?: number | string,
    right?: number | string,
    left?: number | string,
    zIndex?: number,
    backgroundColor?: string,
    borderRadius?: number
}

export function Box(
    {
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
        backgroundColor
    }
        : Props
) {

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
        backgroundColor && { backgroundColor },
    ]

    return (
        <ViewComponent
            style={styles}
            hasBlackBorder={hasBlackBorder}
        >
            {children}
        </ViewComponent>
    )
}