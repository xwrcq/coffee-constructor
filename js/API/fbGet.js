import { ref, query, limitToLast, orderByChild, get } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import { db } from '../firebase.js';

export async function ordersGET() {
	const dbRef = ref(db, 'orders');
	const orders = [];

	const snapshot = await get(dbRef);
	snapshot.forEach((childSnapshot) => {
		const childKey = childSnapshot.key;
		const childData = childSnapshot.val();
		orders.push({ childKey, childData });
	});

	return orders;
}

export async function ordersWithLimitGET(limit) {
	const dbRef = query(ref(db, 'orders/'), limitToLast(limit));
	const orders = [];

	const snapshot = await get(dbRef);
	snapshot.forEach((childSnapshot) => {
		const childKey = childSnapshot.key;
		const childData = childSnapshot.val();
		orders.push({ childKey, childData });
	});

	return orders;
}

export async function ordersSortedGET(sortValue) {
	const dbRef = query(ref(db, 'orders/'), orderByChild(sortValue));
	const orders = [];

	const snapshot = await get(dbRef);
	snapshot.forEach((childSnapshot) => {
		const childKey = childSnapshot.key;
		const childData = childSnapshot.val();
		orders.push({ childKey, childData });
	});

	return orders;
}

