import gql from "graphql-tag";

const brandTypeDefs = gql`
	type Brand {
		id: ID!
		name: String!
		models: [Model!]!
		vehicles: [Vehicle!]!
	}

	type Query {
		brand(id: ID!): Brand!
		brands: [Brand!]!
	}

	type Mutation {
		createBrand(name: String!): Brand!
		updateBrand(id: ID!, name: String!): Brand!
		deleteBrand(id: ID!): DeleteResponse!
	}
`;

export default brandTypeDefs;
