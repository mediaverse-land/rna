import { Image, TouchableOpacity } from "react-native";
import { Box } from "../../../components/box";
import { Text } from "../../../components/text";
import { PaddingContainer } from "../../../styles/grid";
import { theme } from "../../../constaints/theme";
import { Button } from "../../../components/button";
import { PAYMENT_PNG } from "../../../constaints/images";

type Props = {
  closeAddCardAlertHandler: () => void;
  addCardPressHandler: () => void,
  isLoading: boolean
};

export function AddCard({ closeAddCardAlertHandler, addCardPressHandler, isLoading }: Props) {
  return (
    <PaddingContainer>
      <Box paddingTop={16}>
        <Box
          width="100%"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text
            color={theme.color.light.WHITE}
            fontWeight={600}
            fontSize={16}
            lineHeight={16}
            textStyles={{
              paddingTop: 4
            }}
          >
            Add inventory
          </Text>
          <TouchableOpacity
            onPress={closeAddCardAlertHandler}
            activeOpacity={1}
          >
            <Text
              color={theme.color.light.LIGHT_TEXT}
              fontWeight={400}
              fontSize={14}
              lineHeight={16}
              textStyles={{
                paddingTop: 2
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </Box>
        <Box
          marginTop={24}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box
            height={43}
            width="100%"
            additionalStyles={{
            }}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Image 
            source={{uri: PAYMENT_PNG}}
            style={{
                width:130,
                height: '100%'
            }}
            />
           
          </Box>
        </Box>
        <Box marginTop={25}>
          {/* <Input placeholder="Insert amount..." labelText="Wallet" /> */}
          <Button
            varient="dark"
            text="Pay"
            marginTop={24}
            borderRadius={16}
            isLoading={isLoading}
            size="lg"
            onpressHandler={addCardPressHandler}
          />
        </Box>
      </Box>
    </PaddingContainer>
  );
}
