import Button from "../components/common/Button";
import Loading from "../components/common/Loading";
import BrandForm from "../components/forms/BrandForm";
import Pagination from "../components/common/Pagination";
import VehicleList from "../components/lists/VehicleList";

import { useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useAlert } from "../hooks/AlertContext";
import { GET_MODELS } from "../graphql/model/ModelQuerys";
import { useNavigate, useParams } from "react-router-dom";
import { usePagination } from "../hooks/PaginationContext";
import { useMutation, useQuery } from "@apollo/client/react";
import { DELETE_BRAND } from "../graphql/brand/BrandMutations";
import { GET_VEHICLES } from "../graphql/vehicle/VehicleQuerys";
import { GET_BRAND, GET_BRANDS } from "../graphql/brand/BrandQuerys";

const BrandView = () => {
	const navigate = useNavigate();

	const { id } = useParams();
	const { showAlert } = useAlert();
	const { isAuthenticated } = useAuth();
	const [showForm, setShowForm] = useState(false);
	const { data, loading: brandLoading } = useQuery(GET_BRAND, {
		variables: { id: id },
	});

	const [deleteBrand, { loading: deleteLoading }] = useMutation(DELETE_BRAND, {
		refetchQueries: [
			{ query: GET_BRANDS },
			{ query: GET_MODELS },
			{ query: GET_VEHICLES },
		],
		awaitRefetchQueries: true,
		onCompleted: () => {
			showAlert("Marca eliminada correctamente", "Eliminada", "success");
			navigate("/admin");
		},
		onError: (error) => {
			showAlert("No se pudo eliminar la marca", "Sin eliminar", "error");
			console.error("Error deleting brand:", error.message);
		},
	});

	const handleDelete = async () => {
		await deleteBrand({ variables: { id: id } });
	};

	const brand = data?.brand;
	const vehicles = brand?.vehicles;

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
	} = usePagination(vehicles, 8);

	if (brandLoading) return <Loading type={"large"} />;

	const renderButtons = () => {
		return (
			isAuthenticated && (
				<div className="flex gap-2 mt-4 justify-center">
					<Button
						type={"button"}
						text={"Editar Marca"}
						color="default"
						onClick={() => setShowForm(true)}
					/>
					<Button
						type={"button"}
						text={"Eliminar Marca"}
						color="red"
						onClick={handleDelete}
						isLoading={deleteLoading}
					/>
				</div>
			)
		);
	};

	return (
		<div>
			{vehicles.length === 0 ? (
				<div className="flex flex-col items-center">
					<div className="p-2 rounded text-4xl text-first text-center">
						No hay automoviles: {brand.name}
					</div>
					{renderButtons()}
				</div>
			) : (
				<div>
					<div className="flex flex-col md:flex-row gap-2 justify-center">
						<div className="border-2 text-first w-auto rounded-lg text-center text-2xl font-medium p-3">
							<h1>AUTOMOVILES: {brand.name.toUpperCase()}</h1>
						</div>
					</div>
					{renderButtons()}
					<div>
						<VehicleList brandVehicles={currentItems} />
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
				</div>
			)}
			{showForm && (
				<BrandForm
					formTitle={"Editar Marca"}
					onClose={() => setShowForm(false)}
					onDone={() => setShowForm(false)}
					isUpdate={true}
					brand={brand}
				/>
			)}
		</div>
	);
};

export default BrandView;
