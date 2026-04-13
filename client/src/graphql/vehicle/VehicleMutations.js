import gql from "graphql-tag";

export const CREATE_VEHICLE = gql`
	mutation ($input: VehicleInput!) {
		createVehicle(input: $input) {
			id
			cartype
			createdAt
		}
	}
`;

export const UPDATE_VEHICLE = gql`
	mutation ($id: ID!, $input: VehicleInput!) {
		updateVehicle(id: $id, input: $input) {
			id
			cartype
			updatedAt
		}
	}
`;

export const DELETE_VEHICLE = gql`
	mutation ($id: ID!) {
		deleteVehicle(id: $id) {
			success
			message
		}
	}
`;

export const DELETE_VEHICLE_IMAGE = gql`
	mutation ($imageUrl: String!) {
		deleteVehicleImage(imageUrl: $imageUrl) {
			success
			message
		}
	}
`;
