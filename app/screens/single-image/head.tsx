import { Image, View } from 'react-native';
import { SingleImageComponents } from './style';
import { PaddingContainer } from '../../styles/grid';
import { Title } from '../../shared/components/title';
import { UserNameCard } from '../../shared/components/username-card';
import { ReportButton } from '../../shared/components/report-button';
import { singleImagePageConstaints } from './constaints';

export function SingleImagePageHead() {
    return (
        <>
            <SingleImageComponents.Hero>
                <Image
                    style={{
                        width: '100%',
                        height: 370
                    }}
                    resizeMode="cover"
                    source={{
                        uri: singleImagePageConstaints.heroImageUri
                    }}
                />
            </SingleImageComponents.Hero>
            <PaddingContainer>
                <Title str={singleImagePageConstaints.title} />
                <View>
                    <SingleImageComponents.UserDataWrapper>
                        <UserNameCard
                            profileUri={singleImagePageConstaints.profileImageUri}
                            username='Julia Rabert'
                            profileImageStyles={{ marginRight: 8 }}
                        />
                        <ReportButton />
                    </SingleImageComponents.UserDataWrapper>
                </View>
            </PaddingContainer>
        </>
    );
}
