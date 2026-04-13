import AdminPanels from "../components/common/AdminPanels";
import VehicleList from "../components/lists/VehicleList";
import Pagination from "../components/common/Pagination";
import FilterBar from "../components/common/FilterBar";
import SearchBar from "../components/common/SearchBar";
import Loading from "../components/common/Loading";

import { useQuery } from "@apollo/client/react";
import { GET_BRANDS } from "../graphql/brand/BrandQuerys";
import { GET_MODELS } from "../graphql/model/ModelQuerys";
import { useVehicleSearch } from "../hooks/SearchContext";
import { usePagination } from "../hooks/PaginationContext";
import { useVehicleFilters } from "../hooks/FiltersContext";
import { GET_VEHICLES } from "../graphql/vehicle/VehicleQuerys";

const AdminView = () => {
	const { data: vehiclesData, loading: vehiclesLoading } =
		useQuery(GET_VEHICLES);
	const { data: brandsData } = useQuery(GET_BRANDS);
	const { data: modelsData } = useQuery(GET_MODELS);

	const items = {
		vehicles: vehiclesData?.vehicles || [],
		brands: brandsData?.brands || [],
		models: modelsData?.models || [],
	};

	const { searchResults, handleSearchResults } = useVehicleSearch(
		items.vehicles
	);
	const { filteredVehicles, handleFilterChange } =
		useVehicleFilters(searchResults);

	const {
		currentItems,
		currentPage,
		totalPages,
		goToPage,
		nextPage,
		prevPage,
		firstPage,
		lastPage,
		paginationInfo,
		getPageNumbers,
		hasPrevPage,
		hasNextPage,
	} = usePagination(filteredVehicles, 8);

	if (vehiclesLoading) return <Loading type={"large"} />;

	return (
		<div>
			<div>
				<AdminPanels
					vehiclesLength={items.vehicles.length}
					brandsLength={items.brands.length}
					modelsLength={items.models.length}
					type={"main"}
				/>
			</div>
			<div>
				<SearchBar
					vehicles={items.vehicles}
					onSearchResults={handleSearchResults}
					placeholder="Buscar vehículos por marca, modelo, año..."
				/>
			</div>
			<div className="container mx-auto px-4">
				<FilterBar
					vehicles={filteredVehicles}
					onFilterChange={handleFilterChange}
					isCollapsible={true}
				/>
			</div>
			<VehicleList filteredVehicles={currentItems} />
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={goToPage}
				paginationInfo={paginationInfo}
				getPageNumbers={getPageNumbers}
				hasPrevPage={hasPrevPage}
				hasNextPage={hasNextPage}
				onFirstPage={firstPage}
				onLastPage={lastPage}
				onPrevPage={prevPage}
				onNextPage={nextPage}
			/>
		</div>
	);
};

export default AdminView;
