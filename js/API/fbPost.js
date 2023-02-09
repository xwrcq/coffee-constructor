import { set, ref, push, child } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import { db } from '../firebase.js';
import { calculateRating } from "../func/calculateRating.js";

export function orderPOST({ caffeine, cup, milk, price, sugar, syrup, type }, name, comment, rating) {
	const date = new Date();
	const dateText = date.toLocaleString();
	const dateNumber = date.getTime();

	const orderId = push(child(ref(db), 'orders')).key;
	return set(ref(db, 'orders/' + orderId), {
		caffeine,
		cup,
		milk,
		price,
		sugar,
		syrup,
		type,
		name,
		comment: comment.length ? JSON.stringify([comment]) : JSON.stringify([]),
		rating: rating !== 0 ? JSON.stringify([rating]) : JSON.stringify([]),
		ratingAvg: calculateRating(rating !== 0 ? [rating] : []),
		date: dateText,
		dateNumber
	});
}

/* 
import { set, ref, push, child } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import { db } from '../firebase.js';
import { calculateRating } from "../func/calculateRating.js";

export function orderPOST({ caffeine, cup, milk, price, sugar, syrup, type }, name, comment, rating) {
	const date = new Date();
	const dateText = date.toLocaleString();
	const dateNumber = date.getTime();

	const orderId = push(child(ref(db), 'orders')).key;
	return set(ref(db, 'orders/' + orderId), {
		caffeine,
		cup,
		milk,
		price,
		sugar,
		syrup,
		type,
		name,
		comment: comment.length ? JSON.stringify([comment]) : JSON.stringify([]),
		rating: rating !== 0 ? JSON.stringify([rating]) : JSON.stringify([]),
		ratingAvg: calculateRating(rating !== 0 ? [rating] : []),
		date: dateText,
		dateNumber
	});
}
*/