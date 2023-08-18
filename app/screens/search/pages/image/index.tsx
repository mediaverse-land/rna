import { useState, useEffect, useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ImagesPageComponents } from '../../../explore/pages/all/style';
import { PaddingContainer } from '../../../../styles/grid';
import { SearchParam } from '../..';
import { Asset } from '../../../../types/asset';
import { tokenContext } from '../../../../context/token';
import { searchImageApiHandler } from '../service';
import { tokenStringResolver } from '../../../../utils/token-string-resolver';
import { VirtualizedList } from '../../../../components/virtualized-list';
import { Box } from '../../../../components/box';
import { List } from '../../components/list';
import { RenderIf } from '../../../../components/render-if';
import { IfNoItem } from '../../../../components/if-no-item';
import { addTypeToAsset } from '../../../../utils/add-type-to-assets';

type Props = { searchParams: SearchParam };

const { ContainerStyles } = ImagesPageComponents;

export function ImagePage({ searchParams }: Props) {
    const [data, setData] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(true);

    const { name, tag, plan } = searchParams;

    const tokenCtx = useContext(tokenContext);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const token = await tokenCtx.getToken();

        if (token === null) {
            return;
        }

        const formattedToken = tokenStringResolver(token);

        const { isError, res, errorRes } = await searchImageApiHandler({
            name,
            tag,
            plan,
            token: formattedToken
        });

        if (isError) {
            setLoading(false)
            return;
        }
        formatInputData(res.data)
        setLoading(false);
    };
    
    const formatInputData = (inputData) => {
        const { images} = inputData;

        const formattedImages = addTypeToAsset(images, 2)

        const concatedData = [
             ...formattedImages,
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
