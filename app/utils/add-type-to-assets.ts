export const addTypeToAsset = (assetList: any[], typeId: number) => {
  const formattedAsset: any[] = [];

  assetList.forEach((element) => {
    const newElement = {
      ...element,
      type: typeId,
    };

    formattedAsset.push(newElement);
  });

  return formattedAsset;
};
