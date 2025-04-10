const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        cityId: {
            type: Schema.Types.ObjectId,
            ref: "City",
        },
        stateId: {
            type: Schema.Types.ObjectId,
            ref: "State",
        },
        areaId: {
            type: Schema.Types.ObjectId,
            ref: "Area",
        },
        pincode: {
            type: Number,
            required: true
            //unique: true // Ensure this is needed; remove if pincode can be duplicated
        },
        imageUrl: {
           type: String,
           required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Event', modelSchema);
