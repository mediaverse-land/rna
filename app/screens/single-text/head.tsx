import { View } from 'react-native';
import { Title } from '../../shared/components/title';
import { PaddingContainer } from '../../styles/grid';
import { UserNameCard } from '../../shared/components/username-card';
import { ReportButton } from '../../shared/components/report-button';
import { singleTextPageConstaints } from './constaints';
import { SingleTextComponents } from './style';

export function SingleTextPageHead() {
    return (
        <PaddingContainer>
            <Title str={singleTextPageConstaints.title} />
            <View>
                <SingleTextComponents.UserDataWrapper>
                    <UserNameCard
                        profileUri={singleTextPageConstaints.profileImageUri}
                        username={singleTextPageConstaints.username}
                        profileImageStyles={{ marginRight: 8 }}
                    />
                    <ReportButton />
                </SingleTextComponents.UserDataWrapper>
            </View>
        </PaddingContainer>
    );
}
