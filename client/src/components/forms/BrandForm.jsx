import Button from "../common/Button";

import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useAlert } from "../../hooks/AlertContext";
import { GET_BRANDS } from "../../graphql/brand/BrandQuerys";
import { CREATE_BRAND, UPDATE_BRAND } from "../../graphql/brand/BrandMutations";
import { GET_MODELS } from "../../graphql/model/ModelQuerys";
import { GET_VEHICLES } from "../../graphql/vehicle/VehicleQuerys";
import Icon from "../common/Icon";

const BrandForm = ({
	onClose,
	formTitle,
	onDone,
	isUpdate = false,
	brand = null,
}) => {
	const { showAlert } = useAlert();

	const [createBrand, { loading: createLoading }] = useMutation(CREATE_BRAND, {
		refetchQueries: [{ query: GET_BRANDS }],
		awaitRefetchQueries: true,
		onCompleted: () => {
			showAlert("Marca creada exitosamente", "Guardada", "success");
			setFormData(initialFormData);
			onDone();
		},
		onError: (error) => {
			showAlert("Error al crear la marca", "Error", "error");
			console.error(error.message);
		},
	});

	const [updateBrand, { loading: updateLoading }] = useMutation(UPDATE_BRAND, {
		refetchQueries: [
			{ query: GET_BRANDS },
			{ query: GET_MODELS },
			{ query: GET_VEHICLES },
		],
		awaitRefetchQueries: true,
		onCompleted: () => {
			showAlert("Marca actualizada correctamente", "Actualizada", "success");
			onDone();
		},
		onError: (error) => {
			showAlert("Erro al actualizar la marca", "No actualizada", "error");
			console.error(error.message);
		},
	});

	const initialFormData = { name: "" };
	const [formData, setFormData] = useState(initialFormData);

	useEffect(() => {
		if (isUpdate) setFormData({ name: brand.name || "" });
	}, [isUpdate, brand]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.name) {
			showAlert("El nombre es obligatorio", "Campos sin llenar", "error");
			return;
		}

		try {
			if (isUpdate) {
				await updateBrand({ variables: { id: brand.id, ...formData } });
			} else {
				await createBrand({ variables: { ...formData } });
			}
		} catch (error) {
			console.error("Error on submit:", error.message);
		}
	};

	return (
		<div className="fixed bg-second/50 backdrop-blur-sm inset-0 z-50 flex items-center justify-center p-4">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-sm overflow-hidden rounded-lg bg-gradient-to-b from-main to-second text-first max-h-[90vh] overflow-y-auto animate-slide-in"
			>
				<div className="flex items-center justify-between rounded-t border-b border-first/40 py-2 px-6">
					<h3 className="text-xl font-semibold">{formTitle}</h3>
					<Button
						type={"button"}
						
						onClick={onClose}
						icon={<Icon name={"close"} size={"5"} />}
					/>
				</div>

				<div className="p-4">
					<div>
						<label htmlFor="name" className="mb-2 block text-sm font-medium">
							Nombre
						</label>
						<input
							onChange={handleChange}
							name="name"
							type="text"
							id="name"
							className="w-full rounded-lg bg-second border-2 border-first p-2.5 text-sm text-first placeholder-first focus:outline-none focus:border-none focus:ring-2 focus:ring-red-300"
							placeholder="Nissan"
							value={formData.name}
							required
						/>
					</div>
				</div>

				<div className="flex items-center justify-center space-x-2 rounded-b border-t border-first/40 p-6">
					<Button
						type={"submit"}
						color="green"
						text={"Guardar"}
						isLoading={createLoading || updateLoading}
						disabled={createLoading || updateLoading}
					/>
					<Button
						type={"button"}
						color="red"
						text={"Cancelar"}
						onClick={onClose}
						isLoading={createLoading || updateLoading}
						disabled={createLoading || updateLoading}
					/>
				</div>
			</form>
		</div>
	);
};

export default BrandForm;
