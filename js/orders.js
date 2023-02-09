import { ordersWithLimitGET } from "./API/fbGet.js";
import { renderOrderFromDB } from "./components/OrderFromDB.js";
import { cardEvents } from "./func/cardEvents.js";
import { initialStars } from "./func/initialStars.js";

const cards = document.querySelector('.cards');
const loaderContainer = document.querySelector('.orders__loader');
let rating = 0;
let limit = 5;

ordersWithLimitGET(limit).then((orders) => {
	orders.forEach(order => cards.insertAdjacentHTML('afterbegin', renderOrderFromDB(order.childData, order.childKey)));
	initialStars(cards);
});

cardEvents(cards, rating, loaderContainer);