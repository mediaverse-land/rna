import { PROFILE_ONE } from '../../../constaints/images';

export type ListItemType = {
  id: number;
  imagePath: string;
  title: string;
  username: string;
  profileUri: string;
  isOwner: boolean;
};

export const mockDataListItem: ListItemType[] = [
  {
    id: 1,
    title: 'Нягтлан бодогч',
    username: 'Dianne Russell',
    profileUri: PROFILE_ONE,
    isOwner: true,
    imagePath:
      'https://s3-alpha-sig.figma.com/img/64ca/cbe0/c40914f4c327a1db870827a647c1af2b?Expires=1685318400&Signature=L6p7Vp6WAaBrIH0lANDuVajHKF~im1ty7-pZ9h0KU5OJPe4ga-oWOmMws-FyJ9n9NSIKqNt4YT-01uM9QfHT-0aahKZtX0ckbIV7oOuNQn6ScQlKluQ5B7NRu5ehvNk6pSX6t~FwAl7VO~wN1DaO1AV22VeGwPs1BTXmoFFNL-4NnX8oB7hr6WiJpJ0a~RHJ-URQfqdFg~fxBJF62GeRr80T~fqtAvQ4AgEiwkfYjevg9fsdhYZ2kPHvArGCKR9vozVzZlrowtHB4pmhrp1s1OW4J~fMVnr1eb~6mu0jmDSYZZK~hguS2CCVLSyfpKUJTQd~Nv2to5nZNPdyiqBa7Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    id: 2,
    title: 'нүүрний гажиг...',
    username: 'Dianne Russell',
    profileUri: PROFILE_ONE,
    isOwner: true,
    imagePath:
      'https://s3-alpha-sig.figma.com/img/05b1/2cab/cfd4f81dbebdaeda6907b62de13932ed?Expires=1685318400&Signature=jZpnBfiq1zBOmj4b5jP6wEk~48UvXq~mmN3MYet-oOefnXEHvjBIeblLCaDzAWZ2J39dKW47IDL7Q3Q09EHBKtlFqSy-E2drdYyd91xxBj1HtZyQZP3K-Kk3VkPVMTu98f1MdMnGTwMvSLUGLp5~O7OQKg9KUQWgBtiqCkwC95Waecy6BKHBVMHE9UPHoAVUujQWhoGf0i~1jit8Uu0CFPFPX3NmyQvZdk49Q~DxQ~Cbwz7CQ02oVczsppY8mouT10PlBOyq5-9vra0zdsMohvfy5JY7uHW1~Pbb9gbYbBP6G0~-D0BhUKKn-2G9a7y3BmKVM0Ly01liqpukJktZiA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    id: 3,
    title: 'нүүрний гажиг...',
    username: 'Dianne Russell',
    isOwner: false,
    profileUri: PROFILE_ONE,
    imagePath:
      'https://s3-alpha-sig.figma.com/img/7eaa/c0cd/3c6fded4851f0380510db06fd4a0d4a2?Expires=1685318400&Signature=e7mwbyLPV-7ptWH7SxJxM~zIcFzz~dd4ocaI51DTH18gSOHmyKo4qM8Nyvmkai4RIcfvFcmg6vpJnVXZsclL6X6YO6KK2nXI~g~gmaGg-epvxB4~wF2UlncG9AWsfGIrYbsZaOskM6W5TuRVi90UhGO-XYW2q4ZRwZW63ceEFwQQ05es72LD-tWXEFdkKdmaHLcDkAuvF36~dkHg9SSS7skjn464vONMuTsuPVqCMcG-eystM1GKBDseviZQEXlIireSOkXdg8MWyl1NzWF0t0guJ15OtQ~nrBl6B3BHwrsZtGDMGO77-RKss2Jz-B5lo2uX1uof4AV-Y4uYSv2jlw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    id: 4,
    title: 'Нягтлан бодогч',
    username: 'Dianne Russell',
    profileUri: PROFILE_ONE,
    isOwner: true,
    imagePath:
      'https://s3-alpha-sig.figma.com/img/64ca/cbe0/c40914f4c327a1db870827a647c1af2b?Expires=1685318400&Signature=L6p7Vp6WAaBrIH0lANDuVajHKF~im1ty7-pZ9h0KU5OJPe4ga-oWOmMws-FyJ9n9NSIKqNt4YT-01uM9QfHT-0aahKZtX0ckbIV7oOuNQn6ScQlKluQ5B7NRu5ehvNk6pSX6t~FwAl7VO~wN1DaO1AV22VeGwPs1BTXmoFFNL-4NnX8oB7hr6WiJpJ0a~RHJ-URQfqdFg~fxBJF62GeRr80T~fqtAvQ4AgEiwkfYjevg9fsdhYZ2kPHvArGCKR9vozVzZlrowtHB4pmhrp1s1OW4J~fMVnr1eb~6mu0jmDSYZZK~hguS2CCVLSyfpKUJTQd~Nv2to5nZNPdyiqBa7Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    id: 5,
    title: 'нүүрний гажиг...',
    username: 'Dianne Russell',
    profileUri: PROFILE_ONE,
    isOwner: true,
    imagePath:
      'https://s3-alpha-sig.figma.com/img/05b1/2cab/cfd4f81dbebdaeda6907b62de13932ed?Expires=1685318400&Signature=jZpnBfiq1zBOmj4b5jP6wEk~48UvXq~mmN3MYet-oOefnXEHvjBIeblLCaDzAWZ2J39dKW47IDL7Q3Q09EHBKtlFqSy-E2drdYyd91xxBj1HtZyQZP3K-Kk3VkPVMTu98f1MdMnGTwMvSLUGLp5~O7OQKg9KUQWgBtiqCkwC95Waecy6BKHBVMHE9UPHoAVUujQWhoGf0i~1jit8Uu0CFPFPX3NmyQvZdk49Q~DxQ~Cbwz7CQ02oVczsppY8mouT10PlBOyq5-9vra0zdsMohvfy5JY7uHW1~Pbb9gbYbBP6G0~-D0BhUKKn-2G9a7y3BmKVM0Ly01liqpukJktZiA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
  {
    id: 6,
    title: 'нүүрний гажиг...',
    username: 'Dianne Russell',
    profileUri: PROFILE_ONE,
    isOwner: false,
    imagePath:
      'https://s3-alpha-sig.figma.com/img/7eaa/c0cd/3c6fded4851f0380510db06fd4a0d4a2?Expires=1685318400&Signature=e7mwbyLPV-7ptWH7SxJxM~zIcFzz~dd4ocaI51DTH18gSOHmyKo4qM8Nyvmkai4RIcfvFcmg6vpJnVXZsclL6X6YO6KK2nXI~g~gmaGg-epvxB4~wF2UlncG9AWsfGIrYbsZaOskM6W5TuRVi90UhGO-XYW2q4ZRwZW63ceEFwQQ05es72LD-tWXEFdkKdmaHLcDkAuvF36~dkHg9SSS7skjn464vONMuTsuPVqCMcG-eystM1GKBDseviZQEXlIireSOkXdg8MWyl1NzWF0t0guJ15OtQ~nrBl6B3BHwrsZtGDMGO77-RKss2Jz-B5lo2uX1uof4AV-Y4uYSv2jlw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
  },
];
