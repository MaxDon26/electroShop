const Category = require("../models/Category");
const Vendor = require("../models/Vendor");
const Product = require("../models/Product");
const categoryMock = require("../mock/category.json");
const vendorMock = require("../mock/vendor.json");
const productMock = require("../mock/product.json");

module.exports = async () => {
  const category = await Category.find();
  const vendor = await Vendor.find();
  const product = await Product.find();

  if (categoryMock.length !== category.length) {
    await createInitialEntity(Category, categoryMock);
  }
  if (vendorMock.length !== vendor.length) {
    await createInitialEntity(Vendor, vendorMock);
  }
  if (productMock.length !== product.length) {
    await createInitialEntity(Product, productMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();

  return Promise.all(
    data.map(async (item) => {
      try {
        const newItem = new Model(item);

        await newItem.save();

        return newItem;
      } catch (e) {
        return e;
      }
    })
  );
}
