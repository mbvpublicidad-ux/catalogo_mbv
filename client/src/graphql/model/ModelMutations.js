import gql from "graphql-tag";

export const CREATE_MODEL = gql`
	mutation ($name: String!, $brand: ID!) {
		createModel(name: $name, brand: $brand) {
			id
			name
		}
	}
`;

export const UPDATE_MODEL = gql`
	mutation ($id: ID!, $name: String!) {
		updateModel(id: $id, name: $name) {
			id
			name
		}
	}
`;

export const DELETE_MODEL = gql`
	mutation ($id: ID!) {
		deleteModel(id: $id) {
			success
			message
		}
	}
`;
