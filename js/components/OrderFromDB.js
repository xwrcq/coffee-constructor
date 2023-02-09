import { calculateRating } from "../func/calculateRating.js";

export function renderOrderFromDB(data, id) {
	let rating = data.rating != "[]" ? JSON.parse(data.rating) : 0;
	rating = calculateRating(rating)
	let comments = '';
	JSON.parse(data.comment).forEach(com => {
		comments += `<li class="card-orders__characters-comment-list-item">${com}</li>`;
	});

	return `
							<div class="orders__card card-orders" id="${id}">
								<div class="card-orders__title">${data.name}</div>
								<div class="card-orders__image-container">
									<img src="./images/constructor/${data.type}-${data.cup}.png" alt="Coffee cup" class="card-orders__img basket-orders__img-order">
								</div>
								<div class="card-orders__characters">coffee characters</div>
								<ul class="card-orders__characters-list">
									<li class="card-orders__characters-list-item">cup - ${data.cup.slice(0, -5).replace('-cup', '')} size</li>
									<li class="card-orders__characters-list-item">milk - ${data.milk === 'milk-add' ? 'yes' : 'no'}</li>
									<li class="card-orders__characters-list-item">syrup - ${data.syrup === 'no-syrup' ? 'no' : data.syrup}</li>
									<li class="card-orders__characters-list-item">caffeine - ${data.caffeine}mg</li>
									<li class="card-orders__characters-list-item">sugar - ${data.sugar}g</li>
									<li class="card-orders__characters-list-item">price - ${data.price} UAH</li>
								</ul>
								<div class="card-orders__characters-list-item card-orders__rating-text">rating - ${rating}</div>
								<div class="content-modal__rating rating">
									<a href="#" class="content-modal__star star" data-rating="1"><svg xmlns="http://www.w3.org/2000/svg"
											width="24" height="24" viewBox="0 0 24 24">
											<path
												d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
										</svg></a>
									<a href="#" class="content-modal__star star" data-rating="2"><svg xmlns="http://www.w3.org/2000/svg"
											width="24" height="24" viewBox="0 0 24 24">
											<path
												d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
										</svg></a>
									<a href="#" class="content-modal__star star" data-rating="3"><svg xmlns="http://www.w3.org/2000/svg"
											width="24" height="24" viewBox="0 0 24 24">
											<path
												d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
										</svg></a>
									<a href="#" class="content-modal__star star" data-rating="4"><svg xmlns="http://www.w3.org/2000/svg"
											width="24" height="24" viewBox="0 0 24 24">
											<path
												d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
										</svg></a>
									<a href="#" class="content-modal__star star" data-rating="5"><svg xmlns="http://www.w3.org/2000/svg"
											width="24" height="24" viewBox="0 0 24 24">
											<path
												d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
										</svg></a>
								</div>
								<div class="card-orders__characters">comments</div>
								<div class="card-orders__comment">
								<ul class="card-orders__characters-comment-list">
									${comments}
								</ul>
								<div class="card-orders__comment-add">
									<input class="card-orders__comment-add-input" placeholder="add comment..." />
									<button class="card-orders__comment-add-btn btn">add</button>
								</div>
								</div>
								<div class="card-orders__date">date: ${data.date}</div>
							</div>
							`;
}