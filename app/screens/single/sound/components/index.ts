import { CommentsCard } from '../../components/comments';
import { ToolbarWindow } from '../../components/toolbar-woindow';
import { TranalateView } from '../../components/translate-view';
import { FooterCard } from '../../text/components/footer-card';
import SelectLanguage from '../../text/components/select-language';
import { YoutubeShareBottomSheet } from '../../text/components/youtube-share-modal';
import { SoundDescription } from './description';
import { SoundHeader } from './header';
import { SoundMetaData } from './meta-data';
import MusicPlayer from './player';
import { SoundTitle } from './title';
import { SoundUsernameCard } from './username-card';

export const SoundComponents = {
  Header: SoundHeader,
  Title: SoundTitle,
  UsernameCard: SoundUsernameCard,
  MusicPlayer: MusicPlayer,
  ToolbarWindow: ToolbarWindow,
  FooterCard: FooterCard,
  Description: SoundDescription,
  MetaData: SoundMetaData,
  CommentsCard: CommentsCard,
  YoutubeShareBottomSheet: YoutubeShareBottomSheet,
  TranslateView: TranalateView,
  SelectLanguageModal: SelectLanguage,
};
