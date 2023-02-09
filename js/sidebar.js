const sidebar = document.querySelector('#sidebar-burger');
const selectors = document.querySelector('.sidebar__content');
const popoup = document.querySelector('#sidebar-popup');
const body = document.body;
const content = document.querySelector('.purchases__content');
const pagination = document.querySelector('.pagination__container');
const page = document.querySelector('.page')

function clickHandler() {
	sidebar.classList.toggle('active');
	popoup.classList.toggle('active');
	body.classList.toggle('noscroll');
	content.classList.toggle('blur');
	pagination.classList.toggle('blur');
}

page.addEventListener('click', (e) => {
	e.preventDefault();
	const target = e.target;

	if (target && target === sidebar) {
		clickHandler();
		popoup.appendChild(selectors);
	} else if (target && !target.closest('.sidebar__popup') && popoup.classList.contains('active')) clickHandler();
});