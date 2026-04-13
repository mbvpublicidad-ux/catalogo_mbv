import mongoose from "mongoose";
import Brand from "../../models/Brand.js";
import Model from "../../models/Model.js";
import Vehicle from "../../models/Vehicle.js";
import { deleteImage, extractPublicId } from "../../config/cloudinary.js";

const vehicleResolvers = {
	Vehicle: {
		brand: async (parent) => await Brand.findById(parent.brand),
		model: async (parent) => await Model.findById(parent.model),
	},

	Query: {
		vehicle: async (_, { id }) => {
			const vehicle = await Vehicle.findById(id);
			if (!vehicle) throw new Error("Vehicle not found");
			return vehicle;
		},
		vehicles: async (_) => await Vehicle.find(),
	},

	Mutation: {
		createVehicle: async (_, { input }, { user }) => {
			if (!user) throw new Error("Authentication required");
			if (
				!input.brand ||
				!mongoose.Types.ObjectId.isValid(input.brand) ||
				!input.model ||
				!mongoose.Types.ObjectId.isValid(input.model)
			) {
				throw new Error(
					"Brand and model are required, and must be a valid ID format"
				);
			}

			const brandExists = await Brand.findById(input.brand);
			const modelExists = await Model.findById(input.model);

			if (!brandExists) throw new Error("Brand does not exist");
			if (!modelExists) throw new Error("Model does not exist");

			const newVehicle = new Vehicle(input);
			return await newVehicle.save();
		},
		updateVehicle: async (_, { id, input }, { user }) => {
			if (!user) throw new Error("Authentication required");
			const validId = mongoose.Types.ObjectId.isValid(id);
			if (!validId) throw new Error("Invalid ID format");

			const updatedVehicle = await Vehicle.findByIdAndUpdate(id, input, {
				new: true,
				runValidators: true,
			});
			if (!updatedVehicle) throw new Error("No vehicle was found to update");
			return updatedVehicle;
		},
		deleteVehicle: async (_, { id }, { user }) => {
			if (!user) throw new Error("Authentication required");
			const validId = mongoose.Types.ObjectId.isValid(id);
			if (!validId) throw new Error("Invalid ID format");

			const vehicleToDelete = await Vehicle.findById(id);
			if (!vehicleToDelete) throw new Error("No vehicle was found to delete");

			if (vehicleToDelete.images && vehicleToDelete.images.length > 0) {
				try {
					const deletePromises = vehicleToDelete.images.map(
						async (imageUrl) => {
							const publicId = extractPublicId(imageUrl);
							if (publicId) {
								return deleteImage(publicId);
							}
						}
					);
					await Promise.all(deletePromises);
				} catch (error) {
					console.error("Error deleting images from Cloudinary:", error);
				}
			}

			await Vehicle.findByIdAndDelete(id);

			return {
				success: true,
				message: "Vehicle successfully deleted",
			};
		},
		deleteVehicleImage: async (_, { imageUrl }, { user }) => {
			if (!user) throw new Error("Authentication required");
			if (!imageUrl) throw new Error("Image URL is required");

			const publicId = extractPublicId(imageUrl);

			if (!publicId) {
				return {
					success: false,
					message: "Couldn't extract public ID from URL",
				};
			}

			try {
				await deleteImage(publicId);
				return {
					success: true,
					message: `Image ${publicId} successfully deleted`,
				};
			} catch (error) {
				console.error("Error deleting image in resolver:", error);
				return {
					success: false,
					message: "Failed to delete image from Cloudinary",
				};
			}
		},
	},
};

export default vehicleResolvers;
