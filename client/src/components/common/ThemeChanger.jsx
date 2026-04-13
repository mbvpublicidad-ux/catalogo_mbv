import { useTheme } from "../../hooks/ThemeContext";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

const ThemeChanger = () => {
	const { theme, themes, changeTheme } = useTheme();

	const iconClasses = "size-7 text-main cursor-pointer";

	return (
		<div className="flex px-2 py-2 lg:py-0 justify-center items-center">
			{theme === "dark-theme" ? (
				<BsSunFill
					className={iconClasses}
					onClick={() => changeTheme(themes[1])}
				/>
			) : (
				<BsMoonFill
					className={iconClasses}
					onClick={() => changeTheme(themes[0])}
				/>
			)}
		</div>
	);
};

export default ThemeChanger;
