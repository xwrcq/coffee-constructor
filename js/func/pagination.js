import { getnumbers } from "../components/PaginationNumbers.js";

export function pagination(parent, numbers, nextButton, prevButton, limit) {
	const listItems = parent.querySelectorAll('.card-orders');

	const pageCount = Math.ceil(listItems.length / limit);
	let currentPage = 1;

	getnumbers(pageCount, numbers);
	setCurrentPage(currentPage);

	prevButton.addEventListener("click", () => {
		setCurrentPage(currentPage - 1);
	});

	nextButton.addEventListener("click", () => {
		setCurrentPage(currentPage + 1);
	});

	document.querySelectorAll(".pagination__number").forEach((button) => {
		const pageIndex = Number(button.getAttribute("page-index"));

		if (pageIndex) {
			button.addEventListener("click", () => {
				setCurrentPage(pageIndex);
			});
		}
	});

	function disableButton(button) {
		button.classList.add("disabled");
		button.setAttribute("disabled", true);
	};

	function enableButton(button) {
		button.classList.remove("disabled");
		button.removeAttribute("disabled");
	};

	function handlePageButtonsStatus() {
		if (currentPage === 1) {
			disableButton(prevButton);
		} else {
			enableButton(prevButton);
		}

		if (pageCount === currentPage) {
			disableButton(nextButton);
		} else {
			enableButton(nextButton);
		}
	};

	function handleActivePageNumber() {
		document.querySelectorAll(".pagination__number").forEach((button) => {
			button.classList.remove("active");
			const pageIndex = Number(button.getAttribute("page-index"));
			if (pageIndex == currentPage) {
				button.classList.add("active");
			}
		});
	};

	function setCurrentPage(pageNum) {
		currentPage = pageNum;

		handleActivePageNumber();
		handlePageButtonsStatus();

		const prevRange = (pageNum - 1) * limit;
		const currRange = pageNum * limit;

		listItems.forEach((item, index) => {
			item.classList.add("hidden");
			if (index >= prevRange && index < currRange) {
				item.classList.remove("hidden");
			}
		});
	};
}