document.getElementById('chat-send').addEventListener('click', () => {
    const input = document.getElementById('chat-input');
    const model = document.getElementById('model-select').value;
    const prompt = encodeURIComponent(input.value.trim());
    if (prompt) {
        window.open(`https://aquigpt.com.br/free?prompt=${prompt}&model=${model}`, '_blank');
        input.value = '';
    }
});

document.getElementById('chat-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('chat-send').click();
    }
});
