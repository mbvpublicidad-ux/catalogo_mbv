import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineDangerous } from "react-icons/md";

const ErrorAlert = ({
	message = "Ha ocurrido un error",
	title = "Error",
	onClose,
	type = "floating",
}) => {
	const baseClasses =
		"bg-red-900/80 backdrop-blur-sm border border-red-700/50 rounded-xl p-4 shadow-lg";

	const containerClasses =
		type === "floating"
			? `fixed top-4 right-4 z-50 max-w-md animate-slide-in ${baseClasses}`
			: `w-full animate-fade-in ${baseClasses}`;

	return (
		<div className={containerClasses}>
			<div className="flex items-start space-x-3">
				{/* Icon */}
				<MdOutlineDangerous className="text-first" />

				{/* Content */}
				<div className="flex-1 min-w-0">
					<h4 className="text-error-secondary font-medium text-sm mb-1">
						{title}
					</h4>
					<p className="text-error-secondary text-sm leading-relaxed">
						{message}
					</p>
				</div>

				{/* Close Button */}
				{onClose && (
					<button
						onClick={onClose}
						className="flex-shrink-0 text-error-secondary hover:text-error transition-colors duration-200 focus:outline-none focus:text-error"
					>
						<AiOutlineClose className="text-first" />
					</button>
				)}
			</div>

			{/* Progress Bar */}
			{onClose && (
				<div className="mt-3">
					<div className="w-full bg-red-800/30 rounded-full h-1">
						<div className="bg-red-500/50 h-1 rounded-full animate-progress-bar"></div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ErrorAlert;
