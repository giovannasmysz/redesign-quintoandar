
const imoveis = [
    {
        id: 1,
        nome: "Apartamento moderno",
        tipo: "Apartamento",
        cidade: "Curitiba - PR",
        preco: 450000,
        quartos: 2,
        banheiros: 2,
        area: 75,
        imagem: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900",
        descricao: "Apartamento moderno, com ambientes amplos, iluminação natural e acabamento sofisticado."
    },
    {
        id: 2,
        nome: "Casa aconchegante",
        tipo: "Casa",
        cidade: "São Paulo - SP",
        preco: 620000,
        quartos: 3,
        banheiros: 2,
        area: 120,
        imagem: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900",
        descricao: "Casa confortável, com espaços integrados, jardim e excelente localização."
    },
    {
        id: 3,
        nome: "Apartamento elegante",
        tipo: "Apartamento",
        cidade: "Florianópolis - SC",
        preco: 550000,
        quartos: 3,
        banheiros: 2,
        area: 90,
        imagem: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900",
        descricao: "Apartamento elegante, com decoração contemporânea e ótima distribuição dos espaços."
    },
    {
        id: 4,
        nome: "Casa com jardim",
        tipo: "Casa",
        cidade: "Porto União - SC",
        preco: 380000,
        quartos: 2,
        banheiros: 1,
        area: 100,
        imagem: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900",
        descricao: "Casa com jardim, ambientes bem iluminados e espaço para toda a família."
    },
    {
        id: 5,
        nome: "Apartamento sofisticado",
        tipo: "Apartamento",
        cidade: "Curitiba - PR",
        preco: 700000,
        quartos: 3,
        banheiros: 3,
        area: 110,
        imagem: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900",
        descricao: "Apartamento sofisticado, com sala ampla e acabamentos de alto padrão."
    },
    {
        id: 6,
        nome: "Casa contemporânea",
        tipo: "Casa",
        cidade: "Joinville - SC",
        preco: 490000,
        quartos: 3,
        banheiros: 2,
        area: 130,
        imagem: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900",
        descricao: "Casa contemporânea, com fachada moderna e ambientes confortáveis."
    }
];

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 0
    });
}

function criarCard(imovel) {
    return `
        <article class="property-card">
            <img src="${imovel.imagem}"
                 alt="${imovel.nome}"
                 loading="lazy">

            <div class="property-info">
                <h3>${imovel.nome}</h3>
                <p>${imovel.cidade}</p>
                <p>${imovel.quartos} quartos • ${imovel.area} m²</p>
                <div class="price">${formatarPreco(imovel.preco)}</div>

                <button class="details-btn"
                    onclick="verDetalhes(${imovel.id})"
                    aria-label="Ver detalhes de ${imovel.nome}">
                    Ver detalhes
                </button>
            </div>
        </article>
    `;
}

function mostrarTela(id) {
    document.querySelectorAll(".tela").forEach(tela => {
        tela.classList.remove("ativa");
    });

    document.getElementById(id).classList.add("ativa");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (id === "resultados") {
        renderizarImoveis(imoveis);
    }
}

function renderizarImoveis(lista) {
    const container = document.getElementById("lista-imoveis");

    if (lista.length === 0) {
        container.innerHTML = "<p>Nenhum imóvel encontrado.</p>";
        return;
    }

    container.innerHTML = lista.map(criarCard).join("");
}


function normalizarTexto(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function pesquisarImoveis() {
    const pesquisa = document.getElementById("cidade").value.trim();

    if (!pesquisa) {
        alert("Digite uma cidade, bairro ou tipo de imóvel para pesquisar.");
        return;
    }

    const termo = normalizarTexto(pesquisa);

    const encontrados = imoveis.filter(imovel => {
        const informacoes = normalizarTexto(
            `${imovel.nome} ${imovel.tipo} ${imovel.cidade}`
        );

        return informacoes.includes(termo);
    });

    document.getElementById("mensagem-busca").textContent =
        `Resultados para: ${pesquisa}`;

    mostrarTela("resultados");
    renderizarImoveis(encontrados);
}

function filtrarImoveis() {
    const tipo = document.getElementById("filtro").value;

    const filtrados = tipo === "todos"
        ? imoveis
        : imoveis.filter(imovel => imovel.tipo === tipo);

    renderizarImoveis(filtrados);
}

function verDetalhes(id) {
    const imovel = imoveis.find(item => item.id === id);

    if (!imovel) return;

    document.getElementById("conteudo-detalhes").innerHTML = `
        <img class="detail-image"
             src="${imovel.imagem}"
             alt="${imovel.nome}">

        <div class="detail-content">
            <span class="tag">${imovel.tipo.toUpperCase()}</span>

            <h1>${imovel.nome}</h1>

            <p>${imovel.cidade}</p>

            <div class="price">${formatarPreco(imovel.preco)}</div>

            <div class="detail-features">
                <span>${imovel.quartos} quartos</span>
                <span>${imovel.banheiros} banheiros</span>
                <span>${imovel.area} m²</span>
            </div>

            <p>${imovel.descricao}</p>

            <button class="contact-btn"
                onclick="alert('Em breve você poderá entrar em contato com o anunciante!')">
                Tenho interesse
            </button>
        </div>
    `;

    mostrarTela("detalhes");
}

// Inicialização do site
document.getElementById("destaques").innerHTML =
    imoveis.slice(0, 3).map(criarCard).join("");

renderizarImoveis(imoveis);
