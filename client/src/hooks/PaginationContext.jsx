import { useMemo, useState } from "react";

export const usePagination = (items = [], itemsPerPage = 8) => {
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(items.length / itemsPerPage);

	const firstItemIndex =
		currentPage !== 1
			? currentPage * itemsPerPage - itemsPerPage
			: currentPage - 1;
	const lastItemIndex = firstItemIndex + itemsPerPage;

	const currentItems = useMemo(() => {
		return items.slice(firstItemIndex, lastItemIndex);
	}, [items, firstItemIndex, lastItemIndex]);

	const goToPage = (pageNumber) => {
		const page = Math.max(1, Math.min(pageNumber, totalPages));
		setCurrentPage(page);

		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const nextPage = () => {
		if (currentPage < totalPages) {
			goToPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 1) {
			goToPage(currentPage - 1);
		}
	};

	const firstPage = () => {
		goToPage(1);
	};

	const lastPage = () => {
		goToPage(totalPages);
	};

	const resetPage = () => {
		setCurrentPage(1);
	};

	const hasPrevPage = currentPage > 1;
	const hasNextPage = currentPage < totalPages;

	const getPageNumbers = () => {
		const delta = 2;
		const range = [];
		const rangeWithDots = [];

		const left = Math.max(2, currentPage - delta);
		const right = Math.min(totalPages - 1, currentPage + delta);

		for (let i = left; i <= right; i++) {
			range.push(i);
		}

		if (currentPage - delta > 2) {
			rangeWithDots.push(1, "...");
		} else {
			rangeWithDots.push(1);
		}

		rangeWithDots.push(...range);

		if (currentPage + delta < totalPages - 1) {
			rangeWithDots.push("...", totalPages);
		} else if (totalPages > 1) {
			rangeWithDots.push(totalPages);
		}

		return rangeWithDots;
	};

	const paginationInfo = {
		currentPage,
		totalPages,
		totalItems: items.length,
		itemsPerPage,
		startIndex: firstItemIndex + 1,
		lastIndex: Math.min(lastItemIndex, items.length),
		hasPrevPage,
		hasNextPage,
	};

	return {
		currentItems,
		currentPage,
		totalPages,
		goToPage,
		nextPage,
		prevPage,
		firstPage,
		lastPage,
		resetPage,
		paginationInfo,
		getPageNumbers,
		hasPrevPage,
		hasNextPage,
	};
};
