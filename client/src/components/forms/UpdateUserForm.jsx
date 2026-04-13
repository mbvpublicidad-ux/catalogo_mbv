import Button from "../common/Button";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../hooks/AlertContext";
import { useMutation } from "@apollo/client/react";
import { UPDATE_CREDENTIALS } from "../../graphql/user/UserMutations";

const UpdateUserForm = () => {
	const navigate = useNavigate();
	const { showAlert } = useAlert();
	const [formData, setFormData] = useState({
		newUsername: "",
		currentPassword: "",
		newPassword: "",
	});

	const [updateUser, { loading }] = useMutation(UPDATE_CREDENTIALS, {
		onCompleted: () => {
			showAlert(
				"Usuario actualizado exitosamente",
				"Actualizacion exitosa",
				"success"
			);
			navigate("/admin");
		},
		onError: (error) => {
			showAlert(
				"El usuario no se pudo actualizar",
				"Fallo al actualizar",
				"error"
			);
			console.error(error.message);
		},
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (
			!formData.newUsername ||
			!formData.currentPassword ||
			!formData.newPassword
		) {
			showAlert(
				"Todos los campos deben ser llenados",
				"Campos por llenar",
				"error"
			);
			return;
		}

		if (formData.newUsername === "admin") {
			showAlert("Debe ser diferente a admin", "Username necesario", "error");
			return;
		}

		try {
			await updateUser({ variables: { ...formData } });
		} catch (error) {
			console.error("Error updating user", error.message);
		}
	};

	const classes = {
		input:
			"w-full px-4 py-3 bg-second border border-third text-first rounded-lg focus:outline-none focus:ring-2 focus:ring-first transition-all duration-300",
		label: "block text-sm font-medium text-third mb-1",
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-main p-4">
			<div className="relative w-full max-w-md p-8 bg-main rounded-3xl shadow-2xl overflow-hidden ">
				<div className="absolute inset-0 w-full h-full bg-gradient-to-b from-main to-second rounded-3xl animate-border-pulse opacity-25"></div>

				<div className="relative z-10">
					<h2 className="text-3xl font-bold text-center text-first mb-6">
						Actualizar Admin
					</h2>
					<p className="text-center text-first font-medium mb-8">
						Es necesario actualizar los datos por seguridad
					</p>

					<form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
						<div>
							<label className={classes.label}>Nuevo nombre de usuario</label>
							<input
								type="text"
								name="newUsername"
								value={formData.newUsername}
								onChange={handleChange}
								placeholder="Nuevo usuario"
								className={classes.input}
								required
							/>
						</div>

						<div>
							<label className={classes.label}>Contraseña Actual</label>
							<input
								type="password"
								name="currentPassword"
								value={formData.currentPassword}
								onChange={handleChange}
								placeholder="Contraseña actual"
								className={classes.input}
								required
							/>
						</div>

						<div>
							<label className={classes.label}>Nueva Contraseña</label>
							<input
								type="password"
								name="newPassword"
								value={formData.newPassword}
								onChange={handleChange}
								placeholder="Contraseña nueva"
								className={classes.input}
								required
							/>
						</div>

						<Button
							type="submit"
							text="Actualizar"
							color="default"
							isLoading={loading}
							disabled={loading}
						/>
					</form>
				</div>
			</div>
		</div>
	);
};

export default UpdateUserForm;
