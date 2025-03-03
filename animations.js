document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = [
        { element: document.querySelector('.header'), delay: 0, animation: 'diagonal-3d' },
        { element: document.querySelector('.chat-bar'), delay: 200, animation: 'diagonal-3d' },
        { element: document.querySelector('.game-container'), delay: 400, animation: 'diagonal-3d' }
    ];

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        elementsToAnimate.push({
            element: card,
            delay: index * 100,
            animation: 'fade-in-up'
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const { element, delay, animation } = elementsToAnimate.find(item => item.element === entry.target);
                setTimeout(() => {
                    element.classList.add(animation);
                }, delay);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.1 });

    elementsToAnimate.forEach(item => {
        if (item.element) {
            observer.observe(item.element);
        }
    });
});
