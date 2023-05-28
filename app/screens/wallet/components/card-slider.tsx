import { ViewStyle } from "react-native";
import { Box } from "../../../shared/components/box";

export function CardSlider() {
    const rotates = ['-15deg', '-7.5deg', '0deg', '7.5deg', '15deg'];

    return (
        <Box
            marginTop={40}
            width='100%'
            flex={1}
            paddingBottom={100}
            direction="row"
            alignItems="center"
            justifyContent="center"
        >
            <Card rotate={rotates[0]}
                style={{
                    position: 'absolute',
                    top: 60,
                    left: '5%',
                    zIndex: 1,
                    width: 133,
                    height: 200,
                    backgroundColor: 'rgba(78, 78, 97, 0.2)'
                }}
            />
            <Card rotate={rotates[1]}
                style={{
                    position: 'absolute',
                    top: 25,
                    left: '10%',
                    zIndex: 2,
                    width: 183,
                    height: 275,
                    backgroundColor: 'rgba(78, 78, 97, 0.5)'
                }}
            />
            <Card rotate={rotates[2]}
                style={{
                    backgroundColor: '#eee',
                    position: 'relative',
                    zIndex: 10
                }}
            />
            <Card rotate={rotates[3]}
                style={{
                    position: 'absolute',
                    top: 25,
                    right: '10%',
                    zIndex: 2,
                    width: 183,
                    height: 275,
                    backgroundColor: 'rgba(78, 78, 97, 0.5)'
                }}
            />
            <Card rotate={rotates[4]}
                style={{
                    position: 'absolute',
                    top: 65,
                    right: '5%',
                    zIndex: 1,
                    width: 133,
                    height: 200,
                    backgroundColor: 'rgba(78, 78, 97, 0.2)'
                }}
            />
        </Box>
    )
}

function Card({ rotate, style }: { rotate: string, style: ViewStyle }) {
    return (
        <Box
            width={230}
            height={349}
            // hasBlackBorder
            borderRadius={16}
            additionalStyles={[
                {
                    transform: [
                        { rotate }
                    ]
                },
                style
            ]}
        >
        </Box>
    )
}