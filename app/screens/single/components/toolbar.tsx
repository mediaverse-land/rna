import { TouchableOpacity } from "react-native";
import { Box } from "../../../components/box";

type Props = {
  id: number;
  icon: any;
  isDisable?: boolean,
  func: (...args: any) => void;
};

export const Toolbar = ({ toolbarList }: { toolbarList: Props[] }) => {
  return (
    <>
      <Box
        id="tool-bar"
        width="100%"
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        marginTop={8}
      >
        {toolbarList.map((f) => {
          if(f.isDisable){
            return
          }
          return (<TouchableOpacity
            key={f.id}
            activeOpacity={1}
            onPress={async() => {
                f.func();
            }}
          >
            <Box
              // width={40}
              marginLeft={16}
              justifyContent="center"
              alignItems="center"
              height={40}
            >
              {f.icon}
            </Box>
          </TouchableOpacity>)
        })}
      </Box>
    </>
  );
};
