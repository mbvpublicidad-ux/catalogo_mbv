import mongoose from "mongoose";
import Model from "../../models/Model.js";
import Brand from "../../models/Brand.js";
import Vehicle from "../../models/Vehicle.js";

import { deleteImage, extractPublicId } from "../../config/cloudinary.js";

const brandResolvers = {
	Brand: {
		models: async (parent) => await Model.find({ brand: parent.id }),
		vehicles: async (parent) => await Vehicle.find({ brand: parent.id }),
	},

	Query: {
		brand: async (_, { id }) => {
			const brand = await Brand.findById(id);
			if (!brand) throw new Error("Brand does not exist");
			return brand;
		},
		brands: async (_) => await Brand.find(),
	},

	Mutation: {
		createBrand: async (_, { name }, { user }) => {
			if (!user) throw new Error("Authentication required");

			const trimedName = name?.trim();
			if (!name || typeof name !== "string" || trimedName.length === 0) {
				throw new Error(
					"Brand name is required, also must be a string and cannot be empty"
				);
			}

			const brandExists = await Brand.findOne({ name: trimedName });
			if (brandExists) throw new Error("Brand already exists");

			const newBrand = new Brand({ name: trimedName });
			return await newBrand.save();
		},
		updateBrand: async (_, { id, name }, { user }) => {
			if (!user) throw new Error("Authentication required");
			if (!mongoose.Types.ObjectId.isValid(id)) {
				throw new Error("Invalid format ID");
			}

			const trimedName = name?.trim();
			if (!name || typeof name !== "string" || trimedName.length === 0) {
				throw new Error(
					"Brand name is required, also must be a string and cannot be empty"
				);
			}

			const updatedBrand = await Brand.findByIdAndUpdate(
				id,
				{ name: trimedName },
				{ new: true, runValidators: true }
			);
			if (!updatedBrand) throw new Error("No brand was found to update");
			return updatedBrand;
		},
		deleteBrand: async (_, { id }, { user }) => {
			if (!user) throw new Error("Authentication required");
			if (!mongoose.Types.ObjectId.isValid(id)) {
				throw new Error("Invalid format ID");
			}

			const deletedBrand = await Brand.findByIdAndDelete(id);
			if (!deletedBrand) {
				throw new Error("No brand was found to delete");
			}

			const vehiclesToDelete = await Vehicle.find({ brand: id });

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
					"Error deleting images from Cloudinary for deleted brand"
				);
			}

			await Promise.all([
				Model.deleteMany({ brand: id }),
				Vehicle.deleteMany({ brand: id }),
			]);

			return {
				success: true,
				message: "Brand succesfuly deleted",
			};
		},
	},
};

export default brandResolvers;
