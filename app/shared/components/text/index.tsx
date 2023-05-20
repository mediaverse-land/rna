import { ReactNode } from "react"
import { Text as ReactNativeText } from "react-native"

type Props = {
    children: ReactNode,
    fontSize?: number,
    lineHeight?: number,
    color?: string,
    marginTop?: number
    marginBottom?: number
    marginLeft?: number
    marginRight?: number
    paddingTop?: number
    paddingBottom?: number
    paddingLeft?: number
    paddingRight?: number,
    fontWeight?: any
}

export function Text(
    {
        children,
        fontSize,
        lineHeight,
        color,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
        fontWeight
    }
        : Props
) {
    const styles = [
        fontSize && { fontSize },
        lineHeight && { lineHeight },
        color && { color },
        marginTop && { marginTop },
        marginBottom && { marginBottom },
        marginLeft && { marginLeft },
        marginRight && { marginRight },
        paddingTop && { paddingTop },
        paddingBottom && { paddingBottom },
        paddingLeft && { paddingLeft },
        paddingRight && { paddingRight },
        fontWeight && { fontWeight }
    ]
    return (
        <ReactNativeText style={[...styles]}>{children}</ReactNativeText>
    )
}