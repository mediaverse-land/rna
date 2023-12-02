import { useMemo } from "react";
import { AssetType } from "../types";
import { Box } from "../../../components/box";
import { TouchableOpacity } from "react-native";
import { Text } from "../../../components/text";
import { theme } from "../../../constaints/theme";
import { ICON_ARROW_LEFT_SVG } from "../../../constaints/icons";

export const SelectContentAssetTypeNav = ({
  assetType,
  setAssetType,
  closeSelectContentModalHandler,
}: {
  assetType: string;
  setAssetType: (type: AssetType) => void;
  closeSelectContentModalHandler: () => void;
}) => {
  const navigator = useMemo(() => {
    return (
      <Box
        width="100%"
        height={56}
        borderBottomEndRadius={32}
        borderBottomStartRadius={32}
        marginTop={5}
        paddingRight={24}
        paddingLeft={24}
      >
        <Box
          id="inner"
          width="100%"
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          {NAV_TABS.map((item) => {
            const isSelected = item.title === assetType;

            return (
              <TouchableOpacity
                key={item.id}
                style={{
                  width: "50%",
                  height: "100%",
                }}
                onPress={() => setAssetType(item.title)}
              >
                <Box
                  width="100%"
                  height={56}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text
                    fontSize={16}
                    fontWeight={400}
                    textStyles={{
                      height: "100%",
                      borderBottomWidth: 2,
                      borderColor: isSelected
                        ? theme.color.light.PRIMARY
                        : "transparent",
                      paddingTop: 17,
                      color: isSelected
                        ? theme.color.light.ACTIVE_TEXT
                        : theme.color.light.TEXT,
                    }}
                  >
                    {item.title}
                  </Text>
                </Box>
              </TouchableOpacity>
            );
          })}
        </Box>
      </Box>
    );
  }, [assetType]);

  return (
    <Box
      width="100%"
      borderBottomEndRadius={16}
      borderBottomStartRadius={16}
      height={136}
      backgroundColor="rgba(14, 14, 18, 0.50)"
      paddingLeft={24}
      paddingRight={24}
    >
      <Title closeSelectContentModalHandler={closeSelectContentModalHandler} />
      <Box
        width="100%"
        height={56}
        marginTop={24}
        direction="row"
        alignItems="center"
      >
        {navigator}
      </Box>
    </Box>
  );
};



const Title = ({
    closeSelectContentModalHandler,
  }: {
    closeSelectContentModalHandler: () => void;
  }) => {
    return (
      <>
        <Box
          direction="row"
          alignItems="center"
          position="relative"
          justifyContent="center"
          paddingTop={32}
        >
          <Text color={theme.color.light.WHITE} fontSize={16} fontWeight={600}>
            Select content
          </Text>
        </Box>
        <Box width={22} height={17} position="absolute" left={24} top={35}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={closeSelectContentModalHandler}
          >
            <ICON_ARROW_LEFT_SVG />
          </TouchableOpacity>
        </Box>
      </>
    );
  };
  

const NAV_TABS: {
  id: number;
  title: AssetType;
}[] = [
  {
    id: 1,
    title: "Subscribe",
  },
  {
    id: 2,
    title: "Ownership",
  },
];
