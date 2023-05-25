import {
    DAILY_RECOMMENDED_IMG_ONE,
    DAILY_RECOMMENDED_IMG_THREE,
    DAILY_RECOMMENDED_IMG_TWO,
    PROFILE_ONE,
    PROFILE_THREE,
    PROFILE_TWO
} from '../../../../../constaints/images';
import { HorizontailSlideType } from '../../../../../shared/components/horizontal-slider';

export const bestIMonthVideosMockData: HorizontailSlideType[] = [
    {
        id: 1,
        title: 'Its raining.',
        username: 'Robert junior',
        thumbnailPath: DAILY_RECOMMENDED_IMG_ONE,
        profileUri: PROFILE_ONE,
        type: 'video'
    },
    {
        id: 2,
        title: 'Wedding m...',
        username: 'Ross',
        thumbnailPath: DAILY_RECOMMENDED_IMG_TWO,
        profileUri: PROFILE_TWO,
        type: 'video'
    },
    {
        id: 3,
        title: 'PAIN',
        username: 'Rayan jones',
        thumbnailPath: DAILY_RECOMMENDED_IMG_THREE,
        profileUri: PROFILE_THREE,
        type: 'video'
    }
];

export type VideoItem = {
    id: number;
    duration: string;
    username: string;
    userProfileUri: string;
    imagePath: string;
    title: string;
    description: string;
};

export const videosMockData: VideoItem[] = [
    {
        id: 1,
        duration: '50:41',
        username: 'Cameron Williamson',
        userProfileUri: PROFILE_ONE,
        imagePath:
            'https://s3-alpha-sig.figma.com/img/58e2/e23b/563b5f02c41d19d955aeb3f9981806f7?Expires=1685318400&Signature=OAjKbNX4~dyJmN6xogOBGTvPnj2GYE5XC9W37FwG9jickypNGSKzHqXgPaX9SYvc0sqOUhnOSMj6RPOHT-opca8qZQCLFEwvgIWYp2bkor58-KPBX9OgrDDLJ1mKNSfE-HDIBZAHAVJuiKUey1GoKN~0vcsGyQYBq2-sX~P64we5vKMVYZmmcVmLdl9fecrMN5-oSUHtpuGQCKg2eZ8v6O5gkImeDOxVu~K4yBgcGoxgaBwkREfPBOZMWaxEVLw24aeY0vKWzMsQglzzyCCH~NJA4ndyWyrLYTUW7RQ5c0KqTHsCllXCn~8vk4UjJ8K5YMoPnXAFfCjDVhfl7zWmcw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        title: 'euro news',
        description:
            'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia...'
    },
    {
        id: 2,
        duration: '42:28',
        username: 'Marvin McKinney',
        userProfileUri: PROFILE_TWO,
        imagePath:
            'https://s3-alpha-sig.figma.com/img/2909/7f28/684c3eb2ac3f5c67e9fd57fe1517a2b5?Expires=1685318400&Signature=JmxJlC~90hfWI3U3ojKuK5U5zsd0w2aoMKqBWtHiUheblIUWYvlhOEgcjA1~gGwvoxDoOJ47RrszGHmwVFthDxOiiGLj9jvra~5mh78fmkCj0K7CZFpnzz7Yp~EFox4miGHMZE8kZC41nzwWMsiXn7gkacpVu9zxhD6HIjPMq5S2OlrT5C08ToVyBJfq4oRLPvzoFFA01meBOEq2I89e4w0YhAf94kkaXHBMVokNeSn1kOYaa-p4uEvagvPk2jo-2aMedynJgps9es9KWv37V1cmXTfWqlYpHrHqARmPtKvbQgSiumycK9kdystQYZpDv4KSg8y1MURFHLT9eDxt5g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        title: 'SNL chan...',
        description:
            'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia...'
    },
    {
        id: 3,
        duration: '10:24',
        username: 'Jacob Jones',
        userProfileUri: PROFILE_THREE,
        imagePath:
            'https://s3-alpha-sig.figma.com/img/c3a8/72f5/32cb59e6021e3f8836ef6d7ace7ffb31?Expires=1685318400&Signature=AH3PTsOkwuaUSvFpyjDjhRZ5Y0LViVXvwkFIA6YuOLZuxl9FUatKZ7KSQ3wIcSnqzPmBxe1MTYN2d~ZXlui~2l04CqxcxSzqVloliOf4~vj9elKlpvEjizXFe2itTaHEJsTQZoTsq5Rz4TiSxQ1bdvWSYtMctDvLI6OBikUKrxtPEHfcRUH-jScDvt3hVjjeciuCKN3o0a4COZZuu6acfYOQlxA5EtC1Jw-nMZYB-TiqcUSzDltVyaAirT9BguBkVr8y17zL9SpEMcmrzDMONESMj-Z9TQBc7RmAliD8b~DoMIiH5tW~ZwZhoLEZuLGjhPnxmDZ-tjTgDo8qyJx1Qg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        title: '24 France',
        description:
            'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia...'
    }
];

export const videosAnimationMockData = [
    {
        id: 1,
        path: 'https://s3-alpha-sig.figma.com/img/2758/e6ef/1d401f98af01a64c5db0a8139c966d9a?Expires=1683504000&Signature=ZWznVk76Vk3J6VLlKq~eDHrZKB8bpRSK85jZS1H5hEJe00lr825oQBSGMs3SNk2Coyvp~G9l6bJEzlW2J~Ocz8l835DfJmuCShwTLcP1ZDaM6Cm7SMjV7dqaxvy-yp~Y0wOrRbh8GYowzz00ou2SQefpWTAwxUd~X64mDKVfAQRT6UUCNZAYhkVS-QRq~4kwTVEIMfsgvhAIy6OKFzCe9KPbtE1fmV1nLqFN0Q9sprd7Zj2G1jHl44RhWxcNdWrumNfSWQ0Jy~upT9NRFpx94IlOUqiITafFebiosS5Pj8JwZiZX8kDBSXreKOkLfgHjXrd~hiBwZJAmD03X4fmQ8Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
    },
    {
        id: 2,
        path: 'https://s3-alpha-sig.figma.com/img/0842/136e/8b6b1f3b61525bfd85408aab5532a2e2?Expires=1683504000&Signature=cwtZtozMtzQf0lItsMbFby-Co~Ho19eiwFVX25jaWXOD4OtWPJJ1ky7gMgKAKa5sCg8l0dsXPxyDVb56oC1pDlCcNdyBHKNx9ZyLkhjaiP16glMOSNcC3~l4fhX4OE0XQJNqPN0WEI2S9aFy9DE9ru11LI2mw01vH~sGq6OlEn0W7k02R0R~lVOcfGlKF9SKJ7ATvT5vCjd5j15BMZ-2reSrtxBQxh2CIbxYjrlUHycdR3-YLmUTdLqRu6VLncUfRC-u2CbN4chkT9IOwu3o4ZOPk2mdt21QCkK4u0T3FAjMoxuAIzXEdudiXLh4pZO7G-DVAO47fmQA576LmuTieg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
    },
    {
        id: 3,
        path: 'https://s3-alpha-sig.figma.com/img/51d2/57d2/d22dfb5f216fa9fdd2d0e5450031bc9f?Expires=1683504000&Signature=iSH~wv67AwGP1tNaVnHuNPgzHWiQJbp2EGlIEl94yAsyUlagCe6TbpG5m5FLk9sb2cVLEgCmqo9tZCTTZ5sa9VGR5cglxAuszkkA~wKTzG8zECEX2tQefEpXxZtvmtN6zOkIfBd7Qs-skdrVsUWNzMy3kipHoC-rkm6JZrQqBILhQuDya42C0ZrL0nCojiBe-s8DwbOc3u2SnSoB9dJv2CZMxccyg3HOR~JNstcof3Ilg53u-emsjHg49NeHNQnClX982vIOweBshxLF1hK9bxTPLaqSeiKl~Q2kjJn1DRELUCoG1FgnQ~ZvmubJ5ycJDRbLPhyWSQ5UFkgIQzL1Iw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
    },
    {
        id: 4,
        path: 'https://s3-alpha-sig.figma.com/img/c94d/b51d/3038fe487898b18ca075f6c3104f5277?Expires=1683504000&Signature=Fs2bxUraYof0Bbz6zS8sDbalOglmBZhuftYsytI4OwrcVjaM-9fzPNbUwr32dBIWt~ScL3q2yGjcED0LXk3QJpMKVRI~7QivCOryOrEwtTxHlcIV9vc6OAg1EJ0bE0nsExu47~99Gxc1~KINmuW78yOU~yEiamP0l~FC~dOBrpamuPynEHElvGF1pnHTtjd1w1uiBrJq94x84Ucch1iHCnkouAmrZV~rGr5FAEIcq3PWHjeKlq654EFTbPwe4q4nwc7kqfovZhNpvgR-94Vjsras4wc7hmHyeWSADd~jU9WCXCJ5xZuBIZDKu9wiVKcppnBefQpt4iEyN2PN5fYopg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
    },
    {
        id: 5,
        path: 'https://s3-alpha-sig.figma.com/img/ad5c/47e3/d3c8d1fd55378fca0950d010aae412fd?Expires=1683504000&Signature=A5F4iJ~rrbj2kEeQqMMIyjrXVY~jDV-TA4ZNu7bl1b5iD80OmpZWmP~~KcPz719r9vG4DfI7~ykyR~iie1sWzg2ZJCVJoINRwpalYLeppHuH-2pLqDDQtevokHMh02RJiHeUjiur2IVNSVr-KbO5o07W4V7lEeiNts6wDqD08xgo4Dx0ga7Kx3Z70FZR3s3ZMpma74P-OhRvNyfpfhBhf3DOT99~rE1FQSFPS0-WKJ7QccIcneWCPuYHtn0uZhOhWOV10aSH9CmeHg~u6dUbnifLtsFJpJZvVNBHSpS2HMzbXhryUGOSKdWDq3biKorQR966s8u9qtFl5gc-cG2vQg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
    },
    {
        id: 6,
        path: 'https://s3-alpha-sig.figma.com/img/5ef5/e43b/1b04c5403b5dc97f6d237aaf72874ce8?Expires=1683504000&Signature=AvkdYD~66gaJvwsQDSwyADHjtG1B0c~NEq34lPhn0B3zu6qz2kofW7J5R3KEnNSunBPbrDwaRYPO5QRwKt5RxFjGD4CY660xoD~WpB3kjYRiIOA5VTxtoNWr1DXu2TV3wLIp5YACQ8iiURHuBtULrA1D0GDkLuTHw12fZW5AOD3tSmqkbpeoNwZgQhFxBFY8-jUf4ASY~gShb1ou0Bi6lO5xntWcIH3AweN0eGyWfPohBMW6L3mZV7zRLAZjCgqONJLXcQ0i3M0NZi87Cs7Ox1fN4weQQl2I3EQjnGVPkSFTqRAtFsknqe7QQi5RId5Mo0~mIqm5pqTo3MLumCQz6w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
    }
];

export const moviesMockData = [
    {
        id: 1,
        path: 'https://s3-alpha-sig.figma.com/img/2249/5d3c/79b21efc2f3795ac82a04dc8c4506a24?Expires=1683504000&Signature=WDgmyoJJkR3cEJaoAUYgaKVqEkbA1YuT3dB~re0pDtN9o--yHhqmjmtS2nyxz0FfRG2~38BWsmS6ejY83ZWqaD3Hn63lysJ~U70B5zAH2MVQUAiIvwCwpD0HNJ9RlccCYI--vdeYK8qKp3tYv24e9~TJ0nGGYgOlDPJfqgjerdJwO0vN3bYqYS5CLMM2Qwo7Hd3DQmHG46tqHy0-2i7bos6yHY8VN0Djz0exQ42YugidUo1R8fbclLrqX9qDho~fwiYQnAsfZ5yKoHllre6nFUZXlH7OWIbnKkCMIXhTEa1B1vmHQH--C4JvMgzvC74WMuA9~sZE8FSv-v-8bbuRUA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        width: 1,
        height: 1
    },
    {
        id: 2,
        path: 'https://s3-alpha-sig.figma.com/img/d465/638d/46b4b0fbb68017bf0148c3e2b6256de2?Expires=1683504000&Signature=kd61WIPd99GxiUlM6ft-ypzB7p5dQ2XdWphnU4qGtTGCme8FTmq1zvPKqjCk79~02RAFMFjUYnGEOAd~YrlQS1qfrUIquV4EieDDNNXt2o4Waxz~Y7JqbalPGtr3Jf795s05h7dU-fb3ckKGkF9PSSjxuzF0A9AscqCwmy4ECJy~jhjibZPA6LItd5ln89MEF6HQ8Y9tnCuUtfjDZH6YLq8o8jbwFwkCxFMRKO2dxzfs0Mow-ILtoxGH9JJOUFQWad7k5Gbf1j7bRaYrYdiPuElKhwuQsfS5mmBi1MnsDQMHcdtrQyEY3QOOyOT8A0FP~T7dn9OMylxaN3UctIK7aQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        width: 2,
        height: 2
    },
    {
        id: 3,
        path: 'https://s3-alpha-sig.figma.com/img/48e2/d76b/61b0c22b4d69510bbcd5a93a437bd1a0?Expires=1683504000&Signature=kTmgZkYU-8ZeV538aAMgXxIfaRGd2dHljW~vA1~C97fihM4DlX6p-KPcia~R9Efue2t1zuFE1GhrUel4lNOzKIeMGqY3ERHqbKSMPX8VAATrVUvrzzUCMiHlRH4lszVMjf-WjIWZfC-NQ75U8mCarJDIDKYocSa6Hacc546vbpAKTsQQlqYwVGsIqRgNaJHC0Ms~KmI8JvL~N~Bw6gN1kB6xAtz2APHuH1X7NBIvNwbMIrGUuRKMqPgCa0KIU0JhdCPd4ch0mNmuO9EL211DmM~qPXd6lBXH4rdoWn3Niw9ayxS26Y4DORq4ca2W9d0QbTy-35ogBh1RTUICz-cnpA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        width: 1,
        height: 1
    },
    {
        id: 4,
        path: 'https://s3-alpha-sig.figma.com/img/261f/37fa/ef267e1b40fc48dd9ed954e7088011fd?Expires=1683504000&Signature=V6Ank5ay8H3GkQccPDaF5904Gt7JPlUKdEG2pg9jP3xB9F9UyhN-z69bX~7uUajBGnJDgQIUTVGZ2H2~n25y5C8cYJ4J9ED9agdk6umNH-651xqlMRcw8a6z0dTkLzX4M5N4mKWrmZ4HSenXjayTp2R7ER8jue0mQFR8gkBK4oN-EkaPvJXks1kUTbIfR8wI3H2HAhcu9uRvwCMX0hpSdgpMH8IWAV6zeA6EamvDEqSIoSQPRRIuIYSjhFIdOua9sLqXs9IQyssU~tfqbzGQ2exx3Jr6-LEkTh4-0bjo~fVpTXVK~LDfnXSyB5vmFe0UesUPuGuhsIPvOwG1ckJixA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        width: 1,
        height: 1
    },
    {
        id: 5,
        path: 'https://s3-alpha-sig.figma.com/img/a9c0/6549/2a33a98c78280d43a4a39efd4feb9345?Expires=1683504000&Signature=DqcVG~kJj3u7YD9n0A3n~3lUfebP5xh0EwW7WjB2Uv4WeyoQKIunw6x-5SsOOQeLsXxmBLI34vpF6xxHskoNePlju5-LpdN2hL8PZFbZ69IznkFGPa5946gdut-LZP4PfJj9zPn-A0uvyD8bgWF6aWx5TDB5~3dl2fMR7dJE~duWZW2xCKrN3m11Lu33Hr9hxy-gEQVQGWiNqkVDbIDTyj0EM2k3wNbGE9zlDAAWCIDOWP0xJ8416V2kvTmrvXooDUUx-~ENSPpOELsZzEVzplxyDibW1lsCjS323xklRZoJ6f~VdBwg9okaEuLqtulnzOSA6MeP275w5W6ZU0~BCw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        width: 1,
        height: 1
    },
    {
        id: 6,
        path: 'https://s3-alpha-sig.figma.com/img/bb5c/e717/78991730c9f5dacf6e60388700647d9b?Expires=1683504000&Signature=Ej7uxLnCZMzPkDzAOKQIMdvWqGgRfEG0Z22LogY25EixQCgJXJr000lT3BYDysvAxK29AOfaDTaIx0x9ebbMv2kbXgsFJCt97ghgI8M7dTRwucoIMbB8KH7WwpSgPk06ykV4I1JMkRxbmywqbTWp9VGiZ-uHWZ2s9N-4O9dU8w-2E0BxOAYAStQ-HiN8VuVll~hI53O-2kOE~8m2Kjcg9aNeLClnKqCokqLgl6Q9jwff8NKyFF9l4qhye5hMRoOCHZGgy~rh33ObNBjdSlt544I4vBGz-Nx0jMLT-g9A7Gu4R3Blasz4lc3h-48C5jQth3RRaIQA0dZlxzP1rEFOdQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        width: 2,
        height: 1
    },
    {
        id: 7,
        path: 'https://s3-alpha-sig.figma.com/img/6757/23e0/fd9a742d59e17d07d2c87f9f1dcf3119?Expires=1683504000&Signature=q7HbUqNAwK6mbskSOFqS2sYoLP78c2C2tLfjTta2MSyJ1TuxEsAXxg4ATGVoU9e-VpqAEPAUoJ6Mm6Vbh5-PBaEjVpJwE3xJKmWeAytTyvQqIaV57w5hSjpZvvtBkQPa7GN74OnN2CL-8qB5sa0cVX1qV41pqTy6iVx8crMXjCtbmKtgEULQW9KE4yvsjK~f-PTvgFLZE9ckCbxabjNSMG-OefsdFHaK2wHedK8d-4aAqAiRwm4mP0wa~r2J2dzmE4UdZH70PpDdqPsMZqO8FlWuFji0C0ULmN3igKGVTvIkrOwojYAGLFyk-36w9plaP2~Tgs~pCw1CuTTdHKhjhg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        width: 1,
        height: 1
    },
    {
        id: 8,
        path: 'https://www.figma.com/file/PjruT7z5jL7KsoUn0tQadE/image/8db8097cbee0506f55f68911136929318cbded6c?fuid=843972259226061773',
        width: 1,
        height: 1
    }
];
