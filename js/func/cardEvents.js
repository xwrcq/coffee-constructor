import { orderCommentUpdate, orderRatingChangeUpdate, orderRatingNewUpdate } from "../API/fbUpdate.js";
import { renderLoader } from "../components/Loader.js";
import { changeRating } from "./changeRating.js";


export function cardEvents(parent, rating, loaderContainer) {
	parent.addEventListener('click', (e) => {
		e.preventDefault();
		let target = e.target;

		if (target.classList.contains('card-orders__characters')) {
			target.nextElementSibling.classList.toggle('open');
		}

		if (target.closest('a') && target.closest('a').classList.contains('content-modal__star')) {
			const stars = Array.from(target.closest('a').parentElement.querySelectorAll('a'));
			const ratingText = target.closest('.card-orders').querySelector('.card-orders__rating-text');
			const orderId = target.closest('.card-orders').id;
			rating = changeRating(stars, target.closest('a').dataset.rating);

			if (rating && !(JSON.parse(localStorage.getItem('rating')) || []).find(el => {
				return Object.keys(el).find(k => k == orderId);
			})) {
				loaderContainer.insertAdjacentHTML('afterbegin', renderLoader());
				orderRatingNewUpdate(orderId, rating).then((newRatingText) => {
					ratingText.textContent = `rating - ${newRatingText}`;
					loaderContainer.querySelector('.loader').remove();

					if (!localStorage.getItem('rating')) {
						localStorage.setItem('rating', JSON.stringify([{ [orderId]: rating }]));
					} else {
						let ratings = JSON.parse(localStorage.getItem('rating'));
						ratings.push({ [orderId]: rating });
						localStorage.setItem('rating', JSON.stringify(ratings));
					}
				});
			} else if (rating) {
				loaderContainer.insertAdjacentHTML('afterbegin', renderLoader());
				orderRatingChangeUpdate(orderId, rating).then((newRatingText) => {
					ratingText.textContent = `rating - ${newRatingText}`;
					const oldRating = JSON.parse(localStorage.getItem('rating'));
					oldRating.forEach(el => {
						if (el[orderId]) {
							el[orderId] = rating;
						}
					})
					localStorage.setItem('rating', JSON.stringify(oldRating));
					loaderContainer.querySelector('.loader').remove();
				});
			}
		}

		if (target.classList.contains('card-orders__comment-add-btn')) {
			const card = target.closest('.card-orders');
			const input = target.parentElement.querySelector('.card-orders__comment-add-input');
			const value = input.value;
			const orderId = card.id;
			const list = card.querySelector('.card-orders__characters-comment-list');

			if (!value) {
				input.classList.add('danger');
				input.onfocus = () => input.classList.remove('danger');
				return;
			}

			loaderContainer.insertAdjacentHTML('afterbegin', renderLoader());
			orderCommentUpdate(orderId, value).then(newComments => {
				input.value = '';
				list.innerHTML = newComments;
				loaderContainer.querySelector('.loader').remove();
			})
		}
	});
}