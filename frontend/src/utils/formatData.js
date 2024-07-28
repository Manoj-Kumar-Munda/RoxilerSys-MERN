const arr = new Array(9).fill(0).map((item, index) => {
  if (index === 8) {
    return {
      name: "900 above",
      itemCount: 0,
    };
  }
  return {
    name: `${index * 100}-${(index + 1) * 100}`,
    itemCount: 0,
  };
});

export const formatBarChartData = (data) => {
  const stored = [...arr];
  data.forEach((item) => {
    const index = parseInt(item._id / 100);
    if (!index) {
      stored[8] = { name: "900 above", itemCount: 0 };
      return;
    }
    stored[index].itemCount = item.itemsCount;
  });
  return stored;
};
