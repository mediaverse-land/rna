import { View } from "react-native";
import { SearchParam } from ".";
import { useMemo, useState } from "react";
import { ActiveNav } from "../channel-management/types";
import { SearchResult } from "./search-result";
import { SearchPageNav } from "./components/nav";

type Props = { searchParams: SearchParam };

export type SearchObjectProperty = Record<string, number | string>;
export type SearchObject = Record<string, SearchObjectProperty>;

const searchItems: SearchObject = {
  All: {
    type: "All",
  },
  Images: {
    type: 2,
  },
  Videos: {
    type: 4,
  },
  Sounds: {
    type: 3,
  },
  Texts: {
    type: 1,
  },
};

export function Navigator({ searchParams }: Props) {
  const [activeNav, setActiveNav] = useState<ActiveNav>("All");

  const searchObject = useMemo<SearchObjectProperty>(() => {
    return searchItems[activeNav];
  }, [activeNav]);

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <SearchPageNav activeNav={activeNav} setActiveNav={setActiveNav} />

      <SearchResult searchObject={searchObject} searchParams={searchParams} />
    </View>
  );
}