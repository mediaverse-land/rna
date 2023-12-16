import { ReactNode } from 'react';
import { ViewComponent } from './style';
import { LayoutChangeEvent, ViewProps, ViewStyle } from 'react-native';

type Props = {
  id?: string;
  flexWrap?: 'wrap' | 'nowrap';
  children?: ReactNode;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  padding?: number;
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
    | 'space-around'
    | 'space-evenly';
  additionalStyles?: ViewStyle | ViewStyle[];
  onlayout?: LayoutChangeEvent | any;
  props?: ViewProps;
};

export function Box({
  flexWrap,
  children,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  padding,
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
  onlayout,
  props,
}: Props) {
  const styles = [
    width && { width },
    flexWrap && { flexWrap },
    height && { height },
    marginTop && { marginTop },
    marginBottom && { marginBottom },
    marginRight && { marginRight },
    marginLeft && { marginLeft },
    paddingTop && { paddingTop },
    padding && { padding },
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
    justifyContent && { justifyContent },
  ];

  return (
    <ViewComponent
      style={[...styles, additionalStyles]}
      hasBlackBorder={hasBlackBorder}
      borderColor={borderColor}
      onLayout={onlayout}
      {...props}
    >
      {children}
    </ViewComponent>
  );
}

// import { ReactNode } from 'react';
// import { View, ViewProps, ViewStyle } from 'react-native';
// import styled from 'styled-components/native';

// type StyledViewProps = {
//     id?: string;
//     flexWrap?: 'wrap' | 'nowrap';
//     children?: ReactNode;
//     mT?: number;
//     mB?: number;
//     mL?: number;
//     mR?: number;
//     p?: number;
//     pT?: number;
//     pB?: number;
//     pL?: number;
//     pR?: number;
//     dir?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
//     flex?: number;
//     w?: number | string;
//     h?: number | string;
//     hasBlackBorder?: boolean;
//     pos?: 'absolute' | 'relative';
//     t?: number | string;
//     b?: number | string;
//     r?: number | string;
//     l?: number | string;
//     z?: number;
//     bg?: string;
//     br?: number;

//     bTER?: number;
//     bTSR?: number;
//     bTRR?: number;
//     bTLR?: number;

//     bBER?: number;
//     bBSR?: number;
//     bBRR?: number;
//     bBLR?: number;

//     bc?: string;

//     ai?: 'center' | 'flex-start' | 'flex-end';
//     jc?:
//         | 'center'
//         | 'flex-start'
//         | 'flex-end'
//         | 'space-between'
//         | 'space-around';
//     style?: ViewStyle | ViewStyle[];
//     onLayout?: ViewProps['onLayout'];
//     props?: ViewProps;
// };

// const StyledView = styled(View)<{
//     hasBlackBorder?: boolean;
//     borderColor?: string;
// }>`
//     border-color: ${(props) => (props.hasBlackBorder ? 'black' : props.borderColor)};
//     border-width: ${(props) => (props.hasBlackBorder ? '1px' : 0)};
// `;

// export default function StyledViewComponent({
//     id,
//     flexWrap,
//     children,
//     mT,
//     mB,
//     mL,
//     mR,
//     p,
//     pT,
//     pB,
//     pL,
//     pR,
//     dir,
//     flex,
//     w,
//     h,
//     hasBlackBorder = false,
//     pos,
//     t,
//     b,
//     r,
//     l,
//     z,
//     bg,
//     br,

//     bTER,
//     bTSR,
//     bTRR,
//     bTLR,

//     bBER,
//     bBSR,
//     bBRR,
//     bBLR,

//     bc,
//     ai,
//     jc,
//     style,
//     onLayout,
//     props
// }: StyledViewProps) {
//     const styles = {
//         width: w,
//         flexWrap,
//         height: h,
//         marginTop: mT,
//         marginBottom: mB,
//         marginRight: mR,
//         marginLeft: mL,
//         paddingTop: pT,
//         padding: p,
//         paddingBottom: pB,
//         paddingRight: pR,
//         paddingLeft: pL,
//         flexDirection: dir,
//         flex: flex ?? 1,
//         position: pos,
//         top: t,
//         bottom: b,
//         right: r,
//         left: l,
//         zIndex: z,
//         borderRadius: br,

//         borderTopEndRadius: bTER,
//         borderTopStartRadius: bTSR,
//         borderTopRightRadius: bTRR,
//         borderTopLeftRadius: bTLR,

//         borderBottomEndRadius: bBER,
//         borderBottomStartRadius: bBSR,
//         borderBottomRightRadius: bBRR,
//         borderBottomLeftRadius: bBLR,

//         backgroundColor: bg,
//         alignItems: ai,
//         justifyContent: jc,
//         ...style
//     };

//     return (
//         <StyledView
//            id={id}
//             style={styles}
//             hasBlackBorder={hasBlackBorder}
//             borderColor={bc}
//             onLayout={onLayout}
//             {...props}
//         >
//             {children}
//         </StyledView>
//     );
// }
