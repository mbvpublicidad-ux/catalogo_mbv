import { IconMap } from "../../icons";

const Icon = ({ name, size, color }) => {
	const IconComponent = IconMap[name];

	return (
		<IconComponent
			className={`size-${size || "7"} ${color && `text-${color}`}`}
		/>
	);
};

export default Icon;
