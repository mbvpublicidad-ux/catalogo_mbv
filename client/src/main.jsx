import "./index.css";

import App from "./App.jsx";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { client } from "./config/apolloClient.js";
import { ApolloProvider } from "@apollo/client/react";
import { AuthProvider } from "./hooks/AuthContext.jsx";
import { ThemeProvider } from "./hooks/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ApolloProvider client={client}>
			<BrowserRouter>
				<AuthProvider>
					<ThemeProvider>
						<App />
					</ThemeProvider>
				</AuthProvider>
			</BrowserRouter>
		</ApolloProvider>
	</StrictMode>
);
