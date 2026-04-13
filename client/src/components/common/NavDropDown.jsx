import { GET_MODELS } from "../../graphql/model/ModelQuerys";
import { GET_BRANDS } from "../../graphql/brand/BrandQuerys";
import { useQuery } from "@apollo/client/react";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

const NavDropDown = ({ title, icon, type = "desktop", handleFunction }) => {
	const location = useLocation();
	const [isOpen, setIsOpen] = useState();

	const classes = {
		desktopShape: "block w-auto px-2 py-2 border font-bold rounded",
		desktopInactive:
			"text-first transition-all duration-300 hover:bg-first hover:text-main hover:scale-90",
		desktopActive: "bg-first text-main scale-90",
		mobileShape: "text-center py-2 rounded-md font-medium",
		mobileInactive: "bg-main text-first transition-all duration-300",
		mobileActive: "bg-first text-main shadow shadow-main scale-90",
	};

	const query = title === "Marcas" ? GET_BRANDS : GET_MODELS;

	const { data, loading, error } = useQuery(query);

	const getData = () => {
		if (title === "Marcas") return data?.brands || [];
		if (title === "Modelos") return data?.models || [];
		return [];
	};

	const getRoute = (item) => {
		if (title === "Marcas") return `/brand/${item.id}`;
		if (title === "Modelos") return `/model/${item.id}`;
		return "#";
	};

	const renderContent = () => {
		if (loading) {
			return <div className="text-first text-center py-2">Cargando...</div>;
		}

		if (error) {
			return <div className="text-first text-center py-2">Error al cargar</div>;
		}

		const items = getData();

		if (items.length === 0) {
			return (
				<div className="text-first text-center py-2">
					No hay {title.toLowerCase()}
				</div>
			);
		}

		const handleType = (type, isActive) => {
			if (type === "desktop") {
				return `${classes.desktopShape} ${
					isActive ? classes.desktopActive : classes.desktopInactive
				}`;
			} else {
				return `${classes.mobileShape} ${
					isActive ? classes.mobileActive : classes.mobileInactive
				}`;
			}
		};

		const handleActive = ({ isActive }) => handleType(type, isActive);

		return items.map((item) => (
			<NavLink
				onClick={() => {
					handleFunction();
					setIsOpen(false);
				}}
				key={item.id}
				to={getRoute(item)}
				className={handleActive}
			>
				{item.name}
			</NavLink>
		));
	};

	const isDropdownActive = () => {
		const items = getData();
		return items.some((item) => location.pathname === getRoute(item));
	};

	if (type === "desktop") {
		return (
			<div
				className="relative"
				onMouseEnter={() => setIsOpen(true)}
				onMouseLeave={() => setIsOpen(false)}
			>
				<button
					onClick={() => setIsOpen(!isOpen)}
					className={`px-2 py-1 rounded-md font-bold transition duration-300 flex gap-1 items-center ${
						isDropdownActive()
							? "shadow-md bg-first text-main"
							: "bg-main text-first hover:bg-first hover:text-main hover:scale-90 hover:shadow-md"
					}`}
				>
					{icon}
					{title}
				</button>

				<div
					className={`absolute -left-11 grid mt-2 w-55 bg-main border border-first rounded-lg shadow-xl transition-all duration-300 transform z-50 ${
						isOpen
							? "opacity-100 visible translate-y-0"
							: "opacity-0 invisible translate-y-2"
					}`}
				>
					<div className="max-h-80 p-2 grid grid-cols-2 gap-2 overflow-x-hidden">
						{renderContent()}
					</div>
				</div>
			</div>
		);
	}

	if (type === "mobile") {
		return (
			<div className="py-2 transition-all duration-500">
				<button
					onClick={() => setIsOpen(!isOpen)}
					className={`w-full py-1 px-2 rounded-md font-bold transition duration-300 flex gap-1 items-center ${
						isDropdownActive()
							? "bg-first text-main shadow shadow-main"
							: "bg-main text-first"
					}`}
				>
					{icon}
					{title}
				</button>
				<div
					className={`max-h-60 overflow-y-auto transition-all duration-300 ${
						isOpen ? "" : "hidden"
					}`}
				>
					<div className="mt-2 grid grid-cols-2 gap-3 transition-all duration-500">
						{renderContent()}
					</div>
				</div>
			</div>
		);
	}
};

export default NavDropDown;
