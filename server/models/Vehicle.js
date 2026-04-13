import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema(
	{
		brand: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Brand",
			required: true,
		},
		model: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Model",
			required: true,
		},
		year: {
			type: Number,
			required: true,
		},
		currency: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		transmission: {
			type: String,
			required: true,
		},
		cartype: {
			type: String,
			required: true,
		},
		images: [
			{
				type: String,
				required: true,
			},
		],
		ticket: {
			type: String,
			required: false,
		},
		color: {
			type: String,
			required: false,
		},
		traction: {
			type: String,
			required: false,
		},
		fuel: {
			type: String,
			required: false,
		},
		cylinder: {
			type: String,
			required: false,
		},
		mileage: {
			type: Number,
			required: false,
		},
		description: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Vehicle", VehicleSchema, "vehicles");
