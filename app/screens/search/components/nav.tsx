import { FC } from "react";
import { Box } from "../../../components/box";
import { ActiveNav } from "../../channel-management/types";
import { Nav } from "../../../components/nav";

type Props = {
  activeNav: ActiveNav;
  setActiveNav: (nav: ActiveNav) => void;
};

export const SearchPageNav: FC<Props> = ({ activeNav, setActiveNav }) => {
  return (
    <Box width="100%" height={50} top={109}>
      <Nav
        setActiveNav={setActiveNav}
        activeNav={activeNav}
        hasFullWidth
        bgColor="#2b2b48"
      />
    </Box>
  );
};
