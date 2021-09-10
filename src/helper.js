import { COMMON_HEADERS } from "./constants";

export const formatData = (input) => {
  const data = JSON.parse(input.replace(/\bNaN\b/g, "null"));
  const commonHeadersList = COMMON_HEADERS;
  const inputHeaders = Object.keys(data[0]);
  let headersList = [];
  commonHeadersList.forEach((header) => {
    if (inputHeaders.includes(header)) headersList.push(header);
  });

  const formattedData = data.map((item) => {
    let innerObject = {};
    headersList.forEach((header) => {
      return (innerObject[header] = item[header]);
    });
    return innerObject;
  });
  console.log("formatData");
  console.log(formattedData);
  return { headers: headersList, output: formattedData };
};
