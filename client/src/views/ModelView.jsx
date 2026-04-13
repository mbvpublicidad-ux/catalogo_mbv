import VehicleList from "../components/lists/VehicleList";
import Pagination from "../components/common/Pagination";
import ModelForm from "../components/forms/ModelForm";
import Loading from "../components/common/Loading";
import Button from "../components/common/Button";

import { useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useAlert } from "../hooks/AlertContext";
import { useNavigate, useParams } from "react-router-dom";
import { usePagination } from "../hooks/PaginationContext";
import { useMutation, useQuery } from "@apollo/client/react";
import { DELETE_MODEL } from "../graphql/model/ModelMutations";
import { GET_VEHICLES } from "../graphql/vehicle/VehicleQuerys";
import { GET_MODEL, GET_MODELS } from "../graphql/model/ModelQuerys";

const ModelView = () => {
	const navigate = useNavigate();

	const { id } = useParams();
	const { showAlert } = useAlert();
	const { isAuthenticated } = useAuth();
	const [showForm, setShowForm] = useState();

	const { data, loading: modelsLoading } = useQuery(GET_MODEL, {
		variables: { id: id },
	});

	const [deleteModel, { loading: deleteLoading }] = useMutation(DELETE_MODEL, {
		refetchQueries: [{ query: GET_MODELS }, { query: GET_VEHICLES }],
		awaitRefetchQueries: true,
		onCompleted: () => {
			showAlert("Modelo eliminado correctamente", "Eliminado", "success");
			navigate("/admin");
		},
		onError: (error) => {
			showAlert("Error al eliminar el modelo", "No elimnado", "error");
			console.error("Error deleting model:", error.message);
		},
	});

	const handleDelete = async () => {
		await deleteModel({ variables: { id: id } });
	};

	const model = data?.model;
	const vehicles = model?.vehicles;

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

	if (modelsLoading) return <Loading type={"large"} />;

	const handleClose = () => setShowForm(false);
	const handleOpen = () => setShowForm(true);

	const renderButtons = () => {
		return (
			isAuthenticated && (
				<div className="flex gap-2 mt-4 justify-center">
					<Button
						type={"button"}
						text={"Editar Modelo"}
						color="default"
						onClick={handleOpen}
						isLoading={deleteLoading}
					/>
					<Button
						type={"button"}
						text={"Eliminar Modelo"}
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
						No hay automoviles: {model.name}
					</div>
					{renderButtons()}
				</div>
			) : (
				<div>
					<div className="flex flex-col sm:flex-row gap-2 justify-center">
						<div className="border-2 text-first w-auto rounded-lg text-center text-2xl font-medium p-3">
							<h1>AUTOMOVILES: {model.name.toUpperCase()}</h1>
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
				<ModelForm
					formTitle={"Actualizar Modelo"}
					onClose={handleClose}
					onDone={handleClose}
					isUpdate={true}
					model={model}
				/>
			)}
		</div>
	);
};

export default ModelView;
