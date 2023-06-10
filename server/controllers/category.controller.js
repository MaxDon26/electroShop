const Service = require("../services/category.service");

exports.getList = async function (req, res) {
  const page = req.params.page ? req.params.page : 1;
  const limit = req.params.limit ? req.params.limit : 10;

  try {
    const content = await Service.getList({}, page, limit);
    return res.status(200).json({
      status: 200,
      content,
      message: "Succesfully category Retrieved",
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
exports.getCategory = async function (id) {
  const category = await Service.getCategory(id);

  return category;
};
