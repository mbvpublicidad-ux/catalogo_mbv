import { useState, useMemo } from "react";

export const useVehicleFilters = (vehicles = []) => {
	const [filters, setFilters] = useState({
		brand: "",
		model: "",
		cartype: "",
		transmission: "",
		sortByYear: "",
	});

	const filteredVehicles = useMemo(() => {
		let result = [...vehicles];

		// Aplicar filtros
		if (filters.brand) {
			result = result.filter((vehicle) => vehicle.brand.id === filters.brand);
		}

		if (filters.model) {
			result = result.filter((vehicle) => vehicle.model.id === filters.model);
		}

		if (filters.cartype) {
			result = result.filter((vehicle) => vehicle.cartype === filters.cartype);
		}

		if (filters.transmission) {
			result = result.filter(
				(vehicle) => vehicle.transmission === filters.transmission
			);
		}

		// Aplicar ordenamiento por año
		if (filters.sortByYear) {
			result = result.sort((a, b) => {
				if (filters.sortByYear === "newest") {
					return b.year - a.year; // Más reciente primero
				} else if (filters.sortByYear === "oldest") {
					return a.year - b.year; // Más antiguo primero
				}
				return 0;
			});
		}

		return result;
	}, [vehicles, filters]);

	const handleFilterChange = (newFilters) => {
		setFilters(newFilters);
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

	return {
		filters,
		filteredVehicles,
		handleFilterChange,
		clearFilters,
		hasActiveFilters,
	};
};
