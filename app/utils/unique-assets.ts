export const uniqueAssetArray = (combinedData: any) => {
  const unique = combinedData.filter(
    (item: any, index: any, self: any) =>
      index === self.findIndex((t: any) => t.id === item.id)
  );
  return unique;
};
