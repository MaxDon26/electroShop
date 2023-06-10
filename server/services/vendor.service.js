const Model = require("../models/Vendor");

exports.getList = async function (query) {
  try {
    const data = await Model.find(query);
    return data;
  } catch (error) {
    throw Error("Error with category");
  }
};
