import mongoose from "mongoose";
import Warehouse from "./warehouse.model.js";

const operationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["receipt", "delivery", "adjustment"],
      required: true,
    },
    reference: {
      type: String, // WH/IN/0001
      unique: true,
    },
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
      required: true,
    },
    fromParty: String, // vendor / customer / location text
    toParty: String,
    contact: String,
    scheduleDate: Date,
    status: {
      type: String,
      enum: ["draft", "ready", "done"],
      default: "draft",
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// auto-generate reference like WH1/IN/001
operationSchema.pre("save", async function (next) {
  try {
    if (this.reference) return next();

    const warehouse = await Warehouse.findById(this.warehouse);
    if (!warehouse) {
      return next(new Error("Warehouse not found for operation"));
    }

    const typeCode =
      this.type === "receipt"
        ? "IN"
        : this.type === "delivery"
        ? "OUT"
        : "ADJ";

    const count = await this.constructor.countDocuments({
      warehouse: this.warehouse,
      type: this.type,
    });

    const seq = String(count + 1).padStart(3, "0");
    this.reference = `${warehouse.code}/${typeCode}/${seq}`;
    next();
  } catch (err) {
    next(err);
  }
});

const Operation = mongoose.model("Operation", operationSchema);
export default Operation;
