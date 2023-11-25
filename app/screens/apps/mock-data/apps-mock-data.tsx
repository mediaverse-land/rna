import { CHANNEL_MANAGEMENT_SCREEN } from "../../../constaints/consts";
import {
  AI_AND_PRODUCTION,
  CG_PLAYOUT,
  CHANNLE_MANAGEMENT,
  CONTROL_ROM,
  MEDIA_SUIT,
  STUDIO,
} from "../../../constaints/icons";

export type AppItemType = {
  id: number;
  imagePath: any;
  title: string;
  category: string;
  isDisable?: boolean;
  screenName?: string
};

export const appItemListMockData: AppItemType[] = [
  // {
  //   id: 1,
  //   title: "Media Suite",
  //   category: "Video edit & Share",
  //   isDisable: true,
  //   imagePath: <MEDIA_SUIT />,
  // },
  {
    id: 2,
    title: "Channel Management",
    category: "Video edit & Share",
    isDisable: true,
    imagePath: <CHANNLE_MANAGEMENT />,
    screenName: CHANNEL_MANAGEMENT_SCREEN
  },
  {
    id: 3,
    title: "Control Room",
    category: "Share",
    isDisable: true,
    imagePath: <CONTROL_ROM />,
  },
  // {
  //   id: 4,
  //   title: "Studio",
  //   category: "Sound Edit",
  //   isDisable: true,
  //   imagePath: <STUDIO />,
  // },
  // {
  //   id: 5,
  //   title: "CG & Playout",
  //   category: "Video edit",
  //   isDisable: true,
  //   imagePath: <CG_PLAYOUT />,
  // },
  // {
  //   id: 6,
  //   title: "AI & Production",
  //   category: "Image & video edit",
  //   isDisable: true,
  //   imagePath: <AI_AND_PRODUCTION />,
  // },
];
