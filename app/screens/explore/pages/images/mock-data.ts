import LATEST_IMAGE_ONE_PNG from '../../../../../assets/img/latest-images/latest-image.png';
import { imageUriResolver } from '../../../../utils/image-uri-resolver';

const LATEST_IMAGE_ONE = imageUriResolver(LATEST_IMAGE_ONE_PNG);

export type ImageMockData = { id: number; path: string }[];

export const imageMockData: ImageMockData = [
    {
        id: 1,
        // path: 'https://s3-alpha-sig.figma.com/img/0d72/e478/39980eb1dcc1a45f170d36f0a921f4a9?Expires=1683504000&Signature=nDBu~ZHyNfDtxKQRCol2KjCQQuEgxBzt-F7obWITP-~OWNMts8939X2FvW0B8h3VusmCV2j~E8laQgj-4QcKys8nENoHg2WZk-0Q-Z827wcWiBjkd6LyVyi8eYC7y2~bQfnghfppdL2J1mFNJM-mecFgGE2lHrjP4AUjX5zPmxYjWmIexL7cF2Ecm2MDTc25QPWnVrkbTvzyLf73yKx4rkoe9z9ErmnI77WlHm3HF00LiHbCP293xha9fpdf7p3yp~hlDSccycarR8qBi-qp1qyd2HQywN8xrPRzci26BRHFo8bsXQVlFlceblteKBqnXu29mlcenkuol2-Ydy8hyA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        path: LATEST_IMAGE_ONE
    },
    {
        id: 2,
        // path: 'https://s3-alpha-sig.figma.com/img/9317/c093/c4da80897aac7aa7dbaf51433cf3f99d?Expires=1683504000&Signature=MpWhvkroqujr9OSHZUWNfbY8czkzXmNLhA~d-M938v6664yot~IKzmg-7mUPySu2ZSFGiClRNSVjMnDtT6llMaNko1A08rusTSNOe0~gMYHQdTr9BYlM1FC3RJq9wdcEAM~P~vYkZXSlBt-sd4J4ZFKqfq9dIMQ7U8CLbYJsYtY4cx06-lXsNyKYX9~OJvIjJqgdxQ987wJYVSbMT-g9wZkHg7sXBEBNNr8PHuImQbuI-YUfx7sv3YIp4GuOQIjUgpNBsGdwHUTZsORrCuhhlq53cwHLTzYBhhlRfSZlnYBcySlB7wWNNDLhGbhu-H2GMPFkyqk5ipy2Efxh45tDBg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        path: LATEST_IMAGE_ONE
    },
    {
        id: 3,
        // path: 'https://s3-alpha-sig.figma.com/img/7cbe/cff4/b0aef1f6e5b4de4bd15661cd365de1c9?Expires=1683504000&Signature=crVpyVIT1-KWig~ZfXauOBCA-uYH9aIutUzJcQBAqRM5bEZXS66FSQbccb56GUO2z-khMxqnHEr~u0J5S0vh95Cc5Ixl7UW1-WZQ1fIEkEJLD7xBbLOz~OGSEqQ9dY5Pwet8gxsiHK9IGLueyQPD0EhZt7aslS5fAUmI5tbCp~wBfQUCIrt5oOFYmCin3ji1FmIuK0~B3wUIVJKt6t-tRdhFBozZc2i5J5YOQR27IgqQi~qCsyBpHzkAqbWEb0SSUB6ghfkY77IrRE5hIeyXyRsNJJmqdP-WGF-SH9v~JAnKA77G0NX5vxn~nfnL4nqbHMUxpIaR2tteEp4efCwO3g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        path: LATEST_IMAGE_ONE
    },
    {
        id: 4,
        // path: 'https://s3-alpha-sig.figma.com/img/a15d/4981/6dfe7b2b17d36fb8cd82570ec29a128b?Expires=1683504000&Signature=WH-~xniTtthaInYq2YXVz7jL5zV3Gvb7R1wdq1PSVvuMV6km0--KhACLs5cQsRlgzWh2NUVA1vyE1W8xujch6~Bp7lzynPU6GaqxbYge0d6wYAsjCE8~mlmIX1Ho9EDGfZI6Gvi7GhrG9JC3ouPdlbVTY~8MPA4FPJAl0-KCBGXWE1SKd7dD1gFyfzWlwM9moCvQCvd2L0cXPLu91P6Ua5qvFtLt3robBqMdYSEEuNwvOFtc7LTfwJRLbGJadR2fZLrri8QUpoE3fDg7yzxHNjzIYnN6wvNmJ~s2T~FZee31VNNpz~xkZ2QsZUeOFg4yq93g5XofBGQYI6Dl5A2xdg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        path: LATEST_IMAGE_ONE
    },
    {
        id: 5,
        // path: 'https://s3-alpha-sig.figma.com/img/f15b/75c3/70045840538dc7cbe66e112e7403cf42?Expires=1683504000&Signature=O5KVwPsP~VvwlDy2HnqV71w6qrFXI~Imlt8FTJTLys2ecD9A1VucaV-I4sOFm4FlnWhM~OnGXvk45qOLwbT66NjTKz5Mw7OuTBbbJF6O8s~JN7r3-T8hvtqu6MzXmN5x5h5LKCPCp84hOYv8j-Cm2852ss1Z86-Ecf4ZrpcdaWMz36jRxR6hGKS5LnrbIulV7sagsX42W3Pa7TKcUYkPBjbRFiEumZ7Ow10XTt9nNISevdaKJjqXvwxLlh4uZfkSvOR8iLyoFvKCOBp-2s5KXnRSC8vh-jDp2y1GD3DVGLjTM8xn~gH9r0IU0x6HykP~tuffnEFj66zViItHkrmh6g__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        path: LATEST_IMAGE_ONE
    },
    {
        id: 6,
        // path: 'https://s3-alpha-sig.figma.com/img/ed1d/499e/bd7dabb8bdb3e4364852cb11fdd0c2d6?Expires=1683504000&Signature=TKBckt141xboPYF~LklpSrjb6rvBcRreN0Sl3K6qxqUzaxcWp6qfB-ckc~Bc1rCwl1RVfDHj5PQfPaIfM3VyN8qCLJNVyrfXFs93WbZZUKjY0CPACIVhlLRRAJ9LocNSTYX5dJTlEqP5fDR47U4R9fv14kFqREWPm9fnJ3VfGsECB7H8ksiwY~pYgm6hF~JWO3Gt-8klIK0CV0xBXNgbFWuImiFWAblAxAeVHdsakXUFa6e2D5K3RaWYSBhOpS884T5Sjkufw12ODJg1VMIj6h0z5onGWlRIb59RwbJwE~G-FURRB85sm2Top~7KXRzkX02h8MxN5xHdlQTbQ9fYoQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        path: LATEST_IMAGE_ONE
    }
];

export const mostViewsImageMockData: ImageMockData = [
    {
        id: 1,
        // path: 'https://s3-alpha-sig.figma.com/img/261f/37fa/ef267e1b40fc48dd9ed954e7088011fd?Expires=1683504000&Signature=V6Ank5ay8H3GkQccPDaF5904Gt7JPlUKdEG2pg9jP3xB9F9UyhN-z69bX~7uUajBGnJDgQIUTVGZ2H2~n25y5C8cYJ4J9ED9agdk6umNH-651xqlMRcw8a6z0dTkLzX4M5N4mKWrmZ4HSenXjayTp2R7ER8jue0mQFR8gkBK4oN-EkaPvJXks1kUTbIfR8wI3H2HAhcu9uRvwCMX0hpSdgpMH8IWAV6zeA6EamvDEqSIoSQPRRIuIYSjhFIdOua9sLqXs9IQyssU~tfqbzGQ2exx3Jr6-LEkTh4-0bjo~fVpTXVK~LDfnXSyB5vmFe0UesUPuGuhsIPvOwG1ckJixA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        path: LATEST_IMAGE_ONE
    },
    {
        id: 2,
        // path: 'https://s3-alpha-sig.figma.com/img/bb5c/e717/78991730c9f5dacf6e60388700647d9b?Expires=1683504000&Signature=Ej7uxLnCZMzPkDzAOKQIMdvWqGgRfEG0Z22LogY25EixQCgJXJr000lT3BYDysvAxK29AOfaDTaIx0x9ebbMv2kbXgsFJCt97ghgI8M7dTRwucoIMbB8KH7WwpSgPk06ykV4I1JMkRxbmywqbTWp9VGiZ-uHWZ2s9N-4O9dU8w-2E0BxOAYAStQ-HiN8VuVll~hI53O-2kOE~8m2Kjcg9aNeLClnKqCokqLgl6Q9jwff8NKyFF9l4qhye5hMRoOCHZGgy~rh33ObNBjdSlt544I4vBGz-Nx0jMLT-g9A7Gu4R3Blasz4lc3h-48C5jQth3RRaIQA0dZlxzP1rEFOdQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        path: LATEST_IMAGE_ONE
    },
    {
        id: 3,
        // path: 'https://s3-alpha-sig.figma.com/img/d7ef/c8da/45457fe6378f69cdaefc5ebeaa88a114?Expires=1683504000&Signature=ccOuuHuTf-CKCMqeSl~tAR9Xsj72tUU6Pq21oQ2rzuz8EoFDbITcYJfgmty9zoyJqs0ucA8i1lvYXWpUCfn3CM7wn5ahDB7H5zNW5wHSSTxQ9C2i33CcIbAfwIdNhwFBt-fnTO-Zud~v12O6XESS1i5k5tYdmRtHxRhdFVLMhpdNxxG9x4L397vp9OCP99Ku15NDXkdALJdFCDuABFTQB2r1YRlFURM~PSBeewjrdItvbRbfdp1MUaWFnM7nYZAfkzTJTjMgtb~T-BLaxuSFT1XF7NNVUVztrbjEjaU9cFCnmV1akmrBFZ6UHllBVldMDTsJSHcAc74E4qYLL7xDSg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        path: LATEST_IMAGE_ONE
    },
    {
        id: 4,
        // path: 'https://s3-alpha-sig.figma.com/img/48e2/d76b/61b0c22b4d69510bbcd5a93a437bd1a0?Expires=1683504000&Signature=kTmgZkYU-8ZeV538aAMgXxIfaRGd2dHljW~vA1~C97fihM4DlX6p-KPcia~R9Efue2t1zuFE1GhrUel4lNOzKIeMGqY3ERHqbKSMPX8VAATrVUvrzzUCMiHlRH4lszVMjf-WjIWZfC-NQ75U8mCarJDIDKYocSa6Hacc546vbpAKTsQQlqYwVGsIqRgNaJHC0Ms~KmI8JvL~N~Bw6gN1kB6xAtz2APHuH1X7NBIvNwbMIrGUuRKMqPgCa0KIU0JhdCPd4ch0mNmuO9EL211DmM~qPXd6lBXH4rdoWn3Niw9ayxS26Y4DORq4ca2W9d0QbTy-35ogBh1RTUICz-cnpA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        path: LATEST_IMAGE_ONE
    },
    {
        id: 5,
        // path: 'https://s3-alpha-sig.figma.com/img/8db8/097c/bee0506f55f68911136929318cbded6c?Expires=1683504000&Signature=CjpzBmJx9LXNCGQD265Nhd3ZOjXhHvihfTkWMJa-lVfXDQ1NhfT5Vseph1AlIWz9yZqqN4ChuHeUm13zUkKXDvnXYDaSL0XD93ZGRz8PR-AuvIIknAOJ1ZKAYCejh44igUlEaySSG4pTwRUnXq18kqXP8XRVwbaBw46M-hA4hh1P6edk1scrWZKDYvZJSvemn4RRxi7qFmgtVUWf~7QQGdHQ4hiqMoyuPWujmdXw77BWdqg-mWG50YoK9VjDrNMTfmNabmKPE09wUaHYsTCU-t-rBP~khoLKeNsaRoGhUPCr-yADHCJoag24HiuB7eZ-ZiTf4tykO3h1OcLUeAn6Pw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        path: LATEST_IMAGE_ONE
    },
    {
        id: 6,
        // path: 'https://s3-alpha-sig.figma.com/img/150c/4a31/b989e8b7b93042344e5d9aba557e6a21?Expires=1683504000&Signature=ETWKkHdCnvYkSjcnvma71DrE0IUiaQMaqR6fM2PINGTmUOaxnbf8UvaKKfM42x66N2dPGjzstPmJfxyDfVuLdqVaxB~9B6SOfs9wTx6x-RWPVSU-hW5Yj90drZm3hA~d8eecydLqAjGCvo0owbx8K2Qy9YVdqURVO3Dg7aVSiW21Gkyt7PqIQco3P~CMoPA5WAvwio4psE~lRhwivbqvgo15OzTQXIDi-MySLrdcSDEG4GWLuORfnt16eEmOP38WWlemM6o-z54st8nDsQe65h9Y2F0V3DneArzBR1mcJ2I1bXBj4Zv3WHP~MQtrbsynS9o4k9GBSWSXzDsuM49KBA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        path: LATEST_IMAGE_ONE
    },
    {
        id: 7,
        // path: 'https://s3-alpha-sig.figma.com/img/557a/5461/815e283df0975f770101d2334686d893?Expires=1683504000&Signature=IIWdIHvK8GN16zJnxbrZvvD3UL2k1hewPr5NUPY2TyR80pnoJSbBMr6Vy~z7LJT0WC4M5~m-vh~P7F5CfKayGUaSZZ3uyS4Q6zCYyy7cmYK~c55DaDU1cZyDHcuumMdaACr4a4b3doWUClUWNytBpsf9hHIV-mGMnRWoFWfSXv~y~L-2w64hKV~28Bb5zS1pquRniJz4Y2SkjT8sYEzpyuWAV2L3mU5kin1b3hZSLrzcohW3wHreiHyQm6cAV8bM6EYW5fSQkNY4-XRxxd7PSa1z-Y3IiRuG14wwkeRkwU~A857b2oJDnuPA6EI~yziYiEPrqTNLwSXzLNbuNjansQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        path: LATEST_IMAGE_ONE
    },
    {
        id: 8,
        // path: 'https://s3-alpha-sig.figma.com/img/a9c0/6549/2a33a98c78280d43a4a39efd4feb9345?Expires=1683504000&Signature=DqcVG~kJj3u7YD9n0A3n~3lUfebP5xh0EwW7WjB2Uv4WeyoQKIunw6x-5SsOOQeLsXxmBLI34vpF6xxHskoNePlju5-LpdN2hL8PZFbZ69IznkFGPa5946gdut-LZP4PfJj9zPn-A0uvyD8bgWF6aWx5TDB5~3dl2fMR7dJE~duWZW2xCKrN3m11Lu33Hr9hxy-gEQVQGWiNqkVDbIDTyj0EM2k3wNbGE9zlDAAWCIDOWP0xJ8416V2kvTmrvXooDUUx-~ENSPpOELsZzEVzplxyDibW1lsCjS323xklRZoJ6f~VdBwg9okaEuLqtulnzOSA6MeP275w5W6ZU0~BCw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        path: LATEST_IMAGE_ONE
    },
    {
        id: 9,
        // path: 'https://s3-alpha-sig.figma.com/img/2e73/ab4c/28d53f79a779fe360c09dc76c8deedc9?Expires=1683504000&Signature=Rw0MQbvV~N-Je2QkmY7vTfFv-yiD0S7gTzKt22Bj2VHp9mCb8cuzTcSf4LpXMIJHwDpQfOl4dIEyNUhQlMrBRVeCy6vbKxo0IFKlGPK3BrJHOwJWaOD5Ve7bzX9FWLHhpxFgm3vCP2T0WEmMJIUsqDRCaMK1KNeErwSyybEYP-I3uBJZrXTnIW-2~zBu4gknsKGGdVXWOeOh1DgPlP7WHQEFdYBJhALorZ0xeNwwpfvEiOFhFJ-L6L2K0QDp5Bq2hvTyxqSROye79F~qO41deHu-5ExRybmLo-yzjuYkmnktYGJH0aGxJU-Tz4jLvEb3Gj8uNHbLcsBM99nNoAsUtg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        path: LATEST_IMAGE_ONE
    },
    {
        id: 12,
        // path: 'https://s3-alpha-sig.figma.com/img/bb5c/e717/78991730c9f5dacf6e60388700647d9b?Expires=1683504000&Signature=Ej7uxLnCZMzPkDzAOKQIMdvWqGgRfEG0Z22LogY25EixQCgJXJr000lT3BYDysvAxK29AOfaDTaIx0x9ebbMv2kbXgsFJCt97ghgI8M7dTRwucoIMbB8KH7WwpSgPk06ykV4I1JMkRxbmywqbTWp9VGiZ-uHWZ2s9N-4O9dU8w-2E0BxOAYAStQ-HiN8VuVll~hI53O-2kOE~8m2Kjcg9aNeLClnKqCokqLgl6Q9jwff8NKyFF9l4qhye5hMRoOCHZGgy~rh33ObNBjdSlt544I4vBGz-Nx0jMLT-g9A7Gu4R3Blasz4lc3h-48C5jQth3RRaIQA0dZlxzP1rEFOdQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        path: LATEST_IMAGE_ONE
    },
    {
        id: 13,
        // path: 'https://s3-alpha-sig.figma.com/img/d7ef/c8da/45457fe6378f69cdaefc5ebeaa88a114?Expires=1683504000&Signature=ccOuuHuTf-CKCMqeSl~tAR9Xsj72tUU6Pq21oQ2rzuz8EoFDbITcYJfgmty9zoyJqs0ucA8i1lvYXWpUCfn3CM7wn5ahDB7H5zNW5wHSSTxQ9C2i33CcIbAfwIdNhwFBt-fnTO-Zud~v12O6XESS1i5k5tYdmRtHxRhdFVLMhpdNxxG9x4L397vp9OCP99Ku15NDXkdALJdFCDuABFTQB2r1YRlFURM~PSBeewjrdItvbRbfdp1MUaWFnM7nYZAfkzTJTjMgtb~T-BLaxuSFT1XF7NNVUVztrbjEjaU9cFCnmV1akmrBFZ6UHllBVldMDTsJSHcAc74E4qYLL7xDSg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        path: LATEST_IMAGE_ONE
    },
    {
        id: 14,
        // path: 'https://s3-alpha-sig.figma.com/img/48e2/d76b/61b0c22b4d69510bbcd5a93a437bd1a0?Expires=1683504000&Signature=kTmgZkYU-8ZeV538aAMgXxIfaRGd2dHljW~vA1~C97fihM4DlX6p-KPcia~R9Efue2t1zuFE1GhrUel4lNOzKIeMGqY3ERHqbKSMPX8VAATrVUvrzzUCMiHlRH4lszVMjf-WjIWZfC-NQ75U8mCarJDIDKYocSa6Hacc546vbpAKTsQQlqYwVGsIqRgNaJHC0Ms~KmI8JvL~N~Bw6gN1kB6xAtz2APHuH1X7NBIvNwbMIrGUuRKMqPgCa0KIU0JhdCPd4ch0mNmuO9EL211DmM~qPXd6lBXH4rdoWn3Niw9ayxS26Y4DORq4ca2W9d0QbTy-35ogBh1RTUICz-cnpA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        path: LATEST_IMAGE_ONE
    },
    {
        id: 15,
        // path: 'https://s3-alpha-sig.figma.com/img/8db8/097c/bee0506f55f68911136929318cbded6c?Expires=1683504000&Signature=CjpzBmJx9LXNCGQD265Nhd3ZOjXhHvihfTkWMJa-lVfXDQ1NhfT5Vseph1AlIWz9yZqqN4ChuHeUm13zUkKXDvnXYDaSL0XD93ZGRz8PR-AuvIIknAOJ1ZKAYCejh44igUlEaySSG4pTwRUnXq18kqXP8XRVwbaBw46M-hA4hh1P6edk1scrWZKDYvZJSvemn4RRxi7qFmgtVUWf~7QQGdHQ4hiqMoyuPWujmdXw77BWdqg-mWG50YoK9VjDrNMTfmNabmKPE09wUaHYsTCU-t-rBP~khoLKeNsaRoGhUPCr-yADHCJoag24HiuB7eZ-ZiTf4tykO3h1OcLUeAn6Pw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        path: LATEST_IMAGE_ONE
    },
    {
        id: 16,
        // path: 'https://s3-alpha-sig.figma.com/img/150c/4a31/b989e8b7b93042344e5d9aba557e6a21?Expires=1683504000&Signature=ETWKkHdCnvYkSjcnvma71DrE0IUiaQMaqR6fM2PINGTmUOaxnbf8UvaKKfM42x66N2dPGjzstPmJfxyDfVuLdqVaxB~9B6SOfs9wTx6x-RWPVSU-hW5Yj90drZm3hA~d8eecydLqAjGCvo0owbx8K2Qy9YVdqURVO3Dg7aVSiW21Gkyt7PqIQco3P~CMoPA5WAvwio4psE~lRhwivbqvgo15OzTQXIDi-MySLrdcSDEG4GWLuORfnt16eEmOP38WWlemM6o-z54st8nDsQe65h9Y2F0V3DneArzBR1mcJ2I1bXBj4Zv3WHP~MQtrbsynS9o4k9GBSWSXzDsuM49KBA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        path: LATEST_IMAGE_ONE
    },
    {
        id: 17,
        // path: 'https://s3-alpha-sig.figma.com/img/557a/5461/815e283df0975f770101d2334686d893?Expires=1683504000&Signature=IIWdIHvK8GN16zJnxbrZvvD3UL2k1hewPr5NUPY2TyR80pnoJSbBMr6Vy~z7LJT0WC4M5~m-vh~P7F5CfKayGUaSZZ3uyS4Q6zCYyy7cmYK~c55DaDU1cZyDHcuumMdaACr4a4b3doWUClUWNytBpsf9hHIV-mGMnRWoFWfSXv~y~L-2w64hKV~28Bb5zS1pquRniJz4Y2SkjT8sYEzpyuWAV2L3mU5kin1b3hZSLrzcohW3wHreiHyQm6cAV8bM6EYW5fSQkNY4-XRxxd7PSa1z-Y3IiRuG14wwkeRkwU~A857b2oJDnuPA6EI~yziYiEPrqTNLwSXzLNbuNjansQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        path: LATEST_IMAGE_ONE
    },
    {
        id: 18,
        // path: 'https://s3-alpha-sig.figma.com/img/a9c0/6549/2a33a98c78280d43a4a39efd4feb9345?Expires=1683504000&Signature=DqcVG~kJj3u7YD9n0A3n~3lUfebP5xh0EwW7WjB2Uv4WeyoQKIunw6x-5SsOOQeLsXxmBLI34vpF6xxHskoNePlju5-LpdN2hL8PZFbZ69IznkFGPa5946gdut-LZP4PfJj9zPn-A0uvyD8bgWF6aWx5TDB5~3dl2fMR7dJE~duWZW2xCKrN3m11Lu33Hr9hxy-gEQVQGWiNqkVDbIDTyj0EM2k3wNbGE9zlDAAWCIDOWP0xJ8416V2kvTmrvXooDUUx-~ENSPpOELsZzEVzplxyDibW1lsCjS323xklRZoJ6f~VdBwg9okaEuLqtulnzOSA6MeP275w5W6ZU0~BCw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        path: LATEST_IMAGE_ONE
    },
    {
        id: 19,
        // path: 'https://s3-alpha-sig.figma.com/img/2e73/ab4c/28d53f79a779fe360c09dc76c8deedc9?Expires=1683504000&Signature=Rw0MQbvV~N-Je2QkmY7vTfFv-yiD0S7gTzKt22Bj2VHp9mCb8cuzTcSf4LpXMIJHwDpQfOl4dIEyNUhQlMrBRVeCy6vbKxo0IFKlGPK3BrJHOwJWaOD5Ve7bzX9FWLHhpxFgm3vCP2T0WEmMJIUsqDRCaMK1KNeErwSyybEYP-I3uBJZrXTnIW-2~zBu4gknsKGGdVXWOeOh1DgPlP7WHQEFdYBJhALorZ0xeNwwpfvEiOFhFJ-L6L2K0QDp5Bq2hvTyxqSROye79F~qO41deHu-5ExRybmLo-yzjuYkmnktYGJH0aGxJU-Tz4jLvEb3Gj8uNHbLcsBM99nNoAsUtg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        path: LATEST_IMAGE_ONE
    }
];
