import Button from "./Button";
import Icon from "./Icon";

import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_BRANDS } from "../../graphql/brand/BrandQuerys";

const FilterBar = ({ vehicles = [], onFilterChange, isCollapsible = true }) => {
	const [isOpen, setIsOpen] = useState(!isCollapsible);
	const [filters, setFilters] = useState({
		brand: "",
		model: "",
		cartype: "",
		transmission: "",
		sortByYear: "",
	});

	const [availableModels, setAvailableModels] = useState([]);
	const { data: brandsData } = useQuery(GET_BRANDS);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const brands = brandsData?.brands || [];

	const getUniqueValues = (field) => {
		const values = vehicles
			.map((vehicle) => vehicle[field])
			.filter((value) => value && value !== "")
			.filter((value, index, self) => self.indexOf(value) === index);
		return values.sort();
	};

	useEffect(() => {
		if (filters.brand && brands.length > 0) {
			const selectedBrand = brands.find((brand) => brand.id === filters.brand);
			setAvailableModels(selectedBrand?.models || []);

			if (filters.model) {
				const modelExists = selectedBrand?.models.some(
					(model) => model.id === filters.model
				);
				if (!modelExists) {
					setFilters((prev) => ({ ...prev, model: "" }));
				}
			}
		} else {
			setAvailableModels([]);
		}
	}, [filters.brand, filters.model, brands]);

	useEffect(() => {
		if (onFilterChange) {
			onFilterChange(filters);
		}
	}, [filters, onFilterChange]);

	const handleFilterChange = (key, value) => {
		setFilters((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const clearFilters = () => {
		setFilters({
			brand: "",
			model: "",
			cartype: "",
			transmission: "",
			sortByYear: "",
		});
	};

	const hasActiveFilters = Object.values(filters).some((value) => value !== "");

	const cartypeOptions = getUniqueValues("cartype");
	const transmissionOptions = getUniqueValues("transmission");

	return (
		<div className="border-y-2 border-first rounded-xl w-full overflow-hidden my-4">
			<div
				className={`text-first group flex items-center justify-between p-4 cursor-pointer transition-colors duration-300 hover:bg-first hover:text-main`}
				onClick={() => isCollapsible && setIsOpen(!isOpen)}
			>
				<div className="flex items-center gap-3">
					<Icon name="filter" />
					<h3 className="text-lg font-semibold ">
						Filtros {hasActiveFilters && "(Activos)"}
					</h3>
				</div>

				<div className="flex items-center gap-2">
					{isOpen ? (
						<Icon name={"arrowUp"} />
					) : (
						<Icon name={"arrowDown"} />
					)}
				</div>
			</div>
			<div
				style={{
					maxHeight: isOpen ? 1000 : 0,
					opacity: isOpen ? 1 : 0,
					overflow: "hidden",
					transition:
						"max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s",
				}}
				className={`duration-300 p-5 border-t border-first/10 ${
					isOpen ? "" : ""
				}`}
			>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
					{/* Filtro por Marca */}
					<div>
						<label
							htmlFor="brandFilter"
							className="block text-sm font-medium text-first mb-2"
						>
							Marca
						</label>
						<select
							id="brandFilter"
							value={filters.brand}
							onChange={(e) => handleFilterChange("brand", e.target.value)}
							className="w-full bg-main border-2 border-third rounded-lg px-3 py-2 text-first focus:border-first focus:outline-none transition-colors"
						>
							<option value="">Todas las marcas</option>
							{brands.map((brand) => (
								<option key={brand.id} value={brand.id}>
									{brand.name}
								</option>
							))}
						</select>
					</div>

					{/* Filtro por Modelo */}
					<div>
						<label
							htmlFor="modelFilter"
							className="block text-sm font-medium text-first mb-2"
						>
							Modelo
						</label>
						<select
							id="modelFilter"
							value={filters.model}
							onChange={(e) => handleFilterChange("model", e.target.value)}
							disabled={!filters.brand}
							className="w-full bg-main border-2 border-third rounded-lg px-3 py-2 text-first focus:border-first focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<option value="">
								{filters.brand
									? "Todos los modelos"
									: "Selecciona una marca primero"}
							</option>
							{availableModels.map((model) => (
								<option key={model.id} value={model.id}>
									{model.name}
								</option>
							))}
						</select>
					</div>

					{/* Filtro por Tipo de Vehículo */}
					<div>
						<label
							htmlFor="cartypeFilter"
							className="block text-sm font-medium text-first mb-2"
						>
							Tipo de Vehículo
						</label>
						<select
							id="cartypeFilter"
							value={filters.cartype}
							onChange={(e) => handleFilterChange("cartype", e.target.value)}
							className="w-full bg-main border-2 border-third rounded-lg px-3 py-2 text-first focus:border-first focus:outline-none transition-colors"
						>
							<option value="">Todos los tipos</option>
							{cartypeOptions.map((type) => (
								<option key={type} value={type}>
									{type}
								</option>
							))}
						</select>
					</div>

					{/* Filtro por Transmisión */}
					<div>
						<label
							htmlFor="transmissionFilter"
							className="block text-sm font-medium text-first mb-2"
						>
							Transmisión
						</label>
						<select
							id="transmissionFilter"
							value={filters.transmission}
							onChange={(e) =>
								handleFilterChange("transmission", e.target.value)
							}
							className="w-full bg-main border-2 border-third rounded-lg px-3 py-2 text-first focus:border-first focus:outline-none transition-colors"
						>
							<option value="">Todas las transmisiones</option>
							{transmissionOptions.map((transmission) => (
								<option key={transmission} value={transmission}>
									{transmission}
								</option>
							))}
						</select>
					</div>

					{/* Ordenar por Año */}
					<div>
						<label
							htmlFor="yearOrder"
							className="block text-sm font-medium text-first mb-2"
						>
							Ordenar por Año
						</label>
						<select
							id="yearOrder"
							value={filters.sortByYear}
							onChange={(e) => handleFilterChange("sortByYear", e.target.value)}
							className="w-full bg-main border-2 border-third rounded-lg px-3 py-2 text-first focus:border-first focus:outline-none transition-colors"
						>
							<option value="">Sin orden específico</option>
							<option value="newest">Más nuevo primero</option>
							<option value="oldest">Más antiguo primero</option>
						</select>
					</div>
				</div>

				{/* Contador de resultados */}
				<div className="flex justify-between items-center mt-4 pt-3 border-t border-first/10">
					<p className="text-sm text-first">
						{vehicles.length} vehículo{vehicles.length !== 1 ? "s" : ""}
						{hasActiveFilters
							? " encontrado" + (vehicles.length !== 1 ? "s" : "")
							: " en total"}
					</p>
					{hasActiveFilters && (
						<Button
							onClick={(e) => {
								e.stopPropagation();
								clearFilters();
							}}
							text={"Limpiar"}
							color="red"
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default FilterBar;
