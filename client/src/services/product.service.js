import httpService from "./http.service";

const productEndpoint = "products";

const productService = {
  getPupular: async () => {
    const { data } = await httpService.get(productEndpoint, {
      params: {
        popular: true,
      },
    });
    return data;
  },
  getFiltredProduct: async (filter) => {
    const { data } = await httpService.get(productEndpoint, {
      params: {
        ...filter,
      },
    });
    return data;
  },
  getProductsNames: async () => {
    const { data } = await httpService.get(productEndpoint + "/names");
    return data;
  },
};
export default productService;
