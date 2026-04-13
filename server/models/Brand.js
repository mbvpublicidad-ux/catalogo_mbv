import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		minLength: 2,
		maxLength: 50,
		trim: true,
	},
});

export default mongoose.model("Brand", BrandSchema, "brands");
