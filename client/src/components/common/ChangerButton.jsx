const ChangerButton = ({ position = "", toImage, icon }) => {
	const classes = {
		colors: " hover:bg-main/70 text-first",
		base: `absolute ${position} top-1/2 transform -translate-y-1/2`,
		shape: "p-2 rounded-full transition-all duration-200 hover:scale-110",
	};

	return (
		<div>
			<button
				onClick={toImage}
				className={`${classes.base} ${classes.shape} ${classes.colors}`}
			>
				{icon}
			</button>
		</div>
	);
};

export default ChangerButton;
