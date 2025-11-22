import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true, // e.g. WH1, WH/Stock1
      trim: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    city: String,
    state: String,
    country: String,
    pincode: String,
    description: String,
  },
  { timestamps: true }
);

const Warehouse = mongoose.model("Warehouse", warehouseSchema);
export default Warehouse;
