import gql from "graphql-tag";
import userTypeDefs from "./userTypeDefs.js";
import brandTypeDefs from "./brandTypeDefs.js";
import modelTypeDefs from "./modelTypeDefs.js";
import vehicleTypeDefs from "./vehicleTypeDefs.js";
import { mergeTypeDefs } from "@graphql-tools/merge";

const rootTypeDefs = gql`
	type Query {
		_empty: String
	}

	type Mutation {
		_empty: String
	}

	type DeleteResponse {
		success: Boolean!
		message: String!
	}
`;

export const typeDefs = mergeTypeDefs([
	rootTypeDefs,
	userTypeDefs,
	brandTypeDefs,
	modelTypeDefs,
	vehicleTypeDefs,
]);
