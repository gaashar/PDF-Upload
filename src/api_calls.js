import { EXTRACT_API, TRAIN_API, CLEAN_DATA_API } from "./constants";

const fetchAPIResults = (action, input = null) => {
  let api_url;
  if (action === "extract") api_url = EXTRACT_API;
  else if (action === "train") api_url = TRAIN_API;
  else if (action === "clean") api_url = CLEAN_DATA_API;

  console.log(input);

  fetch(api_url, { method: "POST", body: JSON.stringify(input) })
    .then((res) => console.log(res))
    // .then((result) => {
    //   console.log(result);
    //   return result;
    // })
    .then((err) => {
      console.log(err);
      return { data: { err: "Something went wrong, Try after sometime" } };
    });
};

export default fetchAPIResults;
