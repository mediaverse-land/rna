import { ScrollView, TouchableOpacity } from "react-native";
import { Box } from "../../../components/box";
import { CondutorTitle } from "./conductor-title";
import { Input } from "../../../components/form";
import { Select } from "../../../components/form/select";
import { Button } from "../../../components/button";
import { BorderButton } from "./border-button";
import { useState } from "react";
import { Text } from "../../../components/text";
import { ICON_ARROW_DOWN_SVG } from "../../../constaints/icons";

export const CreateConductorFormMemo = ({
  handleClosePres,
  closeFormModalAndOpenContenModal,
  handleSelectAccountModalOpenPress,
  createConductorHandler,
  setTitleInput,
  setDescriptionInput,
  showTitleInput,
  setAction,
  isLoading
}: {
  handleClosePres: () => void;
  closeFormModalAndOpenContenModal: () => void;
  handleSelectAccountModalOpenPress: () => void;
  createConductorHandler: () => void;
  setTitleInput: (val: string) => void;
  setDescriptionInput: (val: string) => void;
  showTitleInput: boolean;
  setAction: any;
  isLoading: boolean
}) => {
  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <Box
          width="100%"
          padding={16}
          paddingTop={24}
          paddingLeft={32}
          paddingRight={32}
        >
          <CondutorTitle handleClosePres={handleClosePres} />
          <Box marginTop={-16}>
            <BorderButton
              handler={closeFormModalAndOpenContenModal}
              title="Select content"
            />
          </Box>
          <Box id="form" marginTop={24}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleSelectAccountModalOpenPress}
            >
              <Box
                width="100%"
                height={48}
                borderRadius={8}
                backgroundColor="rgba(28, 28, 35, 0.75)"
                direction="row"
                alignItems="center"
                paddingLeft={16}
                position="relative"
              >
                <Text color="#4E4E61" fontSize={14} fontWeight={400}>
                  Channel
                </Text>
                <Box
                  width={1.5}
                  marginLeft={16}
                  marginRight={16}
                  height={17}
                  backgroundColor="#4E4E61"
                ></Box>
                <Text color="#4E4E61" fontSize={14} fontWeight={400}>
                  Choose
                </Text>
                <Box position="absolute" right={16}>
                  <TouchableOpacity>
                    <ICON_ARROW_DOWN_SVG />
                  </TouchableOpacity>
                </Box>
              </Box>
            </TouchableOpacity>

            <Box marginTop={16}></Box>
            <Select
              labelText="Action"
              placeholder="Choose"
              setSelected={(e) => setAction(e)}
              options={["Archive", "Share", "Stream"]}
            />
            <Box marginTop={16}></Box>
            <Input
              isTextArea
              showBorder={false}
              labelText="Description"
              placeholder="Description"
              onChangeText={(text: string) => setDescriptionInput(text)}
            />
            {showTitleInput ? (
              <>
                <Box marginTop={16}></Box>
                <Input
                  showBorder={false}
                  labelText="Title"
                  placeholder="Title..."
                  onChangeText={(text: string) => setTitleInput(text)}
                />
              </>
            ) : null}

            <Box marginTop={24}></Box>
            <Button
              varient="dark"
              isLoading={isLoading}
              text="Add"
              onpressHandler={createConductorHandler}
            />
          </Box>
        </Box>
      </ScrollView>
    </>
  );
};
