import { useRtl } from '../../../hooks/use-rtl';
import { Box } from '../../../shared/components/box';
import { Text } from '../../../shared/components/text';
import { SingleVideoPageComponents } from '../style';

export type MetaDataType = {
    id: number;
    key: string;
    value: string;
};

const { VideoDataBox, VideoDataBoxLabel } = SingleVideoPageComponents;

export function SingleItemMetaData({ data }: { data: MetaDataType[] }) {
    const { isRtl } = useRtl();

    return (
        <Box
            marginTop={16}
            direction="row"
            justifyContent="space-between"
            flexWrap="wrap"
        >
            {data.map((video: MetaDataType) => (
                <VideoDataBox key={video.id}>
                    <VideoDataBoxLabel
                        style={[
                            !isRtl
                                ? {
                                      borderRightWidth: 1,
                                      borderRightColor: '#666680'
                                  }
                                : {
                                      borderLeftWidth: 1,
                                      borderLeftColor: '#666680',
                                      paddingLeft: 16
                                  }
                        ]}
                    >
                        {video.key}
                    </VideoDataBoxLabel>
                    <Box
                        direction="row"
                        flex={1}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Text color="#fff" fontSize={14} lineHeight={14}>
                            {video.value}
                        </Text>
                    </Box>
                </VideoDataBox>
            ))}
        </Box>
    );
}
