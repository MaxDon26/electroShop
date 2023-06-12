const Service = require("../services/product.service");
const fileService = require("../services/file.service");

exports.getProductNames = async function (req, res) {
  try {
    const content = await Service.getProductsName();
    return res.status(200).json({
      status: 200,
      content,
      message: "Succesfully product Retrieved",
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.getProductList = async function (req, res) {
  const page = req.params.page ? req.params.page : 1;
  const limit = req.params.limit ? req.params.limit : 10;
  const params = req.query;

  try {
    const content = await Service.getProductList(params, page, limit);
    return res.status(200).json({
      status: 200,
      content,
      message: "Succesfully product Retrieved",
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.addProduct = async function (req, res) {
  try {
    const image = fileService.fileSave(req.files);
    const newProduct = { ...req.body, image };
    const content = await Service.addProduct(newProduct);
    return res.status(200).json({
      status: 200,
      content,
      message: "Продукт добавлен!",
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

exports.removeProduct = async function (req, res) {
  const id = req.body.id;

  try {
    const content = await Service.removeProduct(id);
    return res.status(200).json({
      status: 200,
      content,
      message: "Продукт удален!",
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

exports.updateProduct = async function (req, res) {
  const id = req.params.id;

  try {
    const image = fileService.fileSave(req.files);

    const content = await Service.updateProduct(id, {
      ...req.body,
      image,
    });
    return res.status(200).json({
      status: 200,
      content,
      message: "Продукт обновлен!",
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
