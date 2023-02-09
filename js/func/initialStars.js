export function initialStars(parent) {
	setTimeout(() => {
		Array.from(parent.children).forEach(card => {
			const id = card.id;
			const ratingPrev = (JSON.parse(localStorage.getItem('rating')) || []).find(el => {
				return Object.keys(el).find(k => k == id);
			})

			if (ratingPrev) {
				const stars = Array.from(card.querySelectorAll('.content-modal__star'));
				for (let i = 0; i < ratingPrev[id]; i++) {
					stars[i].classList.add('active')
				}
			}
		});
	}, 100);
}