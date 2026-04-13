import gql from "graphql-tag";

export const GET_BRANDS = gql`
	{
		brands {
			id
			name
			models {
				id
				name
			}
		}
	}
`;

export const GET_BRAND = gql`
	query ($id: ID!) {
		brand(id: $id) {
			id
			name
			vehicles {
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
	}
`;
