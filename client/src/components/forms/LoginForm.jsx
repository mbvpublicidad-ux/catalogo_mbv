import Button from "../common/Button";
import UpdateUserForm from "./UpdateUserForm";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import { useAlert } from "../../hooks/AlertContext";

const LoginForm = () => {
	const navigate = useNavigate();
	const { showAlert } = useAlert();
	const { login, loading } = useAuth();
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const [showUpdate, setShowUpdate] = useState(false);
	const [loginCompleted, setLoginCompleted] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();

			const { username, password } = formData;
			if (!username || !password) {
				showAlert(
					"Se deben llenar todos los campos",
					"Campos sin llenar",
					"error"
				);
				return;
			}

			const response = await login(username, password);

			if (response.success) {
				showAlert(
					`Bienvenido, ${
						username === "admin"
							? "actualiza las credenciales"
							: response.user.username
					}`,
					"Sesion Iniciada",
					"success"
				);

				setLoginCompleted(response);
			} else {
				showAlert(
					"Usuario o contraseña incorrecto",
					"Error de inicio",
					"error"
				);
			}
		} catch (error) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		if (loginCompleted?.success) {
			if (loginCompleted?.isDefaultAdmin) {
				setShowUpdate(true);
			} else {
				navigate("/admin");
			}
		}
	}, [loginCompleted, navigate]);

	if (showUpdate) {
		return <UpdateUserForm />;
	}

	const classes = {
		input:
			"w-full px-4 py-3  border border-third text-first rounded-lg focus:outline-none focus:ring-2 focus:ring-first transition-all duration-300",
		label: "block text-sm font-medium text-first/80 mb-1",
	};

	return (
		<div>
			<div className="flex items-center justify-center min-h-screen p-4">
				<div className="relative w-full max-w-md p-8 rounded-3xl shadow-2xl overflow-hidden">
					<div className="absolute inset-0 w-full h-full bg-gradient-to-r from-main to-first rounded-3xl animate-border-pulse opacity-25"></div>

					<div className="relative z-10">
						<h2 className="text-3xl font-bold text-center text-first mb-6">
							Iniciar Sesión
						</h2>
						<p className="text-center text-first font-bold mb-8">
							¡Bienvenido de nuevo!
						</p>

						<form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
							<div>
								<label className={classes.label}>Nombre de Usuario</label>
								<input
									type="text"
									name="username"
									value={formData.username}
									onChange={handleChange}
									placeholder="Username"
									className={classes.input}
									required
								/>
							</div>

							<div>
								<label className={classes.label}>Contraseña</label>
								<input
									type="password"
									name="password"
									value={formData.password}
									onChange={handleChange}
									placeholder="Contraseña"
									className={classes.input}
									required
								/>
							</div>

							<div className="flex justify-center gap-5">
								<Button
									type="submit"
									text="Iniciar Sesion"
									color="default"
									isLoading={loading}
									disabled={loading}
								/>
								<Button
									type={"button"}
									text={"Volver"}
									color="red"
									onClick={() => navigate("/")}
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
