import { Box } from '../../../shared/components/box';
import { PaddingContainer } from '../../../styles/grid';
import { SingleItemDescription } from '../components/description';
import { MetaDataType, SingleItemMetaData } from '../components/item-metadata';
import { FileType, SingleItemFiles } from '../components/files';

const description =
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat. ';

const textMetaData: MetaDataType[] = [
    {
        id: 1,
        key: 'Suffix',
        value: 'TXT'
    },
    {
        id: 2,
        key: 'Type',
        value: 'text'
    }
];

const textFiles: FileType[] = [
    {
        id: 1,
        chapterName: 'Page 01',
        duration: ''
    },
    {
        id: 2,
        chapterName: 'Page 02',
        duration: ''
    },
    {
        id: 3,
        chapterName: 'Page 03',
        duration: ''
    },
    {
        id: 4,
        chapterName: 'Page 04',
        duration: ''
    },
    {
        id: 5,
        chapterName: 'Page 05',
        duration: ''
    }
];

export function SingleTextContent() {
    return (
        <PaddingContainer>
            <Box position="relative" zIndex={20} width="100%" marginTop={32}>
                <SingleItemDescription description={description} />
                <Box marginTop={8}>
                    <SingleItemMetaData data={textMetaData} />
                </Box>
                <SingleItemFiles data={textFiles} />
            </Box>
        </PaddingContainer>
    );
}
