import { Button } from "../../../components/button";
import { ICON_ADD } from "../../../constaints/icons";

export const AddChannelButton = ({ modalOpener }: { modalOpener: () => void }) => {
    return (
      <Button
        varient="flat"
        text="Add channel"
        additionalStyles={{
          height: 56,
        }}
        onpressHandler={modalOpener}
        icon={
          <ICON_ADD
            style={{
              position: "relative",
              top: -3,
            }}
            color="666680"
            width={16}
            height={16}
          />
        }
        size="lg"
      />
    );
  };