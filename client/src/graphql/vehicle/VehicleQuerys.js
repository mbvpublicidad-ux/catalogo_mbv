import gql from "graphql-tag";

export const GET_VEHICLES = gql`
	{
		vehicles {
			id
			year
			currency
			price
			transmission
			cartype
			color
			images
			fuel
			mileage
			description
			createdAt
			updatedAt
			brand {
				id
				name
			}
			model {
				id
				name
			}
		}
	}
`;

export const GET_VEHICLE = gql`
	query ($id: ID!) {
		vehicle(id: $id) {
			id
			year
			currency
			price
			transmission
			cartype
			images
			ticket
			color
			traction
			fuel
			cylinder
			mileage
			description
			createdAt
			updatedAt
			brand {
				id
				name
			}
			model {
				id
				name
			}
		}
	}
`;
