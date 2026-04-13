const Loading = ({ type }) => {
	return (
		<div>
			{type === "large" ? (
				<div>
					<div className="inset-0 flex items-center justify-center z-50">
						<div className="w-20 h-20 rounded-full animate-spin">
							<div className="w-full h-full rounded-full border-4 border-first border-t-4 border-t-second bg-first"></div>
						</div>
					</div>
					<p className="text-first text-center animate-bounce">Cargando</p>
				</div>
			) : (
				<div className="flex justify-center items-center">
					<div className="w-5 h-5 border-2 border-first border-t-2 border-t-transparent rounded-full animate-spin"></div>
				</div>
			)}
		</div>
	);
};

export default Loading;
