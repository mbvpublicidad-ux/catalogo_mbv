import { useState, useEffect } from "react";
import Icon from "./Icon";

const SearchBar = ({
	vehicles = [],
	onSearchResults,
	placeholder = "Buscar vehículos...",
}) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [isFocused, setIsFocused] = useState(false);

	useEffect(() => {
		const searchResults =
			searchTerm.trim() === ""
				? vehicles
				: vehicles.filter((vehicle) => {
						const searchLower = searchTerm.toLowerCase();

						const brandMatch = vehicle.brand.name
							.toLowerCase()
							.includes(searchLower);
						const modelMatch = vehicle.model.name
							.toLowerCase()
							.includes(searchLower);
						const yearMatch = vehicle.year.toString().includes(searchTerm);
						const cartypeMatch = vehicle.cartype
							?.toLowerCase()
							.includes(searchLower);
						const transmissionMatch = vehicle.transmission
							?.toLowerCase()
							.includes(searchLower);
						const fuelMatch = vehicle.fuel?.toLowerCase().includes(searchLower);
						const colorMatch = vehicle.color
							?.toLowerCase()
							.includes(searchLower);
						const descriptionMatch = vehicle.description
							?.toLowerCase()
							.includes(searchLower);

						// Búsqueda combinada (ej: "Toyota Corolla 2020")
						const fullText = `${vehicle.brand.name} ${vehicle.model.name} ${
							vehicle.year
						} ${vehicle.cartype || ""} ${vehicle.transmission || ""} ${
							vehicle.fuel || ""
						} ${vehicle.color || ""} ${
							vehicle.description || ""
						}`.toLowerCase();
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
							fullTextMatch
						);
				  });

		if (onSearchResults) {
			onSearchResults(searchResults, searchTerm);
		}
	}, [searchTerm, vehicles, onSearchResults]);

	const handleClear = () => {
		setSearchTerm("");
	};

	const handleKeyDown = (e) => {
		if (e.key === "Escape") {
			handleClear();
		}
	};

	return (
		<div className="my-15 rounded shadow-lg border-x-2 border-first backdrop-blur-sm sticky top-0 z-40">
			<div className="container mx-auto px-4 py-4">
				<div className="max-w-2xl mx-auto">
					<div
						className={`relative transition-all duration-300 ${
							isFocused ? "transform scale-105" : ""
						}`}
					>
						<div
							className={`relative flex items-center bg-second/20 rounded-2xl border-2 transition-all duration-300 ${
								isFocused
									? "border-first shadow shadow-first"
									: "border-third/50 hover:border-first"
							}`}
						>
							<div className="absolute left-4 flex items-center">
								<Icon name={"search"} color={"first"} />
							</div>

							<input
								id="searchBar"
								type="text"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								onFocus={() => setIsFocused(true)}
								onBlur={() => setIsFocused(false)}
								onKeyDown={handleKeyDown}
								placeholder={placeholder}
								className="w-full bg-second/20 text-first placeholder-third/50 pl-12 pr-12 py-4 rounded-2xl focus:outline-none text-lg"
								autoComplete="off"
							/>

							{searchTerm && (
								<button
									onClick={handleClear}
									className="absolute right-4 cursor-pointer flex items-center justify-center w-6 h-6 rounded-full bg-first transition-colors group"
									type="button"
								>
									<Icon name={"close"} size={"4"} color={"red-500"} />
								</button>
							)}
						</div>

						{isFocused && (
							<div className="absolute top-full left-0 right-0 mt-2 bg-first border border-first rounded-xl p-4 shadow-xl shadow-second z-50">
								<div className="text-sm text-main">
									<p className="mb-2">Puedes buscar por:</p>
									<div className="grid grid-cols-2 gap-2 text-xs">
										<div>• Marca</div>
										<div>• Modelo</div>
										<div>• Año</div>
										<div>• Tipo</div>
										<div>• Transmisión</div>
										<div>• Color</div>
									</div>
									{searchTerm && (
										<div className="mt-3 pt-3 border-t border-first">
											<p className="text-first-400 border-first-400">
												Buscando:{" "}
												<span className="font-semibold">"{searchTerm}"</span>
											</p>
										</div>
									)}
								</div>
							</div>
						)}
					</div>

					{searchTerm && (
						<div className="mt-3 text-center">
							<p className="text-sm text-first">
								{vehicles.filter((vehicle) => {
									const searchLower = searchTerm.toLowerCase();
									const brandMatch = vehicle.brand.name
										.toLowerCase()
										.includes(searchLower);
									const modelMatch = vehicle.model.name
										.toLowerCase()
										.includes(searchLower);
									const yearMatch = vehicle.year
										.toString()
										.includes(searchTerm);
									const cartypeMatch = vehicle.cartype
										?.toLowerCase()
										.includes(searchLower);
									const transmissionMatch = vehicle.transmission
										?.toLowerCase()
										.includes(searchLower);
									const fuelMatch = vehicle.fuel
										?.toLowerCase()
										.includes(searchLower);
									const colorMatch = vehicle.color
										?.toLowerCase()
										.includes(searchLower);
									const descriptionMatch = vehicle.description
										?.toLowerCase()
										.includes(searchLower);
									const fullText = `${vehicle.brand.name} ${
										vehicle.model.name
									} ${vehicle.year} ${vehicle.cartype || ""} ${
										vehicle.transmission || ""
									} ${vehicle.fuel || ""} ${vehicle.color || ""} ${
										vehicle.description || ""
									}`.toLowerCase();
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
										fullTextMatch
									);
								}).length > 0 ? (
									<>
										Mostrando resultados para:
										<span className="text-first border-first font-semibold ml-1">
											"{searchTerm}"
										</span>
									</>
								) : (
									<span className="text-error">
										No se encontraron resultados para "{searchTerm}"
									</span>
								)}
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default SearchBar;
