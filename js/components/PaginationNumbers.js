function appendPageNumber(index, parent) {
	const pageNumber = document.createElement("button");
	pageNumber.className = "pagination__number";
	pageNumber.innerHTML = index;
	pageNumber.setAttribute("page-index", index);
	pageNumber.setAttribute("aria-label", "Page " + index);

	parent.appendChild(pageNumber);
};

export function getnumbers(pageCount, parent) {
	for (let i = 1; i <= pageCount; i++) {
		appendPageNumber(i, parent);
	}
};