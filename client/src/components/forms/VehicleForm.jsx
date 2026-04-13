import ImageUploader from "../common/ImageUploader";
import Loading from "../common/Loading";
import Button from "../common/Button";

import { useEffect, useState } from "react";
import { useAlert } from "../../hooks/AlertContext";
import { GET_MODELS } from "../../graphql/model/ModelQuerys";
import { GET_BRANDS } from "../../graphql/brand/BrandQuerys";
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_VEHICLES } from "../../graphql/vehicle/VehicleQuerys";
import {
	CREATE_VEHICLE,
	UPDATE_VEHICLE,
	DELETE_VEHICLE_IMAGE,
} from "../../graphql/vehicle/VehicleMutations";
import Icon from "../common/Icon";

const VehicleForm = ({
	onClose,
	formTitle,
	onDone,
	vehicle = null,
	isUpdate = false,
}) => {
	const classes = {
		form: "w-full max-w-2xl overflow-hidden rounded-lg bg-gradient-to-b from-main to-second text-first max-h-[90vh] overflow-y-auto animate-slide-in",
		input:
			"w-full rounded-lg border border-first p-2.5 text-sm text-first bg-second placeholder-first focus:outline-none focus:border-none focus:ring-2 focus:ring-red-300",
		label: "mb-2 block text-sm font-medium",
	};

	const { showAlert } = useAlert();

	const { data: brandsData, loading: brandsLoading } = useQuery(GET_BRANDS);
	const { data: modelsData, loading: modelsLoading } = useQuery(GET_MODELS);
	const brands = brandsData?.brands || [];
	const models = modelsData?.models || [];

	const [createVehicle, { loading: createLoading }] = useMutation(
		CREATE_VEHICLE,
		{
			refetchQueries: [{ query: GET_VEHICLES }],
			awaitRefetchQueries: true,
			onCompleted: () => {
				showAlert("Vehículo creado exitosamente", "Guardado", "success");
				setFormData(initialFormData);
				onDone();
			},
			onError: (error) => {
				showAlert("No se pudo crear el vehículo", "Error", "error");
				console.error(error.message);
			},
		}
	);

	const [updateVehicle, { loading: updateLoading }] = useMutation(
		UPDATE_VEHICLE,
		{
			refetchQueries: [{ query: GET_VEHICLES }],
			awaitRefetchQueries: true,
			onCompleted: () => {
				showAlert(
					"Vehículo actualizado exitosamente",
					"Actualizado",
					"success"
				);
				onDone();
			},
			onError: (error) => {
				showAlert("No se pudo actualizar el vehículo", "Error", "error");
				console.error(error.message);
			},
		}
	);

	const [deleteVehicleImage, { loading: deleteImageLoading }] = useMutation(
		DELETE_VEHICLE_IMAGE,
		{
			onError: (error) => {
				showAlert("No se pudo eliminar la imagen");
				console.error(error.message);
			},
		}
	);

	const initialFormData = {
		brand: "",
		model: "",
		year: "",
		currency: "",
		price: "",
		transmission: "",
		cartype: "",
		images: [],
		ticket: "",
		color: "",
		traction: "",
		fuel: "",
		cylinder: "",
		mileage: "",
		description: "",
	};

	const [formData, setFormData] = useState(initialFormData);

	const brandModels = formData.brand
		? brands.find((b) => b.name === formData.brand).models
		: [];

	useEffect(() => {
		if (isUpdate) {
			setFormData({
				brand: vehicle.brand?.name || "",
				model: vehicle.model?.name || "",
				year: vehicle.year?.toString() || "",
				currency: vehicle.currency || "",
				price: vehicle.price?.toString() || "",
				transmission: vehicle.transmission || "",
				cartype: vehicle.cartype || "",
				images: vehicle.images || [],
				ticket: vehicle.ticket || "",
				color: vehicle.color || "",
				traction: vehicle.traction || "",
				fuel: vehicle.fuel || "",
				cylinder: vehicle.cylinder || "",
				mileage: vehicle.mileage?.toString() || "",
				description: vehicle.description || "",
			});
		}
	}, [isUpdate, vehicle]);

	const handleImageRemove = async (imageUrl) => {
		try {
			await deleteVehicleImage({ variables: { imageUrl: imageUrl } });
		} catch (error) {
			console.error("Error removing image:", error);
			throw error;
		}
	};

	const handleRemoveAllImages = async () => {
		if (formData.images.length > 0) {
			const deletePromises = formData.images.map((imageUrl) =>
				handleImageRemove(imageUrl)
			);
			try {
				await Promise.all(deletePromises);
			} catch (error) {
				console.error("Erro deleting al images:", error);
			}
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			!formData.brand ||
			!formData.model ||
			!formData.year ||
			!formData.currency ||
			!formData.price ||
			!formData.transmission ||
			!formData.cartype
		) {
			showAlert(
				"Rellena todos los campos obligatorios",
				"Campos sin llenar",
				"error"
			);
			return;
		}

		if (!formData.images || formData.images.length === 0) {
			showAlert("Debes subir al menos una imagen", "Sin imagenes", "error");
			return;
		}

		try {
			const inputData = {
				...formData,
				brand: brands.find((b) => b.name === formData.brand).id,
				model: models.find((m) => m.name === formData.model).id,
				year: parseInt(formData.year),
				price: parseFloat(formData.price),
				mileage: parseFloat(formData.mileage),
			};

			if (isUpdate) {
				await updateVehicle({
					variables: { id: vehicle.id, input: inputData },
				});
			} else {
				await createVehicle({
					variables: {
						input: inputData,
					},
				});
			}
		} catch (error) {
			console.error("Error on submit:", error.message);
		}
	};

	const handleCancel = async () => {
		if (!isUpdate) await handleRemoveAllImages();
		onClose();
	};

	const mapFunction = (items) => {
		return items.map((item) => (
			<option key={item.id} value={item.name}>
				{item.name}
			</option>
		));
	};

	return (
		<div className="fixed bg-second/50 backdrop-blur-sm inset-0 z-50 flex items-center justify-center p-4">
			<form onSubmit={handleSubmit} className={classes.form}>
				<div className="flex items-center justify-between rounded-t border-b border-first/40 py-2 px-6">
					<h3 className="text-xl font-semibold">{formTitle}</h3>
					<Button
						type={"button"}
						onClick={onClose}
						icon={<Icon name={"close"} size={"5"} />}
					/>
				</div>

				<div className="space-y-4 p-6">
					<div className="grid gap-4 sm:grid-cols-2">
						<div>
							<label htmlFor="brand" className={classes.label}>
								Marca *
							</label>
							<select
								onChange={handleChange}
								name="brand"
								id="brand"
								className={classes.input}
								value={formData.brand}
								required
							>
								{brandsLoading && (
									<option value={""}>
										<Loading />
									</option>
								)}
								<option value="">Seleccionar</option>
								{brands.map((brand) => (
									<option key={brand.id} value={brand.name}>
										{brand.name}
									</option>
								))}
							</select>
						</div>
						<div>
							<label htmlFor="model" className={classes.label}>
								Modelo *
							</label>
							<select
								onChange={handleChange}
								name="model"
								id="model"
								className={classes.input}
								value={formData.model}
								required
							>
								{modelsLoading && (
									<option value={""}>
										<Loading />
									</option>
								)}
								<option value="">Seleccionar</option>
								{formData.brand
									? mapFunction(brandModels)
									: mapFunction(models)}
							</select>
						</div>
						<div>
							<label htmlFor="year" className={classes.label}>
								Año *
							</label>
							<input
								onChange={handleChange}
								name="year"
								type="number"
								id="year"
								className={classes.input}
								placeholder="2024"
								value={formData.year}
								required
							/>
						</div>
						<div>
							<label htmlFor="currency" className={classes.label}>
								Moneda *
							</label>
							<select
								onChange={handleChange}
								name="currency"
								id="currency"
								className={classes.input}
								value={formData.currency}
								required
							>
								<option value="">Seleccionar</option>
								<option value="USD">USD</option>
								<option value="CRC">CRC</option>
							</select>
						</div>
						<div>
							<label htmlFor="price" className={classes.label}>
								Precio *
							</label>
							<input
								onChange={handleChange}
								name="price"
								type="number"
								id="price"
								className={classes.input}
								placeholder="25000.00"
								value={formData.price}
								required
							/>
						</div>
						<div>
							<label htmlFor="transmission" className={classes.label}>
								Transmisión *
							</label>
							<select
								onChange={handleChange}
								name="transmission"
								id="transmission"
								className={classes.input}
								value={formData.transmission}
								required
							>
								<option value="">Seleccionar</option>
								<option value="Automatico">Automático</option>
								<option value="Manual">Manual</option>
								<option value="Shiftronic">Shiftronic</option>
							</select>
						</div>
						<div>
							<label htmlFor="cartype" className={classes.label}>
								Tipo de carro *
							</label>
							<select
								onChange={handleChange}
								name="cartype"
								id="cartype"
								className={classes.input}
								value={formData.cartype}
								required
							>
								<option value="">Seleccionar</option>
								<option value="Sedan">Sedán</option>
								<option value="SUV">SUV</option>
								<option value="Hatchback">Hatchback</option>
								<option value="Pickup">Pickup</option>
							</select>
						</div>
						<div className="sm:col-span-2">
							<label htmlFor="images" className={classes.label}>
								Imágenes del vehículo *
							</label>
							<ImageUploader
								images={formData.images}
								onImagesChange={(newImages) =>
									setFormData({ ...formData, images: newImages })
								}
								onImageRemove={handleImageRemove}
								maxImages={5}
							/>
							{deleteImageLoading && <Loading />}
						</div>
						<div>
							<label htmlFor="ticket" className={classes.label}>
								Ticket
							</label>
							<input
								onChange={handleChange}
								name="ticket"
								type="text"
								id="ticket"
								className={classes.input}
								placeholder="T12345"
								value={formData.ticket}
							/>
						</div>
						<div>
							<label htmlFor="color" className={classes.label}>
								Color
							</label>
							<input
								onChange={handleChange}
								name="color"
								type="text"
								id="color"
								className={classes.input}
								placeholder="Rojo"
								value={formData.color}
							/>
						</div>
						<div>
							<label htmlFor="traction" className={classes.label}>
								Tracción
							</label>
							<select
								onChange={handleChange}
								name="traction"
								id="traction"
								className={classes.input}
								value={formData.traction}
							>
								<option value="">Seleccionar</option>
								<option value="FWD">FWD</option>
								<option value="RWD">RWD</option>
								<option value="AWD">AWD</option>
								<option value="2WD">2WD</option>
								<option value="4WD">4WD</option>
								<option value="4x2">4x2</option>
								<option value="4x4">4x4</option>
							</select>
						</div>
						<div>
							<label htmlFor="fuel" className={classes.label}>
								Combustible
							</label>
							<select
								onChange={handleChange}
								name="fuel"
								id="fuel"
								className={classes.input}
								value={formData.fuel}
							>
								<option value="">Seleccionar</option>
								<option value="Gasolina">Gasolina</option>
								<option value="Diesel">Diésel</option>
								<option value="Eléctrico">Eléctrico</option>
								<option value="Gas">Gas</option>
								<option value="Híbrido">Híbrido</option>
							</select>
						</div>
						<div>
							<label htmlFor="cylinder" className={classes.label}>
								Cilindros
							</label>
							<input
								onChange={handleChange}
								name="cylinder"
								type="text"
								id="cylinder"
								className={classes.input}
								placeholder="4-Cylinder"
								value={formData.cylinder}
							/>
						</div>
						<div>
							<label htmlFor="mileage" className={classes.label}>
								Kilometraje
							</label>
							<input
								onChange={handleChange}
								name="mileage"
								type="number"
								id="mileage"
								className={classes.input}
								placeholder="15000.5"
								value={formData.mileage}
							/>
						</div>
						<div className="sm:col-span-2">
							<label htmlFor="description" className={classes.label}>
								Descripción
							</label>
							<textarea
								onChange={handleChange}
								name="description"
								id="description"
								rows="4"
								className={classes.input}
								placeholder="Escribe la descripción del vehículo aquí..."
								value={formData.description}
							></textarea>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-center space-x-2 rounded-b border-t border-first/40 p-6">
					<Button
						type={"submit"}
						color="green"
						text={isUpdate ? "Actualizar" : "Crear"}
						isLoading={createLoading || updateLoading}
						disabled={createLoading || updateLoading}
					/>
					<Button
						type={"button"}
						color="red"
						text={"Cancelar"}
						onClick={handleCancel}
						isLoading={createLoading || updateLoading}
						disabled={createLoading || updateLoading}
					/>
				</div>
			</form>
		</div>
	);
};

export default VehicleForm;
