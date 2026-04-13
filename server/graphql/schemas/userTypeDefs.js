import gql from "graphql-tag";

const userTypeDefs = gql`
	type User {
		id: ID!
		username: String!
	}

	type AuthResponse {
		token: String!
		user: User!
		isDefaultAdmin: Boolean!
	}

	type Mutation {
		login(username: String!, password: String!): AuthResponse!
		updateCredentials(
			newUsername: String
			currentPassword: String!
			newPassword: String
		): User!
	}
`;

export default userTypeDefs;
