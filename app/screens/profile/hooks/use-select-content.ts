import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export const UseSelectContent = () => {
  const [selectedContents, setSelectedContents] = useState([]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setSelectedContents([]);
      };
    }, [])
  );

  const selectOwnedItemLognPressHandler = (itemId: any) => {
    const findContent = selectedContents.find((f) => f.id === itemId.id);
    if (!findContent) {
      setSelectedContents([...selectedContents, itemId]);
      return;
    }
    // filter repeated contents;
    else {
      removeContentFromSelectedList(itemId);
    }
  };

  const removeContentFromSelectedList = (itemId: any) => {
    const filteredContent = selectedContents.filter((f) => f.id !== itemId.id);
    const newArray = [...filteredContent];
    setSelectedContents(newArray);
  };

  const isSelectedContent = (itemId: number) => {
    const findContent = findSelectedContent(itemId);
    return findContent ? true : false;
  };

  const selectOwnedItemPressHandler = (itemId: any) => {
    if (selectedContents.length === 0) {
      return;
    }

    selectOwnedItemLognPressHandler(itemId);
  };

  const selectBarCloserHandler = () => {
    setSelectedContents([]);
  };

  const findSelectedContent = (itemId: number) =>
    selectedContents.find((f) => f.id === itemId);

  return {
    selectedContents,
    setSelectedContents,
    isSelectedContent,
    selectOwnedItemPressHandler,
    selectOwnedItemLognPressHandler,
    selectBarCloserHandler,
  };
};
