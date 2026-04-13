/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
	const [alert, setAlert] = useState(null);

	const showAlert = (message, title, type) => {
		setAlert({ message, title, type });

		setTimeout(() => {
			setAlert(null);
		}, 3000);
	};

	const closeAlert = () => setAlert(null);

	return (
		<AlertContext.Provider value={{ alert, showAlert, closeAlert }}>
			{children}
		</AlertContext.Provider>
	);
};

export const useAlert = () => {
	return useContext(AlertContext);
};
