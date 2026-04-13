import gql from "graphql-tag";

export const GET_MODELS = gql`
	{
		models {
			id
			name
		}
	}
`;

export const GET_MODEL = gql`
	query ($id: ID!) {
		model(id: $id) {
			id
			name
			brand {
				id
				name
			}
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
				model {
					id
					name
				}
				brand {
					id
					name
				}
			}
		}
	}
`;
