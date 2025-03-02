const header = document.querySelector('.header');
    let currentGaryIndex = 0;
    let garyImages = ['https://cdn.garybot.dev/Gary245.jpg'];

    header.style.setProperty('--gary-image', `url(${garyImages[0]})`);

    async function fetchGaryImage() {
        try {
            const response = await fetch('https://garybot.dev/api/gary');
            const data = await response.json();
            garyImages.push(data.url);
        } catch (error) {
            console.error('Error fetching Gary image:', error);
        }
    }

    setInterval(fetchGaryImage, 60000);

    header.addEventListener('mouseenter', () => {
        currentGaryIndex = (currentGaryIndex + 1) % garyImages.length;
        header.style.setProperty('--gary-image', `url(${garyImages[currentGaryIndex]})`);
    });

    document.getElementById('chat-send').addEventListener('click', () => {
        const input = document.getElementById('chat-input');
        const prompt = encodeURIComponent(input.value.trim());
        if (prompt) {
            window.open(`https://aquigpt.com.br/free?prompt=${prompt}`, '_blank');
            input.value = '';
        }
    });

    document.getElementById('chat-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('chat-send').click();
    }
});