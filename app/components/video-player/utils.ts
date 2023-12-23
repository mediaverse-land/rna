import { AVPlaybackStatus } from 'expo-av';

export const videPlayerUtils = {
  getCurrenMilSec: async (videoPlayerRef: any) => {
    const position: AVPlaybackStatus | any = await videoPlayerRef?.current?.getStatusAsync();
    return (position?.positionMillis as number) || null;
  },
  pauseVide: async (videoPlayerRef: any) => {
    videoPlayerRef?.current?.pauseAsync();
  }
};
