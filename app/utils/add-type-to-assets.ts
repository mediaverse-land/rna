export  const addTypeToAsset = (assetList, typeId) => {
    const formattedAsset = [];

    assetList.forEach(element => {
        const newElement = {
            ...element,
            type: typeId,
        }

        formattedAsset.push(newElement)
    });

    return formattedAsset;
}