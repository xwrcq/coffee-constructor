import { ordersSortedGET } from "./API/fbGet.js";
import { renderLoader } from "./components/Loader.js";
import { renderOrderFromDB } from "./components/OrderFromDB.js";
import { addBasketIdenteficator } from "./func/basketIdenteficator.js";
import { cardEvents } from "./func/cardEvents.js";
import { controlFromInput, controlFromSlider, controlToInput, controlToSlider, fillSlider, setToggleAccessible } from "./func/dualSliders.js";
import { initialStars } from "./func/initialStars.js";
import { pagination } from "./func/pagination.js";
//import { sortCases } from "./func/SortAndFilter.js";

const cards = document.querySelector('.cards');
const sortBtns = document.querySelectorAll('.purchases__sort-item');
const loaderContainer = document.querySelector('.purchases__loader');
const titles = document.querySelectorAll('.sidebar__selector');
const filterLabels = document.querySelectorAll('.sidebar__filter-item');
const fromSliders = document.querySelectorAll('.fromSlider');
const toSliders = document.querySelectorAll('.toSlider');
const fromInputs = document.querySelectorAll('.fromInput');
const toInputs = document.querySelectorAll('.toInput');
const paginationLimit = 12;
const paginationNumbers = document.getElementById("pagination-numbers");
const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn");
let rating = 0;

addBasketIdenteficator();

loaderContainer.insertAdjacentHTML('afterbegin', renderLoader());
ordersSortedGET("dateNumber").then(orders => {
	orders.forEach(order => cards.insertAdjacentHTML('afterbegin', renderOrderFromDB(order.childData, order.childKey)));
	localStorage.setItem('sortBy', 'new');
	pagination(cards, paginationNumbers, nextButton, prevButton, paginationLimit);
	loaderContainer.querySelector('.loader').remove();
	initialStars(cards);
});

cardEvents(cards, rating, loaderContainer);

sortBtns.forEach(btn => {
	btn.addEventListener('click', (e) => {
		let target = e.target;

		if (target && target.dataset.sort) {
			loaderContainer.insertAdjacentHTML('afterbegin', renderLoader());
			localStorage.setItem('sortBy', target.dataset.sort);

			if (localStorage.getItem('filters') && Object.keys(JSON.parse(localStorage.getItem('filters'))).length) {
				sortCases(target.dataset.sort, handleSortRequestWithFilters, target);
			} else {
				sortCases(target.dataset.sort, handleSortRequest, target);
			}
		}
	})
});

titles.forEach(title => {
	title.addEventListener('click', () => {
		if (title.classList.contains('block')) {
			title.classList.toggle('open-block');
			title.nextElementSibling.classList.toggle('open-block');
		} else {
			title.classList.toggle('open');
			title.nextElementSibling.classList.toggle('open');
		}
	})
});

filterLabels.forEach(label => {
	label.addEventListener('click', (e) => {
		e.preventDefault();

		let target = e.target;
		let checkbox = target.querySelector('.sidebar__checkbox');
		if (!checkbox && target.classList.contains('sidebar__checkmark')) {
			target = target.parentElement;
			checkbox = target.querySelector('.sidebar__checkbox');
		}
		if (!checkbox) return;
		checkbox.checked = !checkbox.checked;

		loaderContainer.insertAdjacentHTML('afterbegin', renderLoader());
		filtersHandler(target.dataset.name, target.dataset.value)
		sortCases(localStorage.getItem('sortBy'), handleSortRequestWithFilters);
	})
});

for (let i = 0; i < fromSliders.length; i++) {
	fillSlider(fromSliders[i], toSliders[i], '#C6C6C6', '#25daa5', toSliders[i]);
	setToggleAccessible(toSliders[i]);

	fromSliders[i].oninput = (e) => {
		controlFromSlider(fromSliders[i], toSliders[i], fromInputs[i], e.target.dataset.name, sliderFilterHandler)
	};
	toSliders[i].oninput = (e) => {
		controlToSlider(fromSliders[i], toSliders[i], toInputs[i], e.target.dataset.name, sliderFilterHandler)
	};
	fromInputs[i].oninput = (e) => {
		controlFromInput(fromSliders[i], fromInputs[i], toInputs[i], toSliders[i], e.target.dataset.name, sliderFilterHandler)
	};
	toInputs[i].oninput = (e) => {
		controlToInput(toSliders[i], fromInputs[i], toInputs[i], toSliders[i], e.target.dataset.name, sliderFilterHandler)
	};
}

window.addEventListener("unload", () => localStorage.removeItem('filters'));

function handleSortRequest(sortValue, position, targetBtn) {
	Array.from(cards.children).forEach(card => card.remove());
	if (targetBtn) activeToggle(sortBtns, targetBtn);
	ordersSortedGET(sortValue).then(orders => {
		if (paginationNumbers.children) {
			const numbers = paginationNumbers.querySelectorAll('.pagination__number');
			numbers.forEach(n => n.remove());
		}

		orders.forEach(order => {
			cards.insertAdjacentHTML(position, renderOrderFromDB(order.childData, order.childKey));
		});
		pagination(cards, paginationNumbers, nextButton, prevButton, paginationLimit);
	});
	loaderContainer.querySelector('.loader').remove();
	initialStars(cards);
}

function handleSortRequestWithFilters(sortValue, position, targetBtn) {
	Array.from(cards.children).forEach(card => card.remove());
	if (targetBtn) activeToggle(sortBtns, targetBtn);
	ordersSortedGET(sortValue).then(orders => {
		if (paginationNumbers.children) {
			const numbers = paginationNumbers.querySelectorAll('.pagination__number');
			numbers.forEach(n => n.remove());
		}

		orders.forEach(order => {
			const orderData = order.childData;
			const filters = JSON.parse(localStorage.getItem('filters'));
			const filtersKeys = Object.keys(filters);
			let haveFilters = true;

			filtersKeys.forEach(k => {
				if (filters[k].every((f) => typeof f == 'number')) {
					let min = filters[k][0];
					let max = filters[k][1] || min;
					const range = [];

					for (let i = min; i <= max; i++) {
						range.push(i);
					}

					if (!range.includes(orderData[k])) {
						haveFilters = false;
						return;
					}
				} else if (!filters[k].includes(orderData[k])) {
					haveFilters = false;
					return;
				}
			});

			if (!haveFilters) return;

			cards.insertAdjacentHTML(position, renderOrderFromDB(order.childData, order.childKey));
		});
		if (nextButton.classList.contains('hidden') || prevButton.classList.contains('hidden')) {
			nextButton.classList.remove('hidden');
			prevButton.classList.remove('hidden');
		}
		pagination(cards, paginationNumbers, nextButton, prevButton, paginationLimit);

		if (!cards.children.length) {
			const text = document.createElement('div');
			text.classList.add('card-orders__title');
			text.textContent = 'Sorry, no orders for your request';

			cards.insertAdjacentElement('afterbegin', text);
			nextButton.classList.add('hidden');
			prevButton.classList.add('hidden');
		}
	});
	loaderContainer.querySelector('.loader').remove();
	initialStars(cards);
}

function filtersHandler(filterName, filterValue) {
	const filters = JSON.parse(localStorage.getItem('filters'));

	if (!filters) {
		const newFilters = { [filterName]: [filterValue] };
		localStorage.setItem('filters', JSON.stringify(newFilters));
	} else if (filters[filterName]) {
		if (filters[filterName].includes(filterValue)) {
			filters[filterName] = filters[filterName].filter(f => f !== filterValue);

			if (filters[filterName].length === 0) delete filters[filterName];

		} else {
			filters[filterName].push(filterValue);
		}

		localStorage.setItem('filters', JSON.stringify(filters));
	} else {
		filters[filterName] = [filterValue];
		localStorage.setItem('filters', JSON.stringify(filters));
	}
}

function sliderFilterHandler(filterName, from, to) {
	if (localStorage.getItem('filters')) {
		const filters = JSON.parse(localStorage.getItem('filters'));

		if (filters[filterName]) filters[filterName] = '';
		localStorage.setItem('filters', JSON.stringify(filters));
	}

	if (from === to) {
		filtersHandler(filterName, from);
	} else {
		filtersHandler(filterName, from);
		filtersHandler(filterName, to);
	}

	loaderContainer.insertAdjacentHTML('afterbegin', renderLoader());
	sortCases(localStorage.getItem('sortBy'), handleSortRequestWithFilters)
}

function activeToggle(parent, activeElement) {
	parent.forEach(el => el.classList.remove('active'));
	activeElement.classList.add('active');
}

function sortCases(sortValue, requestFunc, targetBtn = null) {
	switch (sortValue) {
		case 'new':
			requestFunc("dateNumber", 'afterbegin', targetBtn);
			break;
		case 'old':
			requestFunc("dateNumber", 'beforeend', targetBtn);
			break;
		case 'popular':
			requestFunc("ratingAvg", 'afterbegin', targetBtn);
			break;
		case 'unpopular':
			requestFunc("ratingAvg", 'beforeend', targetBtn);
			break;
	}
}