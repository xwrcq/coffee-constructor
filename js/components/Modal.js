export function renderModal(title) {
	return `
	<div class="basket-orders__modal">
						<form class="basket-orders__modal-content content-modal">
							<div class="content-modal__close">X</div>
							<div class="content-modal__title">${title}</div>
							<input class="content-modal__input content-modal__name" type="text" placeholder="enter order's name...">
							<input class="content-modal__input content-modal__comment" type="text" placeholder="leave comment...">
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
							<button class="content-modal__btn btn" type="submit">MAKE ORDER</button>
						</form>
					</div>
	`;
}