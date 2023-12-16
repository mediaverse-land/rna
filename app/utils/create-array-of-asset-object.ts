import { uniqueAssetArray } from './unique-assets';

export const createArrayOfAssetObject = (inputData: any, data: any) => {
  const { videos, texts, audios, images } = inputData;

  const concatedData = [...videos, ...texts, ...audios, ...images];

  const combinedData = [...data, ...concatedData];

  const result = uniqueAssetArray(combinedData);

  return result;
};
