const Model = require("../models/User");

exports.getUser = async function (id) {
  try {
    const data = await Model.findById(id);
    return data;
  } catch (error) {
    throw Error("Error with category");
  }
};
