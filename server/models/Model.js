import mongoose from "mongoose";

const ModelSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		minLength: 2,
		maxLength: 50,
		trim: true,
	},
	brand: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Brand",
		required: true,
	},
});

export default mongoose.model("Model", ModelSchema, "models");
