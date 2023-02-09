import { renderOrders } from "./components/BasketCard.js";
import { renderModal } from "./components/Modal.js";
import { addBasketIdenteficator } from "./func/basketIdenteficator.js";
import { renderLoader } from "./components/Loader.js";
import { renderModalSuccess } from "./components/ModalSuccess.js";
import { renderModalError } from "./components/ModalError.js";
import { orderPOST } from "./API/fbPost.js";
import { changeRating } from "./func/changeRating.js";

const cards = document.querySelector('.basket-orders__cards');
const title = document.querySelector('.basket-orders__title');
const container = document.querySelector('.basket-orders__container');
let currentDeleteBtn;
let rating = 0;
let name;
let comment;
let orderIndex;

addBasketIdenteficator();
titleRender();
renderOrders(cards);

container.addEventListener('click', (e) => {
	e.preventDefault();
	let target = e.target;
	if (!target) return;

	if (target.classList.contains('card-orders__characters')) {
		target.nextElementSibling.classList.toggle('open');
	}
	if (target.classList.contains('basket-orders__btn-order')) {
		modalOpen(target);
	}
	if (target.classList.contains('basket-orders__btn-delete')) {
		deleteOrder(target);
	}
	if ((target.classList.contains('content-modal__close')) || (target.classList.contains('basket-orders__modal'))) {
		modalClose();
	}
	if (target.classList.contains('content-modal__btn')) {
		let commentInput = target.closest('form').querySelector('.content-modal__comment');
		let nameInput = target.closest('form').querySelector('.content-modal__name');
		comment = commentInput.value;
		name = nameInput.value;

		if (!name) {
			nameInput.classList.add('danger');
			nameInput.onfocus = () => nameInput.classList.remove('danger');
			return;
		}

		loading();
		document.body.insertAdjacentHTML('beforeend', renderLoader());

		orderPOST(JSON.parse(localStorage.getItem('basketOrders'))[orderIndex], name, comment, rating).then(() => {
			container.insertAdjacentHTML('beforeend', renderModalSuccess());
		}).catch(error => {
			container.insertAdjacentHTML('beforeend', renderModalError(error));
		}).finally(() => {
			document.body.querySelector('.loader').remove();
			loading();
		});

		deleteOrder(currentDeleteBtn);
		modalClose();
	}
	if (target.closest('a') && target.closest('a').classList.contains('content-modal__star')) {
		const stars = Array.from(target.closest('a').parentElement.querySelectorAll('a'));
		rating = changeRating(stars, target.closest('a').dataset.rating);
	}
});

function titleRender() {
	if (localStorage.getItem('basketAmount') && localStorage.getItem('basketAmount') > 0) {
		title.textContent = 'MAKE YOUR ORDER';
	} else {
		title.textContent = 'NO ORDERS';
	}
}

function modalOpen(target) {
	document.body.style.overflow = 'hidden';
	currentDeleteBtn = target.nextElementSibling;
	let curTitle = target.parentElement.querySelector('.basket-orders__title-order').textContent;
	orderIndex = target.parentElement.dataset.index;

	container.insertAdjacentHTML('beforeend', renderModal(curTitle));
}

function modalClose() {
	container.querySelector('.basket-orders__modal').remove();
	document.body.style.overflow = '';
	currentDeleteBtn = null;
	rating = 0;
	comment = null;
	orderIndex = null;
}

function deleteOrder(target) {
	let index = target.parentElement.dataset.index;
	let newOrders = JSON.parse(localStorage.getItem('basketOrders')).filter((order, i) => i != index);
	localStorage.setItem('basketOrders', JSON.stringify(newOrders));

	let amount = localStorage.getItem('basketAmount');
	localStorage.setItem('basketAmount', --amount);

	target.parentElement.remove();
	addBasketIdenteficator();
	Array.from(cards.children).forEach((card, i) => card.dataset.index = i);
	titleRender();
}

function loading() {
	container.classList.toggle('loading');
}