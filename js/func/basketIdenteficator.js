export function addBasketIdenteficator() {
	if (!localStorage.getItem('basketAmount')) return;	

	const btn = document.querySelectorAll('.header__btn-busket')[0];	

	if (btn.querySelector('div')) {
		btn.querySelector('div').remove();
	}

	let circle = document.createElement('div');
	circle.classList.add('header__identeficator')

	if (localStorage.getItem('basketAmount') <= 9) {
		circle.textContent = localStorage.getItem('basketAmount');
	}

	btn.prepend(circle);
	if (localStorage.getItem('basketAmount') == 0 && btn.querySelector('div')) {
		btn.querySelector('div').remove();
	}
}