const Anchor = ({ link, text, isIcon = false, otherColor }) => {
	const colorClasses = `bg-first text-main hover:bg-main hover:text-first hover:shadow-first`;

	const baseClasses =
		"cursor-pointer font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

	return (
		<a
			href={link}
			target="_blank"
			rel="noopener noreferrer"
			className={
				isIcon ? "" : `${baseClasses} ${otherColor ? otherColor : colorClasses}`
			}
		>
			{text}
		</a>
	);
};

export default Anchor;
