import { Image } from 'react-native'
import { Box } from "../../../shared/components/box";
import { SINGLE_VIDEO_FOOTER_GRAIDENT } from '../../../constaints/images';

export function Footer() {
    return (
        <Box width='100%' height={240} >
            <Image
                source={{
                    uri: SINGLE_VIDEO_FOOTER_GRAIDENT
                }}
                style={{
                    width: '100%',
                    height: 240,
                    position: 'absolute',
                    top: 0,
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16
                }}
            />
        </Box>
    )
}