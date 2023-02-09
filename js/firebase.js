import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";

const firebaseConfig = {
	apiKey: "AIzaSyBKo2uo9tDW8lHDL7v73F4mLRTCqNlDByQ",
	authDomain: "coffee-constructor.firebaseapp.com",
	databaseURL: "https://coffee-constructor-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "coffee-constructor",
	storageBucket: "coffee-constructor.appspot.com",
	messagingSenderId: "1035442265366",
	appId: "1:1035442265366:web:40619a66fef9876510c437"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);