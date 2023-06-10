const Model = require("../models/Product");

exports.getProductList = async function (query) {
  try {
    const data = await Model.find(query);
    return data;
  } catch (error) {
    throw Error("Error with category");
  }
};

exports.getProduct = async function (id) {
  try {
    const data = await Model.findById(id);
    return data;
  } catch (error) {
    throw Error("Error with category");
  }
};

exports.addProduct = async function (payload) {
  try {
    const clone = await Model.find(payload);
    if (clone.length !== 0) {
      throw Error("Ошибка добавления товара. Такой товар уже существует");
    }
    const newProduct = await Model.create(payload);
    return newProduct;
  } catch (error) {
    throw Error(error.message);
  }
};

exports.removeProduct = async function (id) {
  try {
    await Model.findByIdAndRemove(id);
    return null;
  } catch (error) {
    throw Error("Ошибка удаления товара");
  }
};
