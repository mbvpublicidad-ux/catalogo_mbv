import gql from "graphql-tag";

const vehicleTypeDefs = gql`
	type Vehicle {
		id: ID!
		brand: Brand!
		model: Model!
		year: Int!
		currency: String!
		price: Float!
		transmission: String!
		cartype: String!
		images: [String!]
		ticket: String
		color: String
		traction: String
		fuel: String
		cylinder: String
		mileage: Float
		description: String
		createdAt: String!
		updatedAt: String!
	}

	input VehicleInput {
		brand: String!
		model: String!
		year: Int!
		currency: String!
		price: Float!
		transmission: String!
		cartype: String!
		images: [String!]
		ticket: String
		color: String
		traction: String
		fuel: String
		cylinder: String
		mileage: Float
		description: String
	}

	type Query {
		vehicle(id: ID!): Vehicle!
		vehicles: [Vehicle!]!
	}

	type Mutation {
		createVehicle(input: VehicleInput): Vehicle!
		updateVehicle(id: ID!, input: VehicleInput): Vehicle!
		deleteVehicle(id: ID!): DeleteResponse!
		deleteVehicleImage(imageUrl: String!): DeleteResponse!
	}
`;

export default vehicleTypeDefs;
