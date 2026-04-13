import userResolvers from "./userResolvers.js";
import modelResolvers from "./modelResolvers.js";
import brandResolvers from "./brandResolvers.js";
import vehicleResolvers from "./vehicleResolvers.js";
import { mergeResolvers } from "@graphql-tools/merge";

export const resolvers = mergeResolvers([
	vehicleResolvers,
	brandResolvers,
	userResolvers,
	modelResolvers,
]);
