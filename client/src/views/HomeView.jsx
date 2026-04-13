import HeroSection from "../components/common/HeroSection";
import VehicleList from "../components/lists/VehicleList";
import FilterBar from "../components/common/FilterBar";
import SearchBar from "../components/common/SearchBar";
import Loading from "../components/common/Loading";

import { GET_VEHICLES } from "../graphql/vehicle/VehicleQuerys";
import { useVehicleFilters } from "../hooks/FiltersContext";
import { useVehicleSearch } from "../hooks/SearchContext";
import { useQuery } from "@apollo/client/react";
import Pagination from "../components/common/Pagination";
import { usePagination } from "../hooks/PaginationContext";

const HomeView = () => {
	const { data, loading, error } = useQuery(GET_VEHICLES);
	const vehicles = data?.vehicles || [];

	const { searchResults, handleSearchResults } = useVehicleSearch(vehicles);
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

	if (loading) return <Loading type={"large"} />;

	if (error) {
		console.error(error.message);
		return (
			<div className="text-center text-red-500 p-8">
				Error al cargar los vehículos
			</div>
		);
	}

	return (
		<div>
			<HeroSection />
			<div className="container mx-auto px-4">
				<FilterBar
					vehicles={filteredVehicles}
					onFilterChange={handleFilterChange}
					isCollapsible={true}
				/>
			</div>
			<SearchBar
				vehicles={vehicles}
				onSearchResults={handleSearchResults}
				placeholder="Buscar vehículos por marca, modelo, año..."
			/>
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

export default HomeView;
