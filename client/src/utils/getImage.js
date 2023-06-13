import config from "../config.json";

export const getImageUrl = (img) => {
  const baseUrl = config.apiEndpoint.slice(
    0,
    config.apiEndpoint.indexOf("api")
  );

  return baseUrl + img;
};
