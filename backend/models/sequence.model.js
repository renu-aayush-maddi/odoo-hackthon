import mongoose from "mongoose";

const sequenceSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true, // e.g. "WH-IN", "WH-OUT"
  },
  prefix: {
    type: String,
    required: true, // e.g. "WH/IN/"
  },
  value: {
    type: Number,
    default: 0,
  },
});

sequenceSchema.statics.getNext = async function (name, fallbackPrefix) {
  const seq = await this.findOneAndUpdate(
    { name },
    {
      $inc: { value: 1 },
      $setOnInsert: { prefix: fallbackPrefix },
    },
    { new: true, upsert: true }
  );
  return seq;
};

const Sequence = mongoose.model("Sequence", sequenceSchema);
export default Sequence;
