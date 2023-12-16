import { PROFILE_ONE, PROFILE_THREE, PROFILE_TWO, SOUND_ITEM } from '../../../../constaints/images';
import { HorizontailSlideType } from '../../../../components/horizontal-slider';

export const soundMockData = [
  {
    id: 1,
    title: 'Barcelona messi',
    description: 'messi in barcelona',
    userName: 'Julia Rabert',
    userAvatarPath:
      'https://s3-alpha-sig.figma.com/img/83d0/3fda/aeafecb9ecec22665790cbb050be9328?Expires=1683504000&Signature=Ty~1y8U-HW~cOGVcBTALhSYKsMkoRx01vTkEPWa-x9o-XsHKoUM4iDrTe3XigCyJtdskYU4d3tcmksMlHrnJ8emCl-OWByRqVUZpVYI8SKHeTIavWg3OGS2jGVVSGPrxo25QCUHTSTQzSLuUuCg3GDoJDZ-ZSpM~g1NJ9vkmUKIt6M76W5AXu3Sf-4adL6Xvefma3QHXFS7moxDBOEbY0PfafMqDBBD-efaz1qgLPk2azJTRSaGZHsJY4M6x8y~J5heFWumQQDP8RtqVqHpB~z2aBubm2u1oYC3ccYmZR4lgxMFa6BZy2YIt5XQOIHZp4C2lwmRvE7h5mofkd9q9Kg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    id: 2,
    title: 'How to shoot like messi!',
    description: 'messi in barcelona',
    userName: 'Toni suprano',
    userAvatarPath:
      'https://s3-alpha-sig.figma.com/img/8e55/0669/918328bfce67b30fed2d5de70150c6da?Expires=1683504000&Signature=MlJtBSbiKPgBqeLb2f-kWAxc1ULl6XTpwyGWL6kC6dc8OW-L-kxMUDCd3wBuHnwH1kX7jTWoyC4J0BU6SrWmbnBb29JId41BU2qjXT4ErX9LTk9Pza3c1BLp~BRNV4h89KGIJNSCHCHw8sjo-3AY~mx0aD2YfC1oayZcI7uJp~jEpitBAn4VwTW8Vcl545lrQCJ2WxM4YMupGIRWwBtycU8DLvj0zG9M0vul934zKUXPtFF5FFePRZOCErnGVgMrJYy~E~C2hGIV0UVQ-g6D1wJ4KSofosttDrDUKN~J4kujfDz0fwrRWFY2cnBIk5nl-ThhmDxMW6WD7i9X3WQ7Mg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
];

export const soundsMockData: HorizontailSlideType[] = [
  {
    id: 1,
    title: 'Tiger love...!',
    username: 'Devon Lane',
    thumbnailPath: SOUND_ITEM,
    profileUri: PROFILE_THREE,
    type: 3,
  },
  {
    id: 2,
    title: 'Colorfull lady...',
    username: 'Ralph Edwards',
    type: 3,
    thumbnailPath: SOUND_ITEM,
    profileUri: PROFILE_ONE,
  },
  {
    id: 3,
    title: 'Portrate with...',
    type: 3,
    username: 'Julia Rabert',
    thumbnailPath: SOUND_ITEM,
    profileUri: PROFILE_TWO,
  },
  {
    id: 5,
    title: 'How to shoot like messi!',
    type: 3,
    username: 'Toni suprano',
    thumbnailPath: SOUND_ITEM,
    profileUri: PROFILE_THREE,
  },
];
