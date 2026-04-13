import Loading from "../common/Loading";
import VehicleCard from "../cards/VehicleCard";

import { useQuery } from "@apollo/client/react";
import { GET_VEHICLES } from "../../graphql/vehicle/VehicleQuerys";

const VehicleList = ({
	brandVehicles = null,
	modelVehicles = null,
	filteredVehicles = null,
}) => {
	const { data, loading, error } = useQuery(GET_VEHICLES);

	if (loading) return <Loading type={"large"} />;

	if (error) {
		console.error(error.message);
		return;
	}

	const vehicles = data?.vehicles || [];

	const renderContent = () => {
		const mapFunction = (items) => {
			return items.map((item) => <VehicleCard key={item.id} vehicle={item} />);
		};

		if (filteredVehicles) return mapFunction(filteredVehicles);

		if (brandVehicles) return mapFunction(brandVehicles);

		if (modelVehicles) return mapFunction(modelVehicles);

		return mapFunction(vehicles);
	};

	const currentVehicles =
		filteredVehicles !== null
			? filteredVehicles
			: brandVehicles || modelVehicles || vehicles;

	return (
		<div className="flex-1 p-4 md:p-6 lg:p-8 ">
			{/* Grid */}
			{currentVehicles.length === 0 ? (
				<div className="text-center py-12">
					<div className="w-24 h-24 shadow-md shadow-black text-error rounded-full flex items-center justify-center mx-auto mb-4">
						{/* <Icon
							path={
								"M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-16M9 9h6m-6 3h6m-6 3h6"
							}
						/> */}
					</div>
					<h3 className="text-lg font-semibold text-error mb-2">
						{filteredVehicles !== null && "No hay vehiculos para mostrar"}
					</h3>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
					{renderContent()}
				</div>
			)}
		</div>
	);
};

export default VehicleList;
