let mode = 6,
	colors = [],
	pickedColor,
	tries = 0;

const squares = document.querySelectorAll('.square'),
	failMessages = [
		'Nope',
		'Try again!',
		"That's not it",
		'You should try easy mode',
		"It's not that hard!",
		"Hard mode wasn't made for you",
		"I see you don't give up"
	],
	h1 = document.querySelector('h1'),
	titleRGB = document.getElementById('titleRGB'),
	resetButton = document.getElementById('reset'),
	message = document.getElementById('message'),
	modeButtons = document.querySelectorAll('.mode');

init();

resetButton.addEventListener('click', () => {
	reset();
});

function init() {
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons() {
	modeButtons.forEach((button) => {
		button.addEventListener('click', () => {
			modeButtons[0].classList.remove('selected');
			modeButtons[1].classList.remove('selected');
			modeButtons[2].classList.remove('selected');
			button.classList.add('selected');
			mode = button.textContent === 'Easy' ? 3 : button.textContent === 'Normal' ? 6 : 9;
			reset();
		});
	});
}

function setupSquares() {
	squares.forEach((square, i) => {
		square.addEventListener('click', () => {
			const selectedColor = colors[i];
			tries++;

			if (selectedColor === pickedColor) {
				matchColors(selectedColor);
				disableAll();
				tries = 0;
				h1.style.backgroundColor = selectedColor;
				message.textContent = 'You win!';
				resetButton.textContent = 'Play again?';
			} else {
				square.classList.add('disabled');
				if (mode === tries + 1) {
					matchColors('#232323');
					disableAll();
					h1.style.backgroundColor = '#232323';
					message.textContent = 'You lost! :(';
					resetButton.textContent = 'Play again?';
				} else {
					square.style.backgroundColor = '#232323';
					message.textContent = failMessages[tries - 1];
				}
			}
		});
	});
}

function reset() {
	tries = 0;
	colors = generateColors(mode);
	pickedColor = pickColor();
	h1.style.backgroundColor = 'steelblue';
	titleRGB.textContent = pickedColor;
	resetButton.textContent = 'New colors';
	message.textContent = '';
	squares.forEach((square, i) => {
		square.classList.remove('disabled');
		if (colors[i]) {
			square.style.backgroundColor = colors[i];
			square.style.display = 'block';
		} else {
			square.style.display = 'none';
		}
	});
}

function disableAll() {
	squares.forEach((square) => {
		square.classList.add('disabled');
	});
}

function matchColors(color) {
	squares.forEach((square) => {
		square.style.backgroundColor = color;
	});
}

function pickColor() {
	const random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateColors(num) {
	const arr = [];
	for (let i = 0; i < num; i++) {
		arr.push(randomColor());
	}

	return arr;
}

function randomColor() {
	const r = Math.floor(Math.random() * 256),
		g = Math.floor(Math.random() * 256),
		b = Math.floor(Math.random() * 256);

	return `rgb(${r}, ${g}, ${b})`;
}
