import { ApolloServer } from "@apollo/server";
import { typeDefs } from "../graphql/schemas/rootTypeDefs.js";
import { resolvers } from "../graphql/resolvers/resolvers.js";

const createApolloServer = async () => {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
	});

	await server.start();
	return server;
};

export default createApolloServer;
