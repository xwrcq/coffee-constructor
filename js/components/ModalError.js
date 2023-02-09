export function renderModalError(error) {
	return `
	<div class="basket-orders__modal">
						<div class="content-modal">
							<div class="content-modal__close">X</div>
							<div class="content-modal__title">ERROR</div>
							<div class="content-modal__text">${error}</div>
						</div>
					</div>
	`;
}