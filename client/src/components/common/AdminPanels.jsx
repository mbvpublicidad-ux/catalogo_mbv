import BrandForm from "../forms/BrandForm";
import ModelForm from "../forms/ModelForm";
import VehicleForm from "../forms/VehicleForm";
import Button from "./Button";

import { useState } from "react";

const AdminPanels = ({ vehiclesLength, brandsLength, modelsLength, type }) => {
	const [showVehicleForm, setShowVehicleForm] = useState(false);
	const [showBrandForm, setShowBrandForm] = useState(false);
	const [showModelForm, setShowModelForm] = useState(false);

	const classes = {
		totalWrapper: "rounded-2xl w-40 py-2 text-first border-x-2 border-first",
	};

	return (
		<div>
			{type === "main" && (
				<div>
					<div className="flex flex-col lg:flex-row md:items-center md:justify-between mb-6 md:mb-8 gap-4">
						<div>
							<h1 className="text-2xl text-center md:text-3xl font-bold text-first mb-2">
								Panel Administrativo
							</h1>
						</div>

						<div className="flex flex-col md:flex-row justify-center gap-2">
							<Button
								type={"button"}
								isCenter={true}
								text={"Crear Vehículo"}
								onClick={() => setShowVehicleForm(true)}
							/>
							<Button
								type={"button"}
								isCenter={true}
								text={"Crear Marca"}
								onClick={() => setShowBrandForm(true)}
							/>
							<Button
								type={"button"}
								isCenter={true}
								text={"Crear Modelo"}
								onClick={() => setShowModelForm(true)}
							/>
						</div>
					</div>

					<div className="mb-6 md:mb-8 ">
						<div className="flex flex-col items-center md:flex-row md:justify-center mb-6 md:mb-8 gap-4 bg-main backdrop-blur-sm rounded-xl p-10 border-y-2 border-first text-center">
							<div className={classes.totalWrapper}>
								<p className="font-medium">Total de Vehículos</p>
								<p className="text-2xl font-bold">{vehiclesLength}</p>
							</div>
							<div className={classes.totalWrapper}>
								<p className="font-medium">Total de Marcas</p>
								<p className="text-2xl font-bold">{brandsLength}</p>
							</div>
							<div className={classes.totalWrapper}>
								<p className="font-medium">Total de Modelos</p>
								<p className="text-2xl font-bold">{modelsLength}</p>
							</div>
						</div>
					</div>
				</div>
			)}

			{showVehicleForm && (
				<VehicleForm
					formTitle={"Crear Vehículo"}
					onClose={() => setShowVehicleForm(false)}
					onDone={() => setShowVehicleForm(false)}
				/>
			)}

			{showBrandForm && (
				<BrandForm
					formTitle={"Crear Marca"}
					onClose={() => setShowBrandForm(false)}
					onDone={() => setShowBrandForm(false)}
				/>
			)}

			{showModelForm && (
				<ModelForm
					formTitle={"Crear Modelo"}
					onClose={() => setShowModelForm(false)}
					onDone={() => setShowModelForm(false)}
				/>
			)}
		</div>
	);
};

export default AdminPanels;
