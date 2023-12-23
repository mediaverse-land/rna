import { CommentsCard } from '../../components/comments';
import { ConvertTextToAudioModal } from './convert-text-to-audio-moda';
import ConvertTextToTextModal from './convert-text-to-text-modal';
import { Description } from './description';
import { FooterCard } from './footer-card';
import { GoogleDriveShareBottomSheet } from './googledrive-share-modal';
import { Header } from './header';
import { MetaData } from './meta-data';
import SelectLanguage from './select-language';
import { ToolbarWindow } from '../../components/toolbar-woindow';
import { YoutubeShareBottomSheet } from './youtube-share-modal';

export const SingleTextComponents = {
  Header: Header,
  Description: Description,
  MetaData: MetaData,
  CommentsCard: CommentsCard,
  FooterCard: FooterCard,
  ToolbarWindow: ToolbarWindow,
  ConvertTextToTextModal: ConvertTextToTextModal,
  SelectLanguageModal: SelectLanguage,
  YoutubeShareBottomSheet: YoutubeShareBottomSheet,
  GoogleDriveShareBottomSheet: GoogleDriveShareBottomSheet,
  ConvertTextToAudioModal: ConvertTextToAudioModal,
};
