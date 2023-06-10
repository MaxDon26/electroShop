const Model = require("../models/Category");

exports.getList = async function (query) {
  try {
    const data = await Model.find(query);
    return data;
  } catch (error) {
    throw Error("Error with category");
  }
};
