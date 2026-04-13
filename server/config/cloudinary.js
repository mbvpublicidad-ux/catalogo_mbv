import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_SECRET_KEY,
	secure: true,
});

export const deleteImage = async (publicId) => {
	try {
		const result = await cloudinary.uploader.destroy(publicId);
		return result;
	} catch (error) {
		console.error("Error deleting image from Cloudinary:", error);
		throw error;
	}
};

export const extractPublicId = (imageUrl) => {
	const matches = imageUrl.match(/\/v\d+\/(.+?)\./);
	return matches ? matches[1] : null;
};

export default cloudinary;
