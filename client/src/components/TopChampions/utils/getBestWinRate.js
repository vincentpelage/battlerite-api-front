const getBestWinRate = (arrayOfObjChampion) => {
  return arrayOfObjChampion.reduce((max, champion) => champion.winrate > max ? champion.winrate : max, data[0].winrate);
};

// https://codeburst.io/javascript-finding-minimum-and-maximum-values-in-an-array-of-objects-329c5c7e22a2
