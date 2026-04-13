import Button from "../common/Button";
import Loading from "../common/Loading";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { useAlert } from "../../hooks/AlertContext";
import { GET_MODELS } from "../../graphql/model/ModelQuerys";
import { CREATE_MODEL, UPDATE_MODEL } from "../../graphql/model/ModelMutations";
import { GET_BRANDS } from "../../graphql/brand/BrandQuerys";
import { GET_VEHICLES } from "../../graphql/vehicle/VehicleQuerys";
import Icon from "../common/Icon";

const ModelForm = ({
	onClose,
	formTitle,
	onDone,
	isUpdate = false,
	model = null,
}) => {
	const { showAlert } = useAlert();
	const { data: brandsData, loading: brandsLoading } = useQuery(GET_BRANDS);
	const brands = brandsData?.brands || [];

	const initialFormData = { name: "", brand: "" };

	const [formData, setFormData] = useState(initialFormData);

	useEffect(() => {
		if (isUpdate) setFormData({ name: model.name });
	}, [isUpdate, model]);

	const [createModel, { loading: createLoading }] = useMutation(CREATE_MODEL, {
		refetchQueries: [{ query: GET_MODELS }, { query: GET_BRANDS }],
		awaitRefetchQueries: true,
		onCompleted: () => {
			showAlert("Modelo creado exitosamente", "Guardado", "success");
			setFormData(initialFormData);
			onDone();
		},
		onError: (error) => {
			showAlert("Error al crear el modelo", "Error", "error");
			console.error(error.message);
			onClose();
		},
	});

	const [updateModel, { loading: updateLoading }] = useMutation(UPDATE_MODEL, {
		refetchQueries: [{ query: GET_MODELS }, { query: GET_VEHICLES }],
		awaitRefetchQueries: true,
		onCompleted: () => {
			showAlert("Modelo actualizado exitosamente", "Actualizado", "success");
			onDone();
		},
		onError: (error) => {
			showAlert("No se pudo actualizar el modelo", "No actualizado", "error");
			console.error(error.message);
			onClose();
		},
	});

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

		if (isUpdate) {
			await updateModel({ variables: { id: model.id, ...formData } });
		} else {
			if (!formData.brand) {
				showAlert("La marca es obligatoria", "Campos sin llenar", "error");
				return;
			}
			await createModel({
				variables: {
					...formData,
				},
			});
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

				<div className="p-4 space-y-4">
					{!isUpdate && (
						<div>
							<label htmlFor="name" className="mb-2 block text-sm font-medium">
								Marca
							</label>
							<select
								onChange={handleChange}
								name="brand"
								id="brand"
								className="w-full rounded-lg bg-second border-2 border-first p-2.5 text-sm text-first placeholder-first focus:outline-none focus:border-none focus:ring-2 focus:ring-red-300"
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
									<option key={brand.id} value={brand.id}>
										{brand.name}
									</option>
								))}
							</select>
						</div>
					)}
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
							placeholder="Sentra"
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

export default ModelForm;
