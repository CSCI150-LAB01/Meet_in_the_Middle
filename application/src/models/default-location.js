import mongoose, { Schema, models} from "mongoose";

const defaultLocationSchema= Schema({
    _id: mongoose.Schema.Types.ObjectId,
    //name: {type: String},
    //address_street: {type: String},
    //address_city: {type: String},
    //address_state: {type: String},
    //address_zip: {type: String},
    //coordinates: {type: [Number], index: "2dsphere", required: true}
    coordinates: { type: [Number], index: "2dsphere", required: true }

});

const DefaultLocation = models.DefaultLocation || mongoose.model("DefaultLocation", defaultLocationSchema);

export default DefaultLocation;