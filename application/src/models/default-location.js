import mongoose, { Schema, models} from "mongoose";

const defaultLocationSchema= Schema({
    _id: mongoose.Schema.Types.ObjectId,
    coordinates: { type: [Number], index: "2dsphere", required: true },
    createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
});

const DefaultLocation = models.DefaultLocation || mongoose.model("DefaultLocation", defaultLocationSchema);

export default DefaultLocation;