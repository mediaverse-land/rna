import { VideosPageComponents } from './style';
import { LiveVideos } from './live-videos';
import { AnimationVideos } from './animations';

export function VideosPage() {
    return (
        <>
            <VideosPageComponents.Container>
                <LiveVideos />
                <AnimationVideos />
            </VideosPageComponents.Container>
        </>
    );
}
