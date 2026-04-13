import Button from "./Button";
import Icon from "./Icon";

const Pagination = ({
	currentPage,
	onPageChange,
	paginationInfo,
	getPageNumbers,
	hasPrevPage,
	hasNextPage,
	onFirstPage,
	onLastPage,
	onPrevPage,
	onNextPage,
}) => {
	const pageNumbers = getPageNumbers();

	const classes = {
		button:
			"px-3 py-2 rounded-lg bg-second text-first hover:bg-first hover:text-main disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200",
		flexApply: "flex items-center gap-1",
	};

	const pageButtonClasses = {
		base: "min-w-[40px] flex justify-center px-3 py-2 rounded-lg font-medium transition-all duration-200",
		active: "bg-first text-main shadow",
		inactive: "bg-second text-first hover:bg-first hover:text-main",
	};

	return (
		<div className="bg-main border border-third rounded-xl p-4 my-6">
			<div className="flex flex-col items-center gap-4">
				<div className="text-sm text-third">
					Mostrando {paginationInfo.lastIndex} de {paginationInfo.totalItems}{" "}
					vehículos
				</div>

				<div className="flex flex-wrap items-center justify-center gap-2">
					<Button
						onClick={onFirstPage}
						disabled={!hasPrevPage}
						personalized={classes.button}
						text={
							<div className={classes.flexApply}>
								<Icon name={"prev"} />
								<span className="hidden sm:inline">Primera</span>
							</div>
						}
					/>

					<Button
						onClick={onPrevPage}
						disabled={!hasPrevPage}
						personalized={classes.button}
						text={
							<div className={classes.flexApply}>
								<Icon name={"prevThin"} size={"4"} />
								<span className="hidden sm:inline">Anterior</span>
							</div>
						}
					/>

					<div className={classes.flexApply}>
						{pageNumbers.map((pageNum, index) => {
							if (pageNum === "...") {
								return (
									<span key={`dots-${index}`} className="px-3 py-2 text-third">
										...
									</span>
								);
							}

							return (
								<Button
									key={pageNum}
									onClick={() => onPageChange(pageNum)}
									text={pageNum}
									personalized={`${pageButtonClasses.base} ${
										currentPage === pageNum
											? pageButtonClasses.active
											: pageButtonClasses.inactive
									}`}
								/>
							);
						})}
					</div>

					<Button
						onClick={onNextPage}
						disabled={!hasNextPage}
						personalized={classes.button}
						text={
							<div className={classes.flexApply}>
								<span className="hidden sm:inline">Siguiente</span>
								<Icon name={"nextThin"} size={"4"} />
							</div>
						}
					/>

					<Button
						onClick={onLastPage}
						disabled={!hasNextPage}
						personalized={classes.button}
						text={
							<div className={classes.flexApply}>
								<span className="hidden sm:inline">Última</span>
								<Icon name={"next"} />
							</div>
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default Pagination;
