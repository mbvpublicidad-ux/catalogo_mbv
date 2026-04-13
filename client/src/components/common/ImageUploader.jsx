import Button from "./Button";

import { useState } from "react";
import Icon from "./Icon";

const ImageUploader = ({
	images = [],
	onImagesChange,
	onImageRemove,
	maxImages = 5,
}) => {
	const [isToBig, setIsToBig] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [dragActive, setDragActive] = useState(false);

	const uploadToCloudinary = async (file) => {
		const formData = new FormData();
		formData.append("file", file);
		formData.append(
			"upload_preset",
			import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
		);

		try {
			const response = await fetch(
				`https://api.cloudinary.com/v1_1/${
					import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
				}/image/upload`,
				{
					method: "POST",
					body: formData,
				}
			);

			if (!response.ok) {
				throw new Error("Error uploading image");
			}

			const data = await response.json();
			return data.secure_url;
		} catch (error) {
			console.error("Error uploading to Cloudinary:", error);
			throw error;
		}
	};

	const handleFileSelect = async (files) => {
		let filesArray = Array.from(files);
		const maxFileSize = 10 * 1024 * 1024; // 10 MB
		const allowedTypes = ["image/jpg", "image/png", "image/jpeg", "image/webp"];

		const fileTypes = filesArray.filter((file) =>
			allowedTypes.includes(file.type)
		);

		if (fileTypes.length === 0 && files.length > 0) {
			alert("Solo los formatos JPEG, JPG, WEBP y PNG son permitidos");
			return;
		}

		if (images.length + files.length > maxImages) {
			alert(`Máximo ${maxImages} imágenes permitidas`);
			return;
		}

		const oversizedFiles = filesArray.filter((file) => file.size > maxFileSize);

		if (oversizedFiles.length > 0) {
			setIsToBig(true);
			return;
		}

		setIsToBig(false);

		setUploading(true);
		try {
			const uploadPromises = Array.from(files).map((file) =>
				uploadToCloudinary(file)
			);
			const newImageUrls = await Promise.all(uploadPromises);
			onImagesChange([...images, ...newImageUrls]);
		} catch (error) {
			console.error("Error uploading images:", error);
			alert("Error al subir las imágenes");
		} finally {
			setUploading(false);
		}
	};

	const handleDrop = (e) => {
		e.preventDefault();
		setDragActive(false);
		const files = e.dataTransfer.files;
		if (files.length > 0) {
			handleFileSelect(files);
		}
	};

	const handleDragOver = (e) => {
		e.preventDefault();
		setDragActive(true);
	};

	const handleDragLeave = (e) => {
		e.preventDefault();
		setDragActive(false);
	};

	const removeImage = async (index) => {
		const imageUrlToRemove = images[index];
		const newImages = images.filter((_, i) => i !== index);

		if (onImageRemove) {
			try {
				await onImageRemove(imageUrlToRemove);
			} catch (error) {
				console.error("Error deleting the image from Cloudinary:", error);
			}
		}

		onImagesChange(newImages);
	};

	return (
		<div className="space-y-4">
			<div
				className={`flex flex-col items-center gap-2 border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
					dragActive ? "border-first" : "border-third hover:border-first"
				}`}
				onDrop={handleDrop}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
			>
				<Icon name={"images"} />
				<p className="text-first mb-2">
					Arrastra las imágenes aquí o haz clic para seleccionar
				</p>
				<p className="text-sm text-third mb-4">
					Máximo {maxImages} imágenes. Formatos: JPEG, JPG, PNG, WebP (max 10MB
					cada una)
				</p>
				<input
					type="file"
					multiple
					accept="image/*"
					onChange={(e) => handleFileSelect(e.target.files)}
					className="hidden"
					id="image-upload"
					disabled={uploading || images.length >= maxImages}
				/>
				<label htmlFor="image-upload">
					<Button
						type="button"
						text={uploading ? "Subiendo..." : "Seleccionar imágenes"}
						color="green"
						isLoading={uploading}
						disabled={uploading || images.length >= maxImages}
						onClick={() => document.getElementById("image-upload").click()}
					/>
				</label>
			</div>

			{isToBig && (
				<div>
					<p className="text-center text-error font-bold">
						Uno o mas archivos sobrepasan los 10MB
					</p>
				</div>
			)}

			{images.length > 1 && (
				<div className="flex items-center gap-2 mb-2">
					<label className="text-first text-sm">
						Selecciona la imagen principal:
					</label>
					<select
						className="bg-first text-main font-semibold border border-first rounded px-2 py-1"
						value={0}
						onChange={(e) => {
							const selectedIndex = parseInt(e.target.value, 10);
							const newImages = [
								images[selectedIndex],
								...images.filter((_, i) => i !== selectedIndex),
							];
							onImagesChange(newImages);
						}}
					>
						{images.map((img, idx) => (
							<option key={idx} value={idx}>
								{idx + 1}
							</option>
						))}
					</select>
				</div>
			)}

			{images.length > 0 && (
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
					{images.map((imageUrl, index) => (
						<div key={index} className="relative group">
							<img
								src={imageUrl}
								alt={`Preview ${index + 1}`}
								className="w-full h-32 object-cover rounded-lg border border-third"
							/>
							<button
								type="button"
								onClick={() => removeImage(index)}
								className="absolute -top-2 -right-2 bg-error text-first rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
							>
								{/* <Icon path="M6 18L18 6M6 6l12 12" classes="h-3 w-3" /> */}
							</button>
							{index === 0 && (
								<div className="absolute bottom-2 left-2 bg-first text-second font-medium text-xs px-2 py-1 rounded">
									Principal
								</div>
							)}
						</div>
					))}
				</div>
			)}

			<p className="text-sm text-third">
				{images.length}/{maxImages} imágenes seleccionadas
				{images.length > 0 && " (La primera será la imagen principal)"}
			</p>
		</div>
	);
};

export default ImageUploader;
