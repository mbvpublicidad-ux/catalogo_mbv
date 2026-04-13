import mongoose from "mongoose";
import Brand from "../../models/Brand.js";
import Model from "../../models/Model.js";
import Vehicle from "../../models/Vehicle.js";

import { deleteImage, extractPublicId } from "../../config/cloudinary.js";

const modelResolvers = {
	Model: {
		brand: async (parent) => await Brand.findById(parent.brand),
		vehicles: async (parent) => await Vehicle.find({ model: parent.id }),
	},

	Query: {
		model: async (_, { id }) => {
			const model = await Model.findById(id);
			if (!model) throw new Error("Model does not exist");
			return model;
		},
		models: async (_) => await Model.find(),
	},

	Mutation: {
		createModel: async (_, { name, brand }, { user }) => {
			if (!user) throw new Error("Authentication required");
			if (
				!brand ||
				typeof brand !== "string" ||
				!mongoose.Types.ObjectId.isValid(brand)
			) {
				throw new Error(
					"Brand ID is required, also must be a string and a valid ID format"
				);
			}

			const brandExists = await Brand.findById(brand);
			if (!brandExists) throw new Error("Brand does not exist");

			const trimedName = name?.trim();
			if (!name || typeof name !== "string" || trimedName.length === 0) {
				throw new Error(
					"Model name is required, also must be a string and cannot be empty"
				);
			}

			const modelExists = await Model.findOne({ name: trimedName });
			if (modelExists) throw new Error("Model already exists");

			const newModel = new Model({ name: trimedName, brand });
			return await newModel.save();
		},
		updateModel: async (_, { id, name }, { user }) => {
			if (!user) throw new Error("Authentication required");
			if (!mongoose.Types.ObjectId.isValid(id)) {
				throw new Error("Invalid format ID");
			}

			const trimedName = name?.trim();
			if (!name || typeof name !== "string" || trimedName.length === 0) {
				throw new Error(
					"Model name is required, also must be a string and cannot be empty"
				);
			}

			const updatedModel = await Model.findByIdAndUpdate(
				id,
				{ name: trimedName },
				{ new: true, runValidators: true }
			);
			if (!updatedModel) throw new Error("No model was found to update");
			return updatedModel;
		},
		deleteModel: async (_, { id }, { user }) => {
			if (!user) throw new Error("Authentication required");
			if (!mongoose.Types.ObjectId.isValid(id)) {
				throw new Error("Invalid format ID");
			}

			const deletedModel = await Model.findByIdAndDelete(id);
			if (!deletedModel) throw new Error("No model was found to delete");

			const vehiclesToDelete = await Vehicle.find({ model: id });

			const imageDeletePromises = [];

			vehiclesToDelete.forEach((vehicle) => {
				if (vehicle.images && vehicle.images.length > 0) {
					vehicle.images.forEach((imageUrl) => {
						const publicId = extractPublicId(imageUrl);
						if (publicId) {
							imageDeletePromises.push(deleteImage(publicId));
						}
					});
				}
			});

			try {
				await Promise.all(imageDeletePromises);
			} catch (error) {
				console.error(
					"Error deleting images from Cloudinary for deleted model"
				);
			}

			await Promise.all([Vehicle.deleteMany({ model: id })]);

			return {
				success: true,
				message: "Model successfully deleted",
			};
		},
	},
};

export default modelResolvers;
