import { ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG, ICON_TOP_TABBAR_SOUND_ACTIVE_SVG, ICON_TOP_TABBAR_TEXT_ACTIVE_SVG, ICON_TOP_TABBAR_VIDEO_ACTIVE_SVG } from "../../constaints/icons";
import ViewAllImageList from "./components/image-list";
import ViewAllSoundList from "./components/sound-list";
import ViewAllTextsList from "./components/texts-list";
import ViewAllVideoList from "./components/video-list";
import { viewAllStyles } from "./styles";

export const viewAllPages: Record<
  string,
  {
    icon: any;
    title: string;
    url?: string;
    ListComponent?: any;
  }
> = {
  VIEW_ALL_LIVE_CHANNELS: {
    icon: null,
    title: "",
  },
  BEST_VIDEOS: {
    icon: (
      <ICON_TOP_TABBAR_VIDEO_ACTIVE_SVG
        width={16}
        height={16}
        style={viewAllStyles.icon}
      />
    ),
    title: "Best Videos",
    url: "videos/most-viewed",
    ListComponent: ViewAllVideoList,
  },
  MOST_VIEWD_IMAGES: {
    icon: (
      <ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG
        width={16}
        height={16}
        style={viewAllStyles.icon}
      />
    ),
    title: "Most viewed",
    url: "images/most-viewed",
    ListComponent: ViewAllImageList,
  },
  TOP_TEXTS: {
    icon: (
      <ICON_TOP_TABBAR_TEXT_ACTIVE_SVG
        width={16}
        height={16}
        style={viewAllStyles.icon}
      />
    ),
    title: "Top texts",
    url: "texts/daily-recommended",
    ListComponent: ViewAllTextsList,
  },
  BEST_SONGS: {
    icon: (
      <ICON_TOP_TABBAR_SOUND_ACTIVE_SVG
        width={16}
        height={16}
        style={viewAllStyles.icon}
      />
    ),
    title: "Best songs",
    url: "audios/daily-recommended",
    ListComponent: ViewAllSoundList,
  },
  BEST_IN_MONTH_IMAGES: {
    icon: (
      <ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG
        width={16}
        height={16}
        style={viewAllStyles.icon}
      />
    ),
    title: "Best in month",
    url: "audios/daily-recommended",
    ListComponent: ViewAllImageList,
  },
  RECENTLY_IMAGES: {
    icon: (
      <ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG
        width={16}
        height={16}
        style={viewAllStyles.icon}
      />
    ),
    title: "Recently images",
    url: "images",
    ListComponent: ViewAllImageList,
  },
  RECENTLY_VIDEOS: {
    icon: (
      <ICON_TOP_TABBAR_VIDEO_ACTIVE_SVG
        width={16}
        height={16}
        style={viewAllStyles.icon}
      />
    ),
    title: "Recently videos",
    url: "videos",
    ListComponent: ViewAllVideoList,
  },
  RECENTLY_SOUNDS: {
    icon: (
      <ICON_TOP_TABBAR_SOUND_ACTIVE_SVG
        width={16}
        height={16}
        style={viewAllStyles.icon}
      />
    ),
    title: "Recently sounds",
    url: "audios",
    ListComponent: ViewAllSoundList,
  },
  RECENTLY_TEXTS: {
    icon: (
      <ICON_TOP_TABBAR_TEXT_ACTIVE_SVG
        width={16}
        height={16}
        style={viewAllStyles.icon}
      />
    ),
    title: "Recently texts",
    url: "texts",
    ListComponent: ViewAllTextsList,
  },
};