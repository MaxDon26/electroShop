import httpService from "./http.service";

const vendorEndpoint = "vendor/";

const vendorService = {
  get: async () => {
    const { data } = await httpService.get(vendorEndpoint);
    return data;
  },
};
export default vendorService;
