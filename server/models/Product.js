const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    popular: Boolean,
    price: Number,
    image: [{ type: String }],
    color: { type: String, enum: ["white", "black", "silver"] },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
    description: { type: Object },
  },
  { timestamps: true }
);

module.exports = model("Product", schema);
