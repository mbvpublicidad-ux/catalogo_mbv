import gql from "graphql-tag";

const modelTypeDefs = gql`
	type Model {
		id: ID!
		name: String!
		brand: Brand!
		vehicles: [Vehicle!]!
	}

	type Query {
		model(id: ID!): Model!
		models: [Model!]!
	}

	type Mutation {
		createModel(name: String!, brand: ID!): Model!
		updateModel(id: ID!, name: String!): Model!
		deleteModel(id: ID!): DeleteResponse!
	}
`;

export default modelTypeDefs;
