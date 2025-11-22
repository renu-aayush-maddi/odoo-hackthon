import mongoose from "mongoose";

const stockItemSchema = new mongoose.Schema(
  {
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    onHand: {
      type: Number,
      default: 0,
    },
    reserved: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

stockItemSchema.virtual("freeToUse").get(function () {
  return this.onHand - this.reserved;
});

stockItemSchema.set("toJSON", { virtuals: true });
stockItemSchema.set("toObject", { virtuals: true });

stockItemSchema.index({ warehouse: 1, product: 1 }, { unique: true });

const StockItem = mongoose.model("StockItem", stockItemSchema);
export default StockItem;
