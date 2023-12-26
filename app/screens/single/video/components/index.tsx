import { CommentsCard } from '../../components/comments';
import { CommentsModalComponent } from '../../components/comments-modal';
import { ToolbarWindow } from '../../components/toolbar-woindow';
import { FooterCard } from '../../text/components/footer-card';
import { VideoDescription } from './description';
import { VideoHeader } from './header';
import { VideoMetaData } from './meta-data';
import { VideoTitle } from './title';
import { VideoUsernameCard } from './username-card';

export const VideoScreenComponents: any = {
  Header: VideoHeader,
  Description: VideoDescription,
  Title: VideoTitle,
  MetaData: VideoMetaData,
  CommentsCard: CommentsCard,
  FooterCard: FooterCard,
  ToolbarWindow: ToolbarWindow,
  UsernameCard: VideoUsernameCard,
  CommentsBottomSheet: CommentsModalComponent
};
