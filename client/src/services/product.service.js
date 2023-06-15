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
    const newFilter = Object.keys(filter)
      .filter((k) => filter[k])
      .reduce((a, k) => ({ ...a, [k]: filter[k] }), {});

    const { data } = await httpService.get(productEndpoint, {
      params: {
        ...newFilter,
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
