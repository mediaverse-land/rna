import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenGradient } from "../../shared/components/screen-gradient";
import { ScrollView } from "react-native";
import { Box } from "../../shared/components/box";
import { useState } from "react";
import { PaymentSuccess } from "./payment-success";
import { PaymentContentHeader } from "./components/header";
import { HowToPayList } from "./components/how-to-pay-list";
import { BuyButton } from "./components/buy-button";

export function PaymentScreen({ navigation }: any) {
    const [isPayed, setIsPayed] = useState(false);

    const goBackHandler = () => {
        navigation.goBack();
    }

    const setPayHandler = () => {
        setIsPayed(true)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScreenGradient>
                <ScrollView style={{ width: '100%' }}>
                    <Box width="100%">
                        {!isPayed ?
                            <PaymentContent goBackHandler={goBackHandler} /> :
                            <PaymentSuccess />
                        }
                    </Box>
                </ScrollView>
                {
                    !isPayed ?
                        <BuyButton setPayHandler={setPayHandler} />
                        : null
                }
            </ScreenGradient>
        </SafeAreaView>
    )
}

function PaymentContent({ goBackHandler }: { goBackHandler: () => void }) {
    return (
        <>
            <PaymentContentHeader goBackHandler={goBackHandler} />
            <HowToPayList />
        </>
    )
}