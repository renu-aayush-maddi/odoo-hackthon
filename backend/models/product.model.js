import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true, // e.g. DESK001
      trim: true,
    },
    name: {
      type: String,
      required: true,
    },
    unitCost: {
      type: Number,
      required: true,
      default: 0,
    },
    uom: {
      type: String,
      default: "Units",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
