import "./App.css";

import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";

import AdminView from "./views/AdminView";
import BrandView from "./views/BrandView";
import ModelView from "./views/ModelView";
import AboutView from "./views/AboutView";
import VehicleView from "./views/VehicleView";

import ProtectedRoutes from "./routes/ProtectedRoutes";
import AlertDisplay from "./components/alerts/AlertDisplay";
import MainLayout from "./components/layouts/MainLayout";

import { Route, Routes } from "react-router-dom";
import { AlertProvider } from "./hooks/AlertContext";

function App() {
	return (
		<AlertProvider>
			<AlertDisplay />
			<Routes>
				<Route element={<ProtectedRoutes />}>
					<Route element={<MainLayout />}>
						<Route path="/admin" element={<AdminView />} />
					</Route>
				</Route>

				<Route element={<MainLayout />}>
					<Route path="/" element={<HomeView />} />
					<Route path="/about" element={<AboutView />} />
					<Route path="/brand/:id" element={<BrandView />} />
					<Route path="/model/:id" element={<ModelView />} />
					<Route path="/vehicle/:id" element={<VehicleView />} />
				</Route>

				<Route path="/login" element={<LoginView />} />
			</Routes>
		</AlertProvider>
	);
}

export default App;
