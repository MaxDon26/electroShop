const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: String,
  },
  { timestamps: true }
);

module.exports = model("Vendor", schema);
