import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";
import { useAlert } from "../../hooks/AlertContext";

const AlertDisplay = () => {
	const { alert, closeAlert } = useAlert();

	if (!alert) return null;

	if (alert.type === "success") {
		return (
			<SuccessAlert
				message={alert.message}
				title={alert.title}
				onClose={() => closeAlert()}
			/>
		);
	}

	if (alert.type === "error") {
		return (
			<ErrorAlert
				message={alert.message}
				title={alert.title}
				onClose={() => closeAlert()}
			/>
		);
	}

	return null;
};

export default AlertDisplay;
