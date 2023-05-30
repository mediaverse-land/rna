export type AppItemType = {
    id: number;
    imagePath: string;
    title: string;
    category: string;
};

export const appItemListMockData: AppItemType[] = [
    {
        id: 1,
        title: 'Instagram',
        category: 'Video edit & Share',
        imagePath:
            'https://s3-alpha-sig.figma.com/img/fcd0/a8a1/dbc9ee1d3837cb961a92bba5c191d51f?Expires=1685318400&Signature=k7ZhMB-pgiqpn86VsJbA3lO109ZuFo8t8hLGRERj5homc0l6OgtDINSLnngm9eoIVjHFfqx6SfdkrZaZHj1Wi-MY~GfVEzemdeDsLv8wT13z3jhVhdyyyVzYeKuPcNOB1B6h7UmT66CRRcbvJLJoJ-URxhHxEW4j9cPnZfqaWGBfrh4CSr~Ag29P7sXXja2c3kcDlFeWtRVwum8MI0d4pMJrXLilOp9Zu3DJaKN3o~BBy1EL0BpSEBI2Boyly19ahgnmlVyRJNNRUJ8RH2KOCqoWaqjWkbl2eiXOUS2A114OfXY4kJWx9w3Omxbg1bHb6Y8vLOj~S9tiBZoXfjpQKQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
    },
    {
        id: 2,
        title: 'Tik Tok',
        category: 'Video edit & Share',
        imagePath:
            'https://s3-alpha-sig.figma.com/img/0890/7030/ff42a8e50d34ff3908933f1480bdd486?Expires=1685318400&Signature=DqhNwo8doc-0f~8ttg5xvMnz4KPA3viJE5upYtnAsvHFxLOrDsO5IpuK7SFpQ0V0syKncZK6xUg2h46NxpGP~iLWvFJY-jot-GJkKfbGgdVG2lJI9sTehcYJodq9LMnF7SJYoTIohWQhStMXmkRDCvVAbsBlR4yI8q5zhoEWRIDZzQq8xmikan0FPilMSRCCc9aGsZCycRpfzm9PF9xpu1unX3tcfmHIloXbBH7CSdCzaDKbd--NNchA-ifYQknT37MYr6p~5oW5faI2-aGJBZkNF6r50VsZn9~Yb2HH6vswNWnwp~uxMCinK2VOvx1PYbKkYd-0co8l79l7E9Ozxg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
    },
    {
        id: 3,
        title: 'Pinterest',
        category: 'Share',
        imagePath:
            'https://s3-alpha-sig.figma.com/img/3a84/4b3c/d28e0339284709b10372496e548453c6?Expires=1685318400&Signature=jNCucO7kCgXMzImuxXazmm1xwxcLT0E2yu4uzZ3EWBGTylY67FPC0rZqxPMnfwILUs3g4l96Jt9PVB0dYA7Qj8WE64Y1IciNJ9CJ8T6BypNmsWw7B3o9rHGRLYtbGkLMj0m9wQAp48xnuox~XZ4vm8pwZdFdZb1dNkGxRl31II9TTujvpbvi~ugt4htuM4XO-YpVmPiKIVj4PHPBvp42qDmk55lwYmCJWi0Sq~YWABTbW0wVBEwV2Mhk4pFdnjOubzjmvIiAJQdhZACYBcoP5ivKOnGCNRm4eT9yUH0dV202Y3HkJL1zWsKCvjoselQrIFK06ROcWl9LyQ-ifFB-FA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
    },
    {
        id: 4,
        title: 'Moana',
        category: 'Sound Edit',
        imagePath:
            'https://s3-alpha-sig.figma.com/img/d6c7/5398/79522949c11c153a4a18c0df245cff61?Expires=1685318400&Signature=SeKyE78OZb2l0l7bqp5K2pn3B1UMeypvYCT4vH9WSfv06DnZg57kvKJNRbnCRo5icxEtGPWNimqVbN5qY8jRhnN6uE89I2JOU1nsufs9CUvmcG43Xl1yehWOKpK7wVUiNraXWwNRAeG-0rP8Y7p3~9j1yQShBOsAmmekBecRi-qCIlI6c~B86O-BSUKan9JuKgSrexcduf8PLo9hAcnckEHLn-gA5d9WVu6PVM9m9Ge-4psUxOVMzZN9ee10nV2uwOM~fSf2dKbOxEtpq3YNUr6zfMPeWyo3RUMI9-bdOquxr7DOLcM9x48KS4wmeJzHcO9FbIWX7N3EYwHvFWb7LA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
    },
    {
        id: 5,
        title: 'Vistar',
        category: 'Video edit',
        imagePath:
            'https://s3-alpha-sig.figma.com/img/8aeb/1c9d/395af35ecd6226a9ad2d446e03dc53a7?Expires=1685318400&Signature=R2bFETJptiai3cy6VAlCms57l9JY0Rn6jfgJg0RlhU5LAzi9BhDqnj-JmYSr7wt4E1TmxeDfZM-Zo5JuJlVPFKgn7piI3ZHEvY-inpn31lUSUPfyCeKkr4kmpnUNCKeUcTCH0RV66xPD5NxUx-ARUicRvvm4iC5Ly9dyW~qhCMWPPNk4GUMczCdHWwNQzMNDOAQGg6XF4cv1bxIkbFt1M610yvn-Hlmj4-5YCtl-9oCit38TS0WwVZscoPbnkvld4bcTRzTTirH2uFKKFGooCIkh9Ql0gPnYy-yxNVIDQyZiLz9j-q5sTCrtTxVGRS-hQeELsPHEjxh4XqbXzYT8MQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
    },
    {
        id: 6,
        title: 'Nomo cam',
        category: 'Image & video edit',
        imagePath:
            'https://s3-alpha-sig.figma.com/img/41ab/ebfe/c475e35b8e3a835cde28e606bef46c8b?Expires=1685318400&Signature=bvrvvrEmXGJt9hal9vio23FN-qa6TquKI15PxLOZzynFCAequSF9bpFb78sAzU0XatxzCQFNQbwHtEjlElGlbg5HZnFvnl0NV7~GCDE5K3trLxqETLVKbf9fdrM7wUXMG5pcOEkTtYq7BCxlytCkJqdmceOehBEjY4uDWBevqvBrj38sjuoG7RHqCAQND1iX29I9~kHfnCYmLZfKofuTgqJCc7w2OjVODGPnRep07NET11SDNmiV9fdgztOJCbmZDJCMysDcuJLHrQEQXb~5Kiyh2S4GKVkfl4PCz97RPRU5lXywTcfKo0nL7URqs3qVwBxi57fNlaezBT1MMdMxWg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
    },
    {
        id: 7,
        title: 'Instagram',
        category: 'Video edit & Share',
        imagePath:
            'https://s3-alpha-sig.figma.com/img/fcd0/a8a1/dbc9ee1d3837cb961a92bba5c191d51f?Expires=1685318400&Signature=k7ZhMB-pgiqpn86VsJbA3lO109ZuFo8t8hLGRERj5homc0l6OgtDINSLnngm9eoIVjHFfqx6SfdkrZaZHj1Wi-MY~GfVEzemdeDsLv8wT13z3jhVhdyyyVzYeKuPcNOB1B6h7UmT66CRRcbvJLJoJ-URxhHxEW4j9cPnZfqaWGBfrh4CSr~Ag29P7sXXja2c3kcDlFeWtRVwum8MI0d4pMJrXLilOp9Zu3DJaKN3o~BBy1EL0BpSEBI2Boyly19ahgnmlVyRJNNRUJ8RH2KOCqoWaqjWkbl2eiXOUS2A114OfXY4kJWx9w3Omxbg1bHb6Y8vLOj~S9tiBZoXfjpQKQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
    },
    {
        id: 8,
        title: 'Tik Tok',
        category: 'Video edit & Share',
        imagePath:
            'https://s3-alpha-sig.figma.com/img/0890/7030/ff42a8e50d34ff3908933f1480bdd486?Expires=1685318400&Signature=DqhNwo8doc-0f~8ttg5xvMnz4KPA3viJE5upYtnAsvHFxLOrDsO5IpuK7SFpQ0V0syKncZK6xUg2h46NxpGP~iLWvFJY-jot-GJkKfbGgdVG2lJI9sTehcYJodq9LMnF7SJYoTIohWQhStMXmkRDCvVAbsBlR4yI8q5zhoEWRIDZzQq8xmikan0FPilMSRCCc9aGsZCycRpfzm9PF9xpu1unX3tcfmHIloXbBH7CSdCzaDKbd--NNchA-ifYQknT37MYr6p~5oW5faI2-aGJBZkNF6r50VsZn9~Yb2HH6vswNWnwp~uxMCinK2VOvx1PYbKkYd-0co8l79l7E9Ozxg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
    },
    {
        id: 9,
        title: 'Pinterest',
        category: 'Share',
        imagePath:
            'https://s3-alpha-sig.figma.com/img/3a84/4b3c/d28e0339284709b10372496e548453c6?Expires=1685318400&Signature=jNCucO7kCgXMzImuxXazmm1xwxcLT0E2yu4uzZ3EWBGTylY67FPC0rZqxPMnfwILUs3g4l96Jt9PVB0dYA7Qj8WE64Y1IciNJ9CJ8T6BypNmsWw7B3o9rHGRLYtbGkLMj0m9wQAp48xnuox~XZ4vm8pwZdFdZb1dNkGxRl31II9TTujvpbvi~ugt4htuM4XO-YpVmPiKIVj4PHPBvp42qDmk55lwYmCJWi0Sq~YWABTbW0wVBEwV2Mhk4pFdnjOubzjmvIiAJQdhZACYBcoP5ivKOnGCNRm4eT9yUH0dV202Y3HkJL1zWsKCvjoselQrIFK06ROcWl9LyQ-ifFB-FA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
    },
    {
        id: 10,
        title: 'Moana',
        category: 'Sound Edit',
        imagePath:
            'https://s3-alpha-sig.figma.com/img/d6c7/5398/79522949c11c153a4a18c0df245cff61?Expires=1685318400&Signature=SeKyE78OZb2l0l7bqp5K2pn3B1UMeypvYCT4vH9WSfv06DnZg57kvKJNRbnCRo5icxEtGPWNimqVbN5qY8jRhnN6uE89I2JOU1nsufs9CUvmcG43Xl1yehWOKpK7wVUiNraXWwNRAeG-0rP8Y7p3~9j1yQShBOsAmmekBecRi-qCIlI6c~B86O-BSUKan9JuKgSrexcduf8PLo9hAcnckEHLn-gA5d9WVu6PVM9m9Ge-4psUxOVMzZN9ee10nV2uwOM~fSf2dKbOxEtpq3YNUr6zfMPeWyo3RUMI9-bdOquxr7DOLcM9x48KS4wmeJzHcO9FbIWX7N3EYwHvFWb7LA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
    },
    {
        id: 11,
        title: 'Vistar',
        category: 'Video edit',
        imagePath:
            'https://s3-alpha-sig.figma.com/img/8aeb/1c9d/395af35ecd6226a9ad2d446e03dc53a7?Expires=1685318400&Signature=R2bFETJptiai3cy6VAlCms57l9JY0Rn6jfgJg0RlhU5LAzi9BhDqnj-JmYSr7wt4E1TmxeDfZM-Zo5JuJlVPFKgn7piI3ZHEvY-inpn31lUSUPfyCeKkr4kmpnUNCKeUcTCH0RV66xPD5NxUx-ARUicRvvm4iC5Ly9dyW~qhCMWPPNk4GUMczCdHWwNQzMNDOAQGg6XF4cv1bxIkbFt1M610yvn-Hlmj4-5YCtl-9oCit38TS0WwVZscoPbnkvld4bcTRzTTirH2uFKKFGooCIkh9Ql0gPnYy-yxNVIDQyZiLz9j-q5sTCrtTxVGRS-hQeELsPHEjxh4XqbXzYT8MQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
    },
    {
        id: 12,
        title: 'Nomo cam',
        category: 'Image & video edit',
        imagePath:
            'https://s3-alpha-sig.figma.com/img/41ab/ebfe/c475e35b8e3a835cde28e606bef46c8b?Expires=1685318400&Signature=bvrvvrEmXGJt9hal9vio23FN-qa6TquKI15PxLOZzynFCAequSF9bpFb78sAzU0XatxzCQFNQbwHtEjlElGlbg5HZnFvnl0NV7~GCDE5K3trLxqETLVKbf9fdrM7wUXMG5pcOEkTtYq7BCxlytCkJqdmceOehBEjY4uDWBevqvBrj38sjuoG7RHqCAQND1iX29I9~kHfnCYmLZfKofuTgqJCc7w2OjVODGPnRep07NET11SDNmiV9fdgztOJCbmZDJCMysDcuJLHrQEQXb~5Kiyh2S4GKVkfl4PCz97RPRU5lXywTcfKo0nL7URqs3qVwBxi57fNlaezBT1MMdMxWg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
    }
];
