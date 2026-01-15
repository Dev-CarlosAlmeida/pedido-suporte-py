async function carregarChamados() {
    const loading = document.getElementById('loading');
    const container = document.getElementById('ticketsContainer');
    const emptyState = document.getElementById('emptyState');
    const totalTickets = document.getElementById('totalTickets');

    // Mostrar loading
    loading.style.display = 'block';
    container.style.display = 'none';
    emptyState.style.display = 'none';

    try {
        const response = await fetch('http://localhost:5000/api/suporte');
        
        if (!response.ok) {
            throw new Error('Erro ao carregar chamados');
        }

        const chamados = await response.json();

        // Atualizar contador
        totalTickets.textContent = chamados.length;

        // Esconder loading
        loading.style.display = 'none';

        if (chamados.length === 0) {
            emptyState.style.display = 'block';
            return;
        }

        // Limpar container
        container.innerHTML = '';

        // Criar cards para cada chamado
        chamados.forEach((chamado, index) => {
            const card = document.createElement('div');
            card.className = 'ticket-card';
            card.style.animationDelay = `${index * 0.1}s`;

            const dataFormatada = new Date(chamado.data_criacao).toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            card.innerHTML = `
                <div class="ticket-header">
                    <div>
                        <span class="ticket-id">Ticket #${chamado.id}</span>
                    </div>
                    <div class="ticket-date">📅 ${dataFormatada}</div>
                </div>
                <div class="ticket-name">👤 ${chamado.nome_usuario}</div>
                <div class="ticket-subject">📌 ${chamado.assunto}</div>
                <div class="ticket-description">${chamado.descricao}</div>
            `;

            container.appendChild(card);
        });

        container.style.display = 'grid';

    } catch (error) {
        console.error('Erro ao carregar chamados:', error);
        loading.style.display = 'none';
        emptyState.style.display = 'block';
        emptyState.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <h3>Erro ao carregar chamados</h3>
            <p>Verifique se o servidor está rodando e tente novamente.</p>
        `;
    }
}

// Carrega os dados ao abrir a página
carregarChamados();
