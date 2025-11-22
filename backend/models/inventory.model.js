import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
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

inventorySchema.index({ product: 1, warehouse: 1 }, { unique: true });

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;
