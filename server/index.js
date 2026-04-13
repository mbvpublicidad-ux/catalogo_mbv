import http from "http";
import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "./models/User.js";
import mongodbConnection from "./config/mongodb.js";
import createApolloServer from "./config/apolloServer.js";

import { expressMiddleware } from "@as-integrations/express5";

const app = express();
const httpServer = http.createServer(app);
const serverPort = process.env.PORT || 4000;

console.log("🚀 Starting server...");
console.log("📍 Port:", serverPort);
console.log("🔑 JWT Secret exists:", !!process.env.JWT_SECRET);
console.log("🗄️  Mongo URI exists:", !!process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
	console.error("❌ DB Uri is not defined");
	process.exit(1);
}

if (!process.env.JWT_SECRET) {
	console.error("❌ JWT_SECRET is not defined");
	process.exit(1);
}

app.use(
	cors({
		origin: "*",
		credentials: true,
	}),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route ANTES de conectar a la BD
app.get("/", (req, res) => {
	console.log("✅ Root endpoint hit");
	res.status(200).json({
		status: "OK",
		message: "MBV Catalog API is running",
		timestamp: new Date().toISOString(),
		endpoints: {
			graphql: "/graphql",
			health: "/health",
		},
	});
});

app.get("/health", (req, res) => {
	console.log("✅ Health endpoint hit");
	res.status(200).json({
		status: "OK",
		message: "Server is healthy",
		mongodb:
			mongoose.connection.readyState === 1 ? "connected" : "disconnected",
		timestamp: new Date().toISOString(),
	});
});

(async () => {
	try {
		console.log("📡 Connecting to MongoDB...");
		await mongodbConnection();
		console.log("✅ MongoDB connected successfully");

		console.log("🚀 Creating Apollo Server...");
		const server = await createApolloServer();
		console.log("✅ Apollo Server created");

		app.use(
			"/graphql",
			expressMiddleware(server, {
				context: async ({ req, res }) => {
					const token = req.headers.authorization || "";

					if (token) {
						try {
							const decodedToken = jwt.verify(
								token.replace("Bearer ", ""),
								process.env.JWT_SECRET,
							);
							const user = await User.findById(decodedToken.userId);
							if (!user) throw new Error("User not found");
							return { user, res };
						} catch (error) {
							console.error("Authentication error:", error.message);
							return { user: null, res };
						}
					}
					return { user: null, res };
				},
			}),
		);

		console.log("🎧 Starting HTTP server...");
		await new Promise((resolve) => {
			httpServer.listen(serverPort, "0.0.0.0", () => {
				console.log(`✅ Server running on port: ${serverPort}`);
				console.log(
					`🔗 GraphQL endpoint: http://0.0.0.0:${serverPort}/graphql`,
				);
				console.log(`🏥 Health check: http://0.0.0.0:${serverPort}/health`);
				console.log(`🌐 Server is ready to accept connections`);
				resolve();
			});
		});
	} catch (error) {
		console.error("❌ Error starting server:", error.message);
		console.error(error.stack);
		process.exit(1);
	}
})();

process.on("SIGINT", async () => {
	console.log("🛑 Shutting down gracefully...");
	await mongoose.connection.close();
	process.exit(0);
});

process.on("SIGTERM", async () => {
	console.log("🛑 SIGTERM received, shutting down gracefully...");
	await mongoose.connection.close();
	process.exit(0);
});

process.on("unhandledRejection", (reason, promise) => {
	console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
	console.error("❌ Uncaught Exception:", error);
	process.exit(1);
});
