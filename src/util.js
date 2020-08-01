import numeral from "numeral";

//Sort table highest case
export const sortTable = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

//pretty style number to string for today cases
export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0,0")}` : "+0";

//pretty style number to string for total cases
export const prettyPrintTotalStat = (stat) =>
  stat ? `${numeral(stat).format("0,0")}` : "0";
