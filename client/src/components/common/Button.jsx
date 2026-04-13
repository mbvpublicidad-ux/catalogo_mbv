import Loading from "./Loading";

import { Link, NavLink } from "react-router-dom";

const Button = ({
	type,
	text,
	link,
	icon,
	color,
	onClick,
	disabled,
	variation,
	personalized,
	extraClasses,
	isIcon = false,
	isCenter = false,
	isLoading = false,
	isRoundedFull = false,
}) => {
	let colorClasses = "";

	const base = `${
		isRoundedFull
			? "rounded-full p-3 shadow-md shadow-third/30"
			: "rounded-md px-2 py-1"
	} cursor-pointer text-center font-bold transition-all duration-300 hover:scale-90 block`;
	const active = `${base} bg-first shadow-md text-main`;

	switch (color) {
		case "nav-link":
			colorClasses =
				"bg-main text-first hover:bg-first hover:text-main hover:shadow-md";
			break;
		case "second":
			colorClasses = "bg-main text-second hover:bg-second hover:text-main";
			break;
		case "third":
			colorClasses = "bg-third text-main hover:bg-first hover:text-main";
			break;
		case "active-first":
			colorClasses = active;
			break;
		case "red":
			colorClasses = "bg-red-500 text-white hover:bg-red-700";
			break;
		case "green":
			colorClasses = "bg-green-500 text-white hover:bg-green-700";
			break;
		default:
			colorClasses =
				"bg-main text-first border-2 hover:bg-first hover:text-main";
			break;
	}

	const isIconClasses = isIcon ? "" : `${extraClasses} ${base} ${colorClasses}`;
	const classes = personalized ? personalized : isIconClasses;
	const content = isIcon ? (
		icon
	) : (
		<div
			className={`flex items-center ${isCenter ? "justify-center" : ""} gap-1`}
		>
			{icon}
			{text}
		</div>
	);

	if (variation === "nav-link") {
		return (
			<NavLink
				to={link}
				onClick={onClick}
				className={({ isActive }) => (isActive ? active : classes)}
			>
				{isLoading ? <Loading /> : content}
			</NavLink>
		);
	}

	if (variation === "link") {
		return (
			<Link to={link} className={classes}>
				{isLoading ? <Loading /> : content}
			</Link>
		);
	}

	if (variation === "anchor") {
		return (
			<a
				href={link}
				target="_blank"
				rel="noopener noreferrer"
				className={classes}
			>
				{isLoading ? <Loading /> : content}
			</a>
		);
	}

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={classes}
		>
			{isLoading ? <Loading /> : content}
		</button>
	);
};

export default Button;
