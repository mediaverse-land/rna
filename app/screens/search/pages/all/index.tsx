import { useState, useEffect, useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ImagesPageComponents } from '../../../explore/pages/all/style';
import { PaddingContainer } from '../../../../styles/grid';
import { SearchParam } from '../..';
import { Asset } from '../../../../types/asset';
import { tokenContext } from '../../../../context/token';
import { searchAllApiHandler } from '../service';
import { tokenStringResolver } from '../../../../utils/token-string-resolver';
import { VirtualizedList } from '../../../../components/virtualized-list';
import { Box } from '../../../../components/box';
import { UseNavigationType } from '../../../../types/use-navigation';
import { useIsFocused } from '@react-navigation/native';
import { List } from '../../components/list';
import { RenderIf } from '../../../../components/render-if';
import { IfNoItem } from '../../../../components/if-no-item';
import { addTypeToAsset } from '../../../../utils/add-type-to-assets';

type Props = {
    searchParams: SearchParam;
    navigation: UseNavigationType;
};

const { ContainerStyles } = ImagesPageComponents;

export function AllPage({ searchParams }: Props) {
    const isFocused = useIsFocused();

    const [data, setData] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(true);

    const { name, tag, plan } = searchParams;


    const tokenCtx = useContext(tokenContext);

    useEffect(() => {
        if (isFocused) {
            getData();
        }
    }, []);

    const getData = async () => {
        const token = await tokenCtx.getToken();

        if (token === null) {
            return;
        }

        const formattedToken = tokenStringResolver(token);

        const { isError, res, errorRes } = await searchAllApiHandler({
            name,
            tag,
            plan,
            token: formattedToken
        });

        if (isError) {
            setLoading(false)
            return;
        }

        formatInputData(res.data);

        setLoading(false);
    };

    const formatInputData = (inputData) => {
        const {videos, texts, audios, images} = inputData;

        const formattedVideos = addTypeToAsset(videos, 4);
        const formattedImages = addTypeToAsset(images, 2)
        const formattedTexts = addTypeToAsset(texts, 1)
        const formattedAudios = addTypeToAsset(audios, 3)

        const concatedData = [
            ...formattedVideos,
             ...formattedImages,
             ...formattedTexts,
             ...formattedAudios
            ]

            setData(concatedData);
        } 


    return (
        <LinearGradient
            style={[ContainerStyles]}
            colors={['#030340', '#030340']}
            start={{
                x: 0.7,
                y: 0
            }}
        >
            <PaddingContainer>
                <VirtualizedList paddingTop={196}>
                    <RenderIf condition={loading}>
                        <IfNoItem dataLength={data.length}>
                             <List data={data} isLoading={loading} />
                        </IfNoItem>
                    </RenderIf>
                    <Box width="100%" height={100}></Box>
                </VirtualizedList>
            </PaddingContainer>
        </LinearGradient>
    );
}
