    document.addEventListener("DOMContentLoaded", () => {
    const carrossel = document.querySelector(".carrossel");
    const cards = document.querySelectorAll(".cartao");
    const btnEsquerda = document.querySelector(".controle.esquerda");
    const btnDireita = document.querySelector(".controle.direita");
    const indicadores = document.querySelectorAll(".indicador");

    let indiceAtual = 0;
    let cardsPorPagina = 4;
    let totalPaginas = Math.ceil(cards.length / cardsPorPagina);

    // Atualiza o estado dos botões e indicadores
    function atualizarControles() {
        btnEsquerda.disabled = indiceAtual === 0;
        btnDireita.disabled = indiceAtual === totalPaginas - 1;

        indicadores.forEach((ind, i) => {
        ind.classList.toggle("ativo", i === indiceAtual);
        });
    }

    // Move o carrossel para o índice atual
    function moverCarrossel() {
        const larguraCard = cards[0].offsetWidth + 24; // largura + gap
        const deslocamento = -indiceAtual * larguraCard * cardsPorPagina;
        carrossel.style.transform = `translateX(${deslocamento}px)`;
        atualizarControles();
    }

    // Atualiza cardsPorPagina e totalPaginas conforme largura da tela
    function atualizarCardsPorPagina() {
        const larguraJanela = window.innerWidth;
        if (larguraJanela < 600) {
        cardsPorPagina = 1;
        } else if (larguraJanela < 900) {
        cardsPorPagina = 2;
        } else if (larguraJanela < 1200) {
        cardsPorPagina = 3;
        } else {
        cardsPorPagina = 4;
        }
        totalPaginas = Math.ceil(cards.length / cardsPorPagina);
        // Ajusta índiceAtual para não ultrapassar o total de páginas
        if (indiceAtual > totalPaginas - 1) {
        indiceAtual = totalPaginas - 1;
        }
        moverCarrossel();
    }

    // Eventos dos botões de navegação
    btnEsquerda.addEventListener("click", () => {
        if (indiceAtual > 0) {
        indiceAtual--;
        moverCarrossel();
        }
    });

    btnDireita.addEventListener("click", () => {
        if (indiceAtual < totalPaginas - 1) {
        indiceAtual++;
        moverCarrossel();
        }
    });

    // Eventos dos indicadores
    indicadores.forEach((ind, i) => {
        ind.addEventListener("click", () => {
        indiceAtual = i;
        moverCarrossel();
        });
    });

    // Troca da imagem principal ao clicar nas miniaturas
    cards.forEach((card) => {
        const imgPrincipal = card.querySelector(".imagem-cartao img");
        const miniaturas = card.querySelectorAll(".miniatura");

        miniaturas.forEach((mini) => {
        mini.addEventListener("click", () => {
            // Atualiza imagem principal
            imgPrincipal.src = mini.src;
            imgPrincipal.alt = mini.alt;

            // Atualiza destaque das miniaturas
            miniaturas.forEach((m) => m.classList.remove("ativa"));
            mini.classList.add("ativa");
        });
        });
    });

    // Atualiza cards por página ao redimensionar a janela
    window.addEventListener("resize", atualizarCardsPorPagina);

    // Inicializa
    atualizarCardsPorPagina();
    atualizarControles();
    });
