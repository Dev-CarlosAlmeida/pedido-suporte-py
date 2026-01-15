document.getElementById('formSuporte').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = document.getElementById('formSuporte');
    const submitBtn = form.querySelector('button[type="submit"]');
    const successMsg = document.getElementById('successMessage');
    const errorMsg = document.getElementById('errorMessage');

    // Esconder mensagens anteriores
    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';

    // Desabilitar botão durante o envio
    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ Enviando...';

    const dados = {
        nome_usuario: document.getElementById('nome').value,
        assunto: document.getElementById('assunto').value,
        descricao: document.getElementById('descricao').value
    };

    try {
        const response = await fetch('http://localhost:5000/api/suporte', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (response.ok) {
            successMsg.style.display = 'block';
            form.reset();
            
            // Scroll suave para a mensagem
            successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            errorMsg.style.display = 'block';
            errorMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    } catch (error) {
        console.error('Erro:', error);
        errorMsg.style.display = 'block';
        errorMsg.textContent = '❌ Erro de conexão com o servidor. Verifique se o servidor está rodando.';
        errorMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } finally {
        // Reabilitar botão
        submitBtn.disabled = false;
        submitBtn.textContent = '🚀 Enviar Solicitação';
    }
});
