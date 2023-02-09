const burger = document.querySelector('#burger');
const linksMenu = document.querySelector('#links-menu').cloneNode(1);
const btnsMenu = document.querySelector('#btns-menu').cloneNode(1);
const popoup = document.querySelector('#popup');
const logo = document.querySelector('#logo');
const body = document.body;

function clickHandler() {
	burger.classList.toggle('active');
	popoup.classList.toggle('active');
	body.classList.toggle('noscroll');
}

burger.addEventListener('click', (e) => {
	e.preventDefault();

	clickHandler();
	popoup.appendChild(btnsMenu);
	popoup.appendChild(linksMenu);
});

Array.from(linksMenu.children).forEach(link => {
	link.addEventListener('click', clickHandler)
});
Array.from(btnsMenu.children).forEach(btn => {
	btn.addEventListener('click', clickHandler)
});


