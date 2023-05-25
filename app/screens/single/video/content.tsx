import { Box } from "../../../shared/components/box";
import { PaddingContainer } from "../../../styles/grid";
import { VideoData, VideoDataType } from "./components/video-data";
import { VideoDescription } from "./components/description";
import { VideoUsernameAndDuration } from "./components/username-and-duration";
import { PROFILE_ONE } from "../../../constaints/images";
import { VideoFileType, VideoFiles } from "./components/files";

const description = 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat. '
const username = 'Ralph Edwards'
const duration = '8:15'

const videoData: VideoDataType[] = [
    {
        id: 1,
        key: 'Genre',
        value: 'Sci-fi'
    },
    {
        id: 2,
        key: 'Type',
        value: 'Clip'
    },
    {
        id: 3,
        key: 'Lanuage',
        value: 'En'
    }
]

const videoFiles: VideoFileType[] = [
    {
        id: 1,
        chapterName: 'Chapter 01',
        duration: '10:14',
    },
    {
        id: 2,
        chapterName: 'Chapter 02',
        duration: '12:64',
    },
    {
        id: 3,
        chapterName: 'Chapter 03',
        duration: '56:20',
    },
    {
        id: 4,
        chapterName: 'Chapter 04',
        duration: '1:14:58',
    },
    {
        id: 5,
        chapterName: 'Chapter 05',
        duration: '36:04',
    },
]

/**
 * 
 * @returns content component including, video description, username, video data and video files
*/
export function SingleVideoContent() {
    return (
        <PaddingContainer>
            <Box width='100%' marginTop={16}>
                {/* description */}
                <VideoDescription
                    description={description}
                />
                <VideoUsernameAndDuration
                    username={username}
                    profileUri={PROFILE_ONE}
                    duration={duration}
                />
                <VideoData
                    data={videoData}
                />
                <VideoFiles data={videoFiles} />
            </Box>
        </PaddingContainer>
    )
}