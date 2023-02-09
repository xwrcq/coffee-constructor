import { set, ref, push, child, update, getDatabase, get } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import { db } from '../firebase.js';
import { calculateRating } from "../func/calculateRating.js";

export async function orderRatingNewUpdate(orderId, rating) {
	const dbRef = ref(getDatabase());
	return await get(child(dbRef, `orders/${orderId}/rating`)).then((snapshot) => {
		if (snapshot.exists()) {
			let newRating = JSON.parse(snapshot.val());
			newRating.push(rating);
			update(ref(db, 'orders/' + orderId), {
				rating: JSON.stringify(newRating),
				ratingAvg: calculateRating(newRating)
			});
			return calculateRating(newRating);
		} else {
			console.log("No data available");
		}

	}).catch((error) => {
		console.error(error);
	});
}

export async function orderRatingChangeUpdate(orderId, rating) {
	const dbRef = ref(getDatabase());
	return await get(child(dbRef, `orders/${orderId}/rating`)).then((snapshot) => {
		if (snapshot.exists()) {
			let newRating = JSON.parse(snapshot.val());
			newRating.pop();
			newRating.push(rating);
			update(ref(db, 'orders/' + orderId), {
				rating: JSON.stringify(newRating),
				ratingAvg: calculateRating(newRating)
			});
			return calculateRating(newRating);
		} else {
			console.log("No data available");
		}

	}).catch((error) => {
		console.error(error);
	});
}

export async function orderCommentUpdate(orderId, comment) {
	const dbRef = ref(getDatabase());
	return await get(child(dbRef, `orders/${orderId}/comment`)).then((snapshot) => {
		if (snapshot.exists()) {
			let comments = JSON.parse(snapshot.val());
			comments.push(comment);
			console.log(comments);
			update(ref(db, 'orders/' + orderId), {
				comment: JSON.stringify(comments)
			});
			return list(comments);
		} else {
			console.log("No data available");
		}

	}).catch((error) => {
		console.error(error);
	});
}

function list(comments) {
	let newComments = '';
	comments.forEach(com => {
		newComments += `<li class="card-orders__characters-comment-list-item">${com}</li> `;
	});
	return newComments;
}

/* 
import { set, ref, push, child, update, getDatabase, get } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import { db } from '../firebase.js';
import { calculateRating } from "../func/calculateRating.js";

export async function orderRatingNewUpdate(orderId, rating) {
	const dbRef = ref(getDatabase());
	return await get(child(dbRef, `orders/${orderId}/rating`)).then((snapshot) => {
		if (snapshot.exists()) {
			let newRating = JSON.parse(snapshot.val());
			newRating.push(rating);
			update(ref(db, 'orders/' + orderId), {
				rating: JSON.stringify(newRating),
				ratingAvg: calculateRating(newRating)
			});
			return calculateRating(newRating);
		} else {
			console.log("No data available");
		}

	}).catch((error) => {
		console.error(error);
	});
}

export async function orderRatingChangeUpdate(orderId, rating) {
	const dbRef = ref(getDatabase());
	return await get(child(dbRef, `orders/${orderId}/rating`)).then((snapshot) => {
		if (snapshot.exists()) {
			let newRating = JSON.parse(snapshot.val());
			newRating.pop();
			newRating.push(rating);
			update(ref(db, 'orders/' + orderId), {
				rating: JSON.stringify(newRating),
				ratingAvg: calculateRating(newRating)
			});
			return calculateRating(newRating);
		} else {
			console.log("No data available");
		}

	}).catch((error) => {
		console.error(error);
	});
}

export async function orderCommentUpdate(orderId, comment) {
	const dbRef = ref(getDatabase());
	return await get(child(dbRef, `orders/${orderId}/comment`)).then((snapshot) => {
		if (snapshot.exists()) {
			let comments = JSON.parse(snapshot.val());
			comments.push(comment);
			console.log(comments);
			update(ref(db, 'orders/' + orderId), {
				comment: JSON.stringify(comments)
			});
			return list(comments);
		} else {
			console.log("No data available");
		}

	}).catch((error) => {
		console.error(error);
	});
}

function list(comments) {
	let newComments = '';
	comments.forEach(com => {
		newComments += `<li class="card-orders__characters-comment-list-item">${com}</li> `;
	});
	return newComments;
}
*/