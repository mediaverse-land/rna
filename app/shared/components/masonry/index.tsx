import { Image, View } from "react-native";
import { MasonryGridComponents } from "./style";
import MasonryList from '@react-native-seoul/masonry-list';

const { Container, MasonryItem } = MasonryGridComponents

const data = [
    {
        id: 1,
        path: 'https://s3-alpha-sig.figma.com/img/4a55/b0fc/eabc98f5a65d8622a8ca410766b72a29?Expires=1684713600&Signature=M1UdE-b5wzPGbLZDJCvIS~CMb~9x-Xy~YyjBKNY9w9AoG~XhWo3Xdv0xwLbAvBP7-uqvPX1qyuly2fhxudRBjCuc9vsVyPF3NroW-77kqkiHoh95oOCbWh-1Qf0xl~cI3yOxMz~BGZAPYCFvszE96ZK-1ZgNg--L9x7iF4ey19vPZzNvKN-dC48uL2n9DQ~vF~7FpWQJzYBHX5H7zzjwTDnUfTkTD2mQ-1SFvhOdvAbaujgZV3WzAWgHKu9aoVOVBEcpwkllZJAKkol-cOjTlVH7m0B1cDL42NtYOFv4XpbQ9QUXjX-utwpPtw42eoeOze18jPT4RP5OjBiaxr2BEw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        , width: 1,
        height: 1
    },
    {
        id: 2,
        path: 'https://s3-alpha-sig.figma.com/img/5e8c/42ff/93693be451cdf47c32c3daca6d8786cd?Expires=1684713600&Signature=c1APu-OtwMz0Nmb0j9s2fax9y1zbvOU~DXJtDLB0gQQYkXBhZDj1XX3wNubVO-4nxV5hN~bf2aPLYk6~8kNlP62-2NiWPqlmTVPLLdjs8~dQt6px46cciPB5C-PMi1i02Qc76hEzZ4QTe4MTJpUrxop6TdQYQjJBLfLmCTNvZtjCI0EdV3ouHMv9pdJaXbuOUZGu4TDjt~QSlu2q-XSJuwAmaoXOboueiKZ7W1T2S7lfcsgZdjPpUQKxl0HGX3zmBjWSJkv4cymtH3ZU3EVYRPAtelNMxgLaFBqrmQPvglmcMqEymcRlm0~DaZwVcAVZxwACpSOIHeVTjcpheyQkrg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        , width: 2,
        height: 2
    },
    {
        id: 3,
        path: 'https://s3-alpha-sig.figma.com/img/71cf/4eed/b6a3690d60bcac5986a005d06355d8f8?Expires=1684713600&Signature=mAO0JG-REKEoYVLel4PrOtkMSEqmixaiRRisrZgDyDBS6D0nlR66~yNupcNNinNMmntHnyj~8jbiwOHuntsJiHDLcD9VKg7s5qzwBCZAGfgVKxtoTsZHsNBYqvX9VgB4OIshD394xy~swDJkiP~wo9L7WqoMmjC-iVXr3JzrRVpjkYjf3c0QpIxYhtCwrI-O5j9G~1b6b~wEXuwa4Dl7sfHxbt~DjlF7RJkDK5GQgFMzgsJIM3kwpGwU8jBkZbFGnzeGgnHz~7PaH5y53F4ldbFUzeGDaj0c~wXkqtNiSj9pOfWg4C0xtWTEyovYiN7rDbzKrM84ObjnDvMcSO639A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        , width: 1,
        height: 1
    },
    {
        id: 4,
        path: 'https://s3-alpha-sig.figma.com/img/9538/b66f/8a7bafe4a80ff0f4da4747d8370364a0?Expires=1684713600&Signature=fiPrO9yLGJhW-Soviy8jDH7WcjN2I5nc5q7VFfoLecld8rHGAcu0Z3SPYrz4Fs6~fB8DZR~GnxWVqS3VkTj3k5xydrI1smIVorA-aoviDldDJ-AbjyAl2V8eXf~a~JJx7unwgkibtQKWon7k7QnwrFf~fSgvuaw3lYQgDhIZWCYBu0F3tVHaQvDVl-KGIbzAGWoIidDIOAbEIiL7UXd8AosENkrO1eg91Zg328WtNZ2W4gzmGFYW8Pk2kk28q6qwjzc0SN5laX3TMxXJ2pwXFGVGDs92oq3fu96wGv92ZX5eq1RJIXVk3RBJ65zsxycvf38x3nv66HC6kdsvioaBmQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        , width: 1,
        height: 1
    },
    {
        id: 5,
        path: 'https://s3-alpha-sig.figma.com/img/b57d/8b50/08ca6b9e4cc2321f95264fc376203643?Expires=1684713600&Signature=XA9kK08VJZDci79H6afxpU7iSfnLIfjDXSIhbDfyHbb7~HtVCdJcYcVOttm7DJh8Lc3BJ0gBpONaOyS4XTBKnLIaC8kbaavWzDNKaJniGuGvUKm-UIYytBaGHbNAUHREEyMeFqQY2dkao39IHOoWRfAwid7TL32o97Q3HNnGlHhLq8wZuqzQk91a8CVKsHTc4vmCt8yKL4ZZWk3FAMxXqzldExhGuKbW~svyQSi3Yy460luiPXKKJIZUYrDkySBn15Ouwv8JkadVnrd-LnzwGJuqKQ1sBaEu7uCsHQIXGSznXymBxy-GT8BR~FfeI-YLWaPdN3eCGRj6rCQEXKb31A__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        , width: 1,
        height: 1
    },
    {
        id: 6,
        path: 'https://s3-alpha-sig.figma.com/img/55d9/03d4/66d53b4384976315e0ac5bb9c0b84681?Expires=1684713600&Signature=VHqV2FL7ENU-oB9~4pv5P~MEufqzpdfhXAfQs9JQw1RePoZi6XwYho3l6dqW8KmbBT0CR3nYui8~s9We1X53b8s-0j5e~b4ISSjhONrppHVrzkr6248ZqwlxDMV2z2WKGEL0hABV5NVhZOVnYbRNbSXnBINnjV2258WOdrTAU9b7Ql6MO2l-I3zuRAflgZo65iZuwFy~24Q4Xrnu5zEqa-4HAvCzflE9u3JJ6HE3MHVxJ~PhDH4ErWvTTbMW1V9UOSXbDJhlEehEPDCxyUxrUrHQido5QbhxbaTGzNei2JMmGvmCGiH1bTFN6BIvROateZHPoN32ai3Zd439hp2MYg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
        , width: 1,
        height: 1
    },
]

export function MasonryView() {

    // const renderTiles = data.map((tile) => {
    //     const tileWidth = tile.width === 1 ? '30%' : '60%'
    //     const tileHeight = tile.width === 1 ? 109 : 229

    //     console.log(tileHeight)

    //     return (<MasonryItem
    //         key={tile.id}
    //         style={{ width: tileWidth, height: tileHeight }}
    //     >
    //         <Image
    //             source={{ uri: tile.path }}
    //             style={{ width: '100%', height: '100%' }}
    //         />
    //     </MasonryItem>)
    // })

    const renderTiles = ({ item }: { item: any }) => {
        const tileWidth = item.width === 1 ? 109 : 226
        const tileHeight = item.width === 1 ? 109 : 229

        return (
            <View>
                <Image
                    source={{ uri: item.path }}
                    style={{ width: tileWidth, height: tileWidth }}
                />
            </View>
        )
    }

    return (
        <View style={{ flex: 1, width: '100%' }}>

            <MasonryList
                style={{ alignSelf: 'stretch' }}
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    alignSelf: 'stretch'
                }}
                numColumns={3}
                data={data}
                renderItem={renderTiles}
            />
            {/* <Container>
                {
                    renderTiles
                }
            </Container> */}
        </View>
    )
}