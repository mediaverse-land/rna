import { FC } from "react";
import { PaddingContainer } from "../../../styles/grid";
import { Box } from "../../../shared/components/box";
import { SingleItemDescription } from "../components/description";
import { MetaDataType, SingleItemMetaData } from "../components/item-metadata";


const description = 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat'


const soundData: MetaDataType[] = [
    {
        id: 1,
        key: 'Language',
        value: 'English'
    },
    {
        id: 2,
        key: 'Type',
        value: 'Music'
    },
];

export const SingleSoundContent = () => {
    return (
        <PaddingContainer>
            <Box width="100%" marginTop={32}>
                <SingleItemDescription
                    description={description}
                />
                <SingleItemMetaData
                    data={soundData}
                />
            </Box>
        </PaddingContainer>
    )
}