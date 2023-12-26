import { CommentsCard } from '../../components/comments';
import { ToolbarWindow } from '../../components/toolbar-woindow';
import { FooterCard } from '../../text/components/footer-card';
import { YoutubeShareBottomSheet } from '../../text/components/youtube-share-modal';
import { ImageDescription } from './description';
import { ImageHeader } from './header';
import { ImageMetaData } from './meta-data';
import { ImageTitle } from './title';
import { ImageUsernameCard } from './username-card';

export const ImageComponents = {
  Header: ImageHeader,
  Title: ImageTitle,
  Description: ImageDescription,
  UsernameCard: ImageUsernameCard,

  MetaData: ImageMetaData,
  
  YoutubeShareBottomSheet: YoutubeShareBottomSheet,
  
  ToolbarWindow: ToolbarWindow,
  CommentsCard: CommentsCard,
  FooterCard: FooterCard,
};
