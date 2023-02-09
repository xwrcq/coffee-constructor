export function calculateRating(rating) {
	if (typeof (rating) == 'object') {
		rating = rating.map(el => Number(el))
		const sum = rating.reduce((a, b) => a + b, 0);
		const avg = (sum / rating.length) || 0;
		rating = avg.toFixed(2);
	}
	return rating;
}