// tenho que gerar as <img> para o carrossel
function renderCarouselItems(imagens) {
  // criando as div,para o carrocel
  return imagens
    .map(
      (img) => `
    <div class="grid-item" role="group" aria-label="Slide">
      <img src="${img.src}" alt="${img.alt}">
    </div>
  `
    )
    .join("");
}

//gera o html completo
export function templateProjetos(dados) {
  return `
    <section>
      <h2>O que fazemos</h2>
      <p>
        <strong>Ação nas Ruas:</strong> Nossas equipes de voluntários percorrem a cidade regularmente
        para distribuir refeições completas e nutritivas à população em situação de rua.
        Mais do que apenas alimento, oferecemos uma palavra de conforto, um olhar de acolhimento e a certeza de que eles não foram esquecidos.
        <br><br>
        <span class="tag tag-primary">Voluntariado</span>
        <span class="tag">Ação Social</span>
      </p>

      <p>
        <strong>Apoio às Famílias:</strong> Através de um sistema de cadastro e parcerias, identificamos famílias em situação de vulnerabilidade
        e fornecemos cestas básicas com itens essenciais. Com isso, garantimos o alívio imediato da fome e permitimos que essas famílias
        possam focar em outras necessidades, como saúde, educação e a busca por emprego.
        <br><br>
        <span class="tag tag-secondary">Doações</span>
        <span class="tag tag-success">Cestas Básicas</span>
      </p>
    </section>

    <section id="carrocel">
      <h3>${dados.titulo}</h3>
      <div class="carousel-container" tabindex="0" role="region" aria-label="Carrossel de projetos em ação">
        
        <div class="visually-hidden" aria-live="polite" data-carousel-live-region></div>

        <div class="carousel-wrapper">
          
          ${renderCarouselItems(dados.imagensCarousel)}

        </div>

        <button id="prevBtn" class="nav-btn" aria-label="Slide anterior">‹</button>
        <button id="nextBtn" class="nav-btn" aria-label="Próximo slide">›</button>
      </div>
    </section>

    <section>
      <h4>Sua Doação Transforma Vidas!</h4>
      <p>
        Doar para a "Comida para Todos" é mais do que um simples ato de caridade;
        é um investimento direto na dignidade humana e na construção de uma sociedade mais justa e solidária.
        Cada contribuição, não importa o tamanho, gera um impacto profundo e imediato na vida de quem enfrenta a dura realidade da fome.
      </p>
    </section>

    <section>
      <h5>Como doar!</h5>
      <p>Banco: Fintech 0taxa</p>
      <p>Agência: 0001-1</p>
      <p>Conta Corrente: 12346578-9</p>
      <p>Chave Pix: foodforall@foodforall.com</p>
      <img src="img/pix.png" alt="logo pix">
    </section>
  `;
}
