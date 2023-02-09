let delay;

export function controlFromInput(fromSlider, fromInput, toInput, controlSlider, filterName, func) {
	let [from, to] = getParsed(fromInput, toInput);
	fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
	if (from > to) {
		fromSlider.value = to;
		fromInput.value = to;
		from = to;
	} else {
		fromSlider.value = from;
	}

	if (delay) window.clearTimeout(delay);
	delay = setTimeout(() => func(filterName, from, to), 50);
}

export function controlToInput(toSlider, fromInput, toInput, controlSlider, filterName, func) {
	let [from, to] = getParsed(fromInput, toInput);
	fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
	setToggleAccessible(toInput);
	if (from <= to) {
		toSlider.value = to;
		toInput.value = to;
	} else {
		to = from;
		toInput.value = from;
	}

	if (delay) window.clearTimeout(delay);
	delay = setTimeout(() => func(filterName, from, to), 50);
}

export function controlFromSlider(fromSlider, toSlider, fromInput, filterName, func) {
	let [from, to] = getParsed(fromSlider, toSlider);
	fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
	if (from > to) {
		fromSlider.value = to;
		fromInput.value = to;
		from = to;
	} else {
		fromInput.value = from;
	}

	if (delay) window.clearTimeout(delay);
	delay = setTimeout(() => func(filterName, from, to), 50);
}

export function controlToSlider(fromSlider, toSlider, toInput, filterName, func) {
	let [from, to] = getParsed(fromSlider, toSlider);
	fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
	setToggleAccessible(toSlider);
	if (from <= to) {
		toSlider.value = to;
		toInput.value = to;
	} else {
		to = from;
		toInput.value = from;
		toSlider.value = from;
	}

	if (delay) window.clearTimeout(delay);
	delay = setTimeout(() => func(filterName, from, to), 50);
}

export function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
	const rangeDistance = to.max - to.min;
	const fromPosition = from.value - to.min;
	const toPosition = to.value - to.min;
	controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition) / (rangeDistance) * 100}%,
      ${rangeColor} ${((fromPosition) / (rangeDistance)) * 100}%,
      ${rangeColor} ${(toPosition) / (rangeDistance) * 100}%, 
      ${sliderColor} ${(toPosition) / (rangeDistance) * 100}%, 
      ${sliderColor} 100%)`;
}

export function setToggleAccessible(currentTarget) {
	const toSlider = document.querySelector('.toSlider');
	if (Number(currentTarget.value) <= 0) {
		toSlider.style.zIndex = 2;
	} else {
		toSlider.style.zIndex = 0;
	}
}

function getParsed(currentFrom, currentTo) {
	const from = parseInt(currentFrom.value, 10);
	const to = parseInt(currentTo.value, 10);
	return [from, to];
}