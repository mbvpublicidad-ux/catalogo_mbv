import { useState, useEffect, useCallback } from "react";

export const useVehicleSearch = (vehicles = []) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState(vehicles);

	// Función para realizar la búsqueda (memoizada para evitar recreación)
	const performSearch = useCallback(
		(term, vehicleList = vehicles) => {
			if (!term || term.trim() === "") {
				return vehicleList;
			}

			const searchLower = term.toLowerCase().trim();

			return vehicleList.filter((vehicle) => {
				// Buscar en múltiples campos
				const brandMatch = vehicle.brand.name
					.toLowerCase()
					.includes(searchLower);
				const modelMatch = vehicle.model.name
					.toLowerCase()
					.includes(searchLower);
				const yearMatch = vehicle.year.toString().includes(searchLower);
				const cartypeMatch = vehicle.cartype
					?.toLowerCase()
					.includes(searchLower);
				const transmissionMatch = vehicle.transmission
					?.toLowerCase()
					.includes(searchLower);
				const fuelMatch = vehicle.fuel?.toLowerCase().includes(searchLower);
				const colorMatch = vehicle.color?.toLowerCase().includes(searchLower);
				const descriptionMatch = vehicle.description
					?.toLowerCase()
					.includes(searchLower);
				const priceMatch = vehicle.price?.toString().includes(searchLower);

				// Búsqueda combinada (ej: "Toyota Corolla 2020")
				const fullText = [
					vehicle.brand.name,
					vehicle.model.name,
					vehicle.year.toString(),
					vehicle.cartype,
					vehicle.transmission,
					vehicle.fuel,
					vehicle.color,
					vehicle.description,
					vehicle.price?.toString(),
				]
					.filter(Boolean)
					.join(" ")
					.toLowerCase();

				const fullTextMatch = fullText.includes(searchLower);

				return (
					brandMatch ||
					modelMatch ||
					yearMatch ||
					cartypeMatch ||
					transmissionMatch ||
					fuelMatch ||
					colorMatch ||
					descriptionMatch ||
					priceMatch ||
					fullTextMatch
				);
			});
		},
		[vehicles]
	);

	// Actualizar searchResults cuando cambien los vehículos iniciales o el término de búsqueda
	useEffect(() => {
		const results = performSearch(searchTerm, vehicles);
		setSearchResults(results);
	}, [vehicles, searchTerm, performSearch]);

	const handleSearchResults = useCallback((results, term) => {
		setSearchResults(results);
		setSearchTerm(term);
	}, []);

	const clearSearch = useCallback(() => {
		setSearchTerm("");
		setSearchResults(vehicles);
	}, [vehicles]);

	// Estadísticas de búsqueda (memoizado para evitar recálculo innecesario)
	const searchStats = useCallback(() => {
		return {
			totalVehicles: vehicles.length,
			filteredVehicles: searchResults.length,
			searchTerm: searchTerm,
			hasResults: searchResults.length > 0,
			hasActiveSearch: searchTerm.trim() !== "",
		};
	}, [vehicles.length, searchResults.length, searchTerm]);

	const hasActiveSearch = searchTerm.trim() !== "";

	return {
		searchTerm,
		searchResults,
		searchStats,
		handleSearchResults,
		clearSearch,
		hasActiveSearch,
		performSearch,
	};
};
