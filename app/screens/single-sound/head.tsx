import { View } from "react-native";
import { Title } from "../../shared/components/title";
import { PaddingContainer } from "../../styles/grid";
import { UserNameCard } from "../../shared/components/username-card";
import { ReportButton } from "../../shared/components/report-button";
import { SingleSoundComponents } from "./style";
import { singleSoundPageConstaints } from "./constints";

export function SingleSoundPageHead() {
    return (
        <PaddingContainer>
            <Title str={singleSoundPageConstaints.title} />
            <View>
                <SingleSoundComponents.UserDataWrapper>
                    <UserNameCard
                        profileUri={singleSoundPageConstaints.profileImageUri}
                        username={singleSoundPageConstaints.username}
                        profileImageStyles={{ marginRight: 8 }}
                    />
                    <ReportButton />
                </SingleSoundComponents.UserDataWrapper>
            </View>
        </PaddingContainer>
    )
}