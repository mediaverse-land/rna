// import * as React from 'react'
// import { View, Text, TouchableOpacity, StyleProp, ViewStyle, StyleSheet, TextStyle } from 'react-native'

// export interface TooltipProps {
//   isFirstStep?: boolean
//   isLastStep?: boolean
//   currentStep: IStep
//   labels?: Labels
//   handleNext?: () => void
//   handlePrev?: () => void
//   handleStop?: () => void
// }

// export const GuideTooltip = ({
//   isFirstStep,
//   isLastStep,
//   handleNext,
//   handlePrev,
//   handleStop,
//   currentStep,
//   labels,
// }: TooltipProps) => (
//   <View
//     style={{
//       borderRadius: 16,
//       paddingTop: 24,
//       alignItems: 'center',
//       justifyContent: 'center',
//       paddingBottom: 16,
//       width: '80%',
//       backgroundColor: '#ffffffef',
//     }}
//   >
//     <View style={styles.tooltipContainer}>
//       <Text testID='stepDescription' style={styles.tooltipText}>
//         {currentStep && currentStep.text}
//       </Text>
//     </View>
//     <View style={[styles.bottomBar]}>
//       {!isLastStep ? (
//         <TouchableOpacity onPress={handleStop}>
//           <Button>{labels?.skip || 'Skip'}</Button>
//         </TouchableOpacity>
//       ) : null}
//       {/* {!isFirstStep ? (
//         <TouchableOpacity onPress={handlePrev}>
//           <Button>{labels?.previous || 'Previous'}</Button>
//         </TouchableOpacity>
//       ) : null} */}
//       {!isLastStep ? (
//         <TouchableOpacity onPress={handleNext}>
//           <Button>{labels?.next || 'Next'}</Button>
//         </TouchableOpacity>
//       ) : (
//         <TouchableOpacity onPress={handleStop}>
//           <Button>{labels?.finish || 'Finish'}</Button>
//         </TouchableOpacity>
//       )}
//     </View>
//   </View>
// )

// interface Props {
//     wrapperStyle?: StyleProp<ViewStyle>
//     style?: StyleProp<ViewStyle>
//     children?: any
//   }

//   const Button = ({ wrapperStyle, style, children, ...rest }: Props) => (
//     <View style={[styles.button, wrapperStyle]}>
//       <Text style={[styles.buttonText, style]} testID={'TourGuideButtonText'} {...rest}>
//         {children}
//       </Text>
//     </View>
//   )

//   export const Z_INDEX: number = 100
// export const MARGIN: number = 13
// export const OFFSET_WIDTH: number = 4

// interface IStyle {
//   container: ViewStyle
//   tooltip: ViewStyle
//   tooltipText: TextStyle
//   tooltipContainer: ViewStyle
//   button: ViewStyle
//   buttonText: TextStyle
//   bottomBar: ViewStyle
//   overlayContainer: ViewStyle
//   nonInteractionPlaceholder: ViewStyle
// }

// const styles =  StyleSheet.create<IStyle>({
//   container: {
//     position: 'absolute',
//     left: 0,
//     top: 0,
//     right: 0,
//     bottom: 0,
//     zIndex: Z_INDEX,
//   },
//   tooltip: {
//     position: 'absolute',
//     paddingHorizontal: 15,
//     overflow: 'hidden',
//     width: '100%',
//     borderRadius: 16,
//     paddingTop: 24,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingBottom: 16,
//     zIndex: Z_INDEX - 1,
//   },
//   nonInteractionPlaceholder: {
//     backgroundColor: 'transparent',
//     zIndex: Z_INDEX - 2,
//   },
//   tooltipText: {
//     textAlign: 'center',
//   },
//   tooltipContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'space-around',
//     width: '80%',
//   },
//   button: {
//     padding: 10,
//   },
//   buttonText: {
//     color: '#27ae60',
//   },
//   bottomBar: {
//     marginTop: 10,
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },
//   overlayContainer: {
//     position: 'absolute',
//     left: 0,
//     top: 0,
//     bottom: 0,
//     right: 0,
//   },
// })
