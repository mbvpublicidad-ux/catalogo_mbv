import Button from "../components/common/Button";
import Anchor from "../components/common/Anchor";
import Loading from "../components/common/Loading";
import VehicleForm from "../components/forms/VehicleForm";
import ImageCarousel from "../components/common/ImageCarousel";

import { useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useAlert } from "../hooks/AlertContext";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client/react";
import { DELETE_VEHICLE } from "../graphql/vehicle/VehicleMutations";
import { GET_VEHICLE, GET_VEHICLES } from "../graphql/vehicle/VehicleQuerys";

const VehicleView = () => {
	const { id } = useParams();
	const { showAlert } = useAlert();
	const { isAuthenticated } = useAuth();
	const [showForm, setShowForm] = useState(false);

	const navigate = useNavigate();

	const { data, loading: vehicleLoading } = useQuery(GET_VEHICLE, {
		variables: { id: id },
	});

	const [deleteVehicle, { loading: deleteLoading }] = useMutation(
		DELETE_VEHICLE,
		{
			refetchQueries: [{ query: GET_VEHICLES }],
			awaitRefetchQueries: true,
			onCompleted: () => {
				showAlert(
					`${vehicle.brand.name} ${vehicle.model.name} ${vehicle.year} eliminado correctamente`,
					"Eliminado",
					"success"
				);
				navigate("/admin");
			},
			onError: (error) => {
				showAlert("Erro al eliminar el vehículo", "Error", "error");
				console.error(error.message);
			},
		}
	);

	const handleDelete = async () => {
		await deleteVehicle({ variables: { id: id } });
	};

	const handleShare = async () => {
		const text = `https://importacionesmbv.com/vehicle/${id}`;

		try {
			await navigator.clipboard.writeText(text);
			showAlert("Enlace del auto copiado", "Link copiado", "success");
		} catch (error) {
			console.error(error);
			showAlert("Error al copiar el auto", "Link no copiado", "error");
		}
	};

	if (vehicleLoading) return <Loading type={"large"} />;

	const vehicle = data?.vehicle;

	const wsNumber = "50684843484";
	const wsMessage = `Hola, me interesa el auto ${vehicle.brand.name} ${vehicle.model.name} ${vehicle.year} de $${vehicle.price}`;
	const wsEncodedMessage = encodeURIComponent(wsMessage);
	const wsLink = `https://wa.me/${wsNumber}?text=${wsEncodedMessage}`;
	const closeFunction = () => setShowForm(false);

	return (
		<div>
			<div>
				<div className="flex md:mb-5 items-center justify-center">
					<div className="w-full max-w-6xl rounded-xl text-first border transition-transform duration-300 animate-fade-in">
						<div className="md:flex">
							<div className="w-full p-6 flex flex-col items-center justify-center">
								<ImageCarousel
									images={vehicle.images}
									alt={`${vehicle.brand.name} ${vehicle.model.name}`}
								/>
								<h1 className="mb-2 text-center text-4xl font-extrabold leading-tight">
									{vehicle.brand.name} {vehicle.model.name} {vehicle.year}
								</h1>
							</div>

							<div className="w-full p-6 md:flex md:flex-col md:items-center border bg-dark rounded-xl">
								<div>
									<p className="mb-6 text-3xl font-bold">
										Precio: {vehicle.currency === "CRC" ? "¢" : "$"}
										{vehicle.price.toLocaleString(undefined, {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										})}
									</p>

									<div className="grid grid-cols-2 gap-4 text-sm mb-6">
										{vehicle.color && (
											<p>
												<strong>Color:</strong> {vehicle.color}
											</p>
										)}
										{vehicle.traction && (
											<p>
												<strong>Tracción:</strong> {vehicle.traction}
											</p>
										)}
										{isAuthenticated && (
											<p>
												<strong>Ticket:</strong> {vehicle.ticket}
											</p>
										)}
										<p>
											<strong>Combustible:</strong> {vehicle.fuel}
										</p>
										<p>
											<strong>Tipo:</strong> {vehicle.cartype}
										</p>
										<p>
											<strong>Transmisión:</strong> {vehicle.transmission}
										</p>
										{vehicle.cylinder && (
											<p>
												<strong>Cilindros:</strong> {vehicle.cylinder}
											</p>
										)}
										{(vehicle.mileage || vehicle.mileage === 0) && (
											<p>
												<strong>Kilometraje:</strong>{" "}
												{vehicle.mileage.toLocaleString()} km
											</p>
										)}
									</div>

									{vehicle.description && (
										<p className="text-sm leading-relaxed text-light mb-6">
											{vehicle.description}
										</p>
									)}
								</div>

								<div className="mt-auto flex justify-center space-x-4">
									{isAuthenticated ? (
										<div className="flex gap-2">
											<Button
												type={"button"}
												text={"Eliminar"}
												color="red"
												onClick={handleDelete}
												isLoading={deleteLoading}
											/>
											<Button
												type={"button"}
												text={"Editar"}
												color="default"
												onClick={() => setShowForm(true)}
											/>
										</div>
									) : (
										<Anchor link={wsLink} text={"Contactar"} color="default" />
									)}
									<Button
										color="green"
										text={"Copiar Enlace"}
										onClick={handleShare}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex mt-2 justify-center">
					<Button
						type={"button"}
						text={"Volver"}
						onClick={() => navigate(`${isAuthenticated ? "/admin" : "/"}`)}
					/>
				</div>
			</div>
			{showForm && (
				<VehicleForm
					onClose={closeFunction}
					formTitle={"Actualizar vehículo"}
					onDone={closeFunction}
					vehicle={vehicle}
					isUpdate={true}
				/>
			)}
		</div>
	);
};

export default VehicleView;
