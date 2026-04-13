import { AiOutlineCheckCircle, AiOutlineClose } from "react-icons/ai"; 

const SuccessAlert = ({
	message = "Operacion Exitosa",
	title = "Success",
	onClose,
	type = "floating",
}) => {
	const baseClasses =
		"bg-green-900/80 backdrop-blur-sm border border-green-700/50 rounded-xl p-4 shadow-lg";

	const containerClasses =
		type === "floating"
			? `fixed top-4 right-4 z-50 max-w-md animate-slide-in ${baseClasses}`
			: `w-full animate-fade-in ${baseClasses}`;

	return (
		<div className={containerClasses}>
			<div className="flex items-start space-x-3">
				{/* Icon */}
				<AiOutlineCheckCircle />

				{/* Content */}
				<div className="flex-1 min-w-0">
					<h4 className="text-green-200 font-medium text-sm mb-1">{title}</h4>
					<p className="text-green-300/90 text-sm leading-relaxed">{message}</p>
				</div>

				{/* Close Button */}
				{onClose && (
					<button
						onClick={onClose}
						className="flex-shrink-0 text-green-400/60 hover:text-green-300 transition-colors duration-200 focus:outline-none focus:text-green-300"
					>
						<AiOutlineClose />
					</button>
				)}
			</div>

			{/* Progress Bar */}
			{onClose && (
				<div className="mt-3">
					<div className="w-full bg-green-800/30 rounded-full h-1">
						<div className="bg-green-500/50 h-1 rounded-full animate-progress-bar"></div>
					</div>
				</div>
			)}
		</div>
	);
};

export default SuccessAlert;
