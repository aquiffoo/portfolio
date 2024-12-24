document.addEventListener('DOMContentLoaded', () => {
	const cursor = document.querySelector('.cursor');
	const textCursor = document.querySelector('.text-cursor');
	const emojis = document.querySelectorAll('.emoji');
	const links = document.querySelectorAll('a');
	const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
	const header = document.querySelector('header');

	let isMoving = false;
	let moveTimeout;
	let prevMouseX = 0;
	let prevMouseY = 0;

	const handleMouseMove = (e) => {
		const mouseX = e.clientX;
		const mouseY = e.clientY;

		cursor.style.left = `${mouseX - cursor.offsetWidth / 2}px`;
		cursor.style.top = `${mouseY - cursor.offsetHeight / 2}px`;
	
		textCursor.style.left = `${mouseX - textCursor.offsetWidth / 2}px`;
		textCursor.style.top = `${mouseY - textCursor.offsetHeight / 2}px`;

		if (!isMoving) {
			cursor.classList.add('moving');
			isMoving = true;
		}

		clearTimeout(moveTimeout);
		moveTimeout = setTimeout(() => {
			cursor.classList.remove('moving');
			isMoving = false;
		}, 100);

		const xStretch = (mouseX - prevMouseX) * 0.1;
		const yStretch = (mouseY - prevMouseY) * 0.1;
		cursor.style.transform = `translate(${xStretch}px, ${yStretch}px)`;

		prevMouseX = mouseX;
		prevMouseY = mouseY;
	};

	document.addEventListener('mousemove', handleMouseMove);

	links.forEach(link => {
		link.addEventListener('mouseenter', () => {
			cursor.classList.add('on-link');
		});
		link.addEventListener('mouseleave', () => {
			cursor.classList.remove('on-link');
		});
	});

	textElements.forEach(element => {
		element.addEventListener('mouseenter', () => {
			textCursor.style.display = 'flex';
			textCursor.textContent = 'Text';
		});
		element.addEventListener('mouseleave', () => {
			textCursor.style.display = 'none';
		});
	});

	emojis.forEach(emoji => {
		emoji.addEventListener('click', () => {
			const originalEmoji = emoji.dataset.emoji;
			emoji.textContent = '🎉';
			setTimeout(() => {
				emoji.textContent = originalEmoji;
			}, 1000);
		});
	});

	const animateText = (element) => {
		const text = element.textContent;
		element.textContent = '';
		let i = 0;

		const type = () => {
			if (i < text.length) {
				element.textContent += text.charAt(i);
				i++;
				requestAnimationFrame(type);
			}
		};

		requestAnimationFrame(type);
	};

	const animatedTextElements = document.querySelectorAll('.animated-text');

	const initializeText = () => {
		animatedTextElements.forEach(element => {
			element.style.visibility = 'hidden';
		});
		updateTextSize();
		animatedTextElements.forEach(animateText);
	};

	const updateTextSize = () => {
		animatedTextElements.forEach(element => {
			const containerWidth = element.parentElement.offsetWidth;
			let fontSize = parseFloat(window.getComputedStyle(element).fontSize);
			element.style.whiteSpace = 'nowrap';

			while (element.offsetWidth > containerWidth && fontSize > 10) {
				fontSize -= 0.5;
				element.style.fontSize = `${fontSize}px`;
			}

			element.style.visibility = 'visible';
		});
	};

	const skillItems = document.querySelectorAll('.skill-item');

	skillItems.forEach(item => {
		const skillLevel = item.querySelector('.skill-level');
		const percentage = item.querySelector('.skill-level').dataset.percentage;

		skillLevel.style.setProperty('--skill-percentage', `${percentage}%`);

		const skillPercentageElement = document.createElement('span');
		skillPercentageElement.classList.add('skill-percentage');
		skillPercentageElement.textContent = `${percentage}%`;
		item.appendChild(skillPercentageElement);
	});

	window.addEventListener('load', initializeText);
	window.addEventListener('resize', updateTextSize);
});