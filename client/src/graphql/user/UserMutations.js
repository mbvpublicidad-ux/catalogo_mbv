import gql from "graphql-tag";

export const LOGIN = gql`
	mutation ($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			token
			user {
				id
				username
			}
			isDefaultAdmin
		}
	}
`;

export const UPDATE_CREDENTIALS = gql`
	mutation (
		$newUsername: String!
		$currentPassword: String!
		$newPassword: String!
	) {
		updateCredentials(
			newUsername: $newUsername
			currentPassword: $currentPassword
			newPassword: $newPassword
		) {
			id
			username
		}
	}
`;
