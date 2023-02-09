export function changeRating(stars, datasetRating) {
	let rating;
	stars.forEach((star1, index1) => {
		star1.addEventListener('click', (e) => {
			rating = e.target.closest('a').dataset.rating;
			stars.forEach((star2, index2) => {
				if (index1 >= index2) {
					star2.classList.add('active')
				} else {
					star2.classList.remove('active');
				}
			});
		});

		if (((datasetRating - 1) == index1)) {
			rating = star1.closest('a').dataset.rating;

			stars.forEach((star2, index2) => {
				if (index1 >= index2) {
					star2.classList.add('active')
				} else {
					star2.classList.remove('active');
				}
			});
		}
	});
	return rating;
}