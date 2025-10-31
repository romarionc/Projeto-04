import{_ as r}from"./app-BS-ahwJl.js";function d(a){return a.map(o=>`
    <div class="grid-item" role="group" aria-label="Slide">
      <img src="${o.src}" alt="${o.alt}">
    </div>
  `).join("")}function l(a){return`
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
      <h3>${a.titulo}</h3>
      <div class="carousel-container" tabindex="0" role="region" aria-label="Carrossel de projetos em ação">
        
        <div class="visually-hidden" aria-live="polite" data-carousel-live-region></div>

        <div class="carousel-wrapper">
          
          ${d(a.imagensCarousel)}

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
      
      <img src="img/pix.webp" alt="Logo do PIX para doações.">
    </section>
  `}const p={titulo:"Nossos Projetos em Ação",imagensCarousel:[{src:"img/doacao-01.webp",alt:"Voluntários montando cestas básicas para doação."},{src:"img/doacao-02.webp",alt:"Pessoa recebendo um prato de sopa quente."},{src:"img/doacao-03.webp",alt:"Caixa de papelão repleta de alimentos não perecíveis."},{src:"img/doacao-04.webp",alt:"Criança comendo uma maçã."},{src:"img/doacao-05.webp",alt:"Distribuição de sacolas de alimentos para a comunidade."},{src:"img/doacao-06.webp",alt:"Agricultor doando vegetais frescos para a ONG."},{src:"img/doacao-07.webp",alt:"Veículo da ONG sendo carregado com doações de alimentos."},{src:"img/doacao-08.webp",alt:"Armazém da ONG com prateleiras cheias de alimentos."},{src:"img/doacao-09.webp",alt:"Equipe de voluntários da 'Comida para Todos'."},{src:"img/doacao-10.webp",alt:"Pessoa recebendo uma cesta básica de um voluntário."},{src:"img/doacao-11.webp",alt:"Arroz e feijão para doação."},{src:"img/doacao-12.webp",alt:"Pessoas se alimentando em um refeitório comunitário."}]},i=`<section>\r
  <h2>Quem somos</h2>\r
  <p>\r
    A <strong>Comida para Todos</strong> é uma organização não governamental (ONG) sem fins lucrativos,\r
    nascida da união de cidadãos com o propósito de combater a fome e a insegurança alimentar em nossa comunidade.\r
    Acreditamos que o acesso à alimentação de qualidade é um direito humano fundamental e um pilar para a dignidade.\r
  </p>\r
  \r
  <img src="img/quentinha.webp" alt="preparação de marmita">\r
</section>\r
\r
<section>\r
  <h3>Fale conosco!</h3>\r
  <address>\r
    <p>Endereço: Avenida João Pessoa 6943, Bairro: Parangaba, CEP: 60710-735</p>\r
    <p>Fortaleza, CE</p>\r
    <p>Telefone: (85) 99881-5658</p>\r
    <p>Email: foodforall@foodforall.com</p>\r
  </address>\r
</section>`,c=`<section>\r
  <h2>Junte-se a Nós: Sua Ajuda Alimenta a Esperança!</h2>\r
  <p>\r
    Na "Comida para Todos", nosso trabalho diário só é possível graças à força e dedicação de pessoas como você.\r
    A demanda por alimentos e apoio é constante e, por isso, estamos sempre precisando de novos voluntários.\r
  </p>\r
</section>\r
\r
<section>\r
  <h3>Formulário para Voluntários <span class="badge badge-success">Novo</span></h3>\r
\r
  <form id="volunteer-form" novalidate>\r
    <fieldset>\r
      <legend>Informações Pessoais</legend>\r
\r
      <div class="form-group">\r
        <label for="nome">Nome Completo:</label>\r
        <input type="text" id="nome" name="nome" required minlength="3">\r
      </div>\r
\r
      <div class="form-group">\r
        <label for="email">E-mail:</label>\r
        <input type="email" id="email" name="email" required>\r
      </div>\r
\r
      <div class="form-group">\r
        <label for="cpf">CPF:</label>\r
        <input type="text" id="cpf" name="cpf" pattern="[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}" placeholder="000.000.000-00" title="Formato: 000.000.000-00" required>\r
      </div>\r
\r
      <div class="form-group">\r
        <label for="telefone">Telefone:</label>\r
        <input type="tel" id="telefone" name="telefone" placeholder="(00) 90000-0000" pattern="\\(\\d{2}\\)\\s\\d{4,5}-\\d{4}" required>\r
      </div>\r
\r
      <div class="form-group">\r
        <label for="nascimento">Data de Nascimento:</label>\r
        <input type="date" id="nascimento" name="nascimento" required>\r
      </div>\r
\r
      <div class="form-group">\r
        <label for="idade">Idade:</label>\r
        <input type="number" id="idade" name="idade" min="18" max="120" required placeholder="Mínimo 18 anos">\r
      </div>\r
\r
      <div class="form-group">\r
        <label for="endereco">Endereço:</label>\r
        <input type="text" id="endereco" name="endereco" required>\r
      </div>\r
\r
      <div class="form-group">\r
        <label for="cep">CEP:</label>\r
        <input type="text" id="cep" name="cep" pattern="[0-9]{5}-[0-9]{3}" placeholder="00000-000" title="Formato: 00000-000" required>\r
      </div>\r
\r
      <div class="form-group">\r
        <label for="cidade">Cidade:</label>\r
        <input type="text" id="cidade" name="cidade" required>\r
      </div>\r
\r
      <div class="form-group">\r
        <label for="estado">Estado:</label>\r
        <select name="estado" id="estado" required>\r
          <option value="" selected disabled>Selecione uma das opções</option>\r
          <option value="AC">AC</option>\r
          <option value="AL">AL</option>\r
          <option value="AP">AP</option>\r
          <option value="AM">AM</option>\r
          <option value="BA">BA</option>\r
          <option value="CE">CE</option>\r
          <option value="DF">DF</option>\r
          <option value="ES">ES</option>\r
          <option value="GO">GO</option>\r
          <option value="MA">MA</option>\r
          <option value="MT">MT</option>\r
          <option value="MS">MS</option>\r
          <option value="MG">MG</option>\r
          <option value="PA">PA</option>\r
          <option value="PB">PB</option>\r
          <option value="PR">PR</option>\r
          <option value="PE">PE</option>\r
          <option value="PI">PI</option>\r
          <option value="RJ">RJ</option>\r
          <option value="RN">RN</option>\r
          <option value="RS">RS</option>\r
          <option value="RO">RO</option>\r
          <option value="RR">RR</option>\r
          <option value="SC">SC</option>\r
          <option value="SP">SP</option>\r
          <option value="SE">SE</option>\r
          <option value="TO">TO</option>\r
        </select>\r
      </div>\r
    </fieldset>\r
\r
    <button type="submit" class="btn btn-primary form-submit-btn">Quero ser voluntário!</button>\r
  </form>\r
\r
  <br>\r
  <img src="img/seja_voluntario.webp" alt="voluntários abraçados">\r
</section>`,t=document.getElementById("spa-content"),m="ONG - Comida para Todos";async function u(a){let o,e;switch(a){case"/":o=i,e="Página Inicial";break;case"/projetos":o=l(p),e="Projetos Sociais";break;case"/cadastro":o=c,e="Cadastro de Voluntários";break;default:o=i,e="Página Inicial"}try{t.innerHTML=o,document.title=`${e} | ${m}`;const n=t.querySelector("h2");n&&(n.setAttribute("tabindex","-1"),n.focus()),v(a)}catch(n){console.error("Erro ao carregar página SPA:",n)}}function v(a){a==="/projetos"&&r(()=>import("./script-B6-lzYyG.js"),[],import.meta.url).then(o=>o.initCarousel?.()).catch(o=>console.error("Erro importando script.js:",o)),a==="/cadastro"&&r(()=>import("./cadastro-validation-ClOe4udU.js"),[],import.meta.url).then(o=>o.initCadastroValidation?.()).catch(o=>console.error("Erro importando cadastro-validation.js:",o))}function s(){const a=window.location.hash.slice(1);u(a||"/")}window.addEventListener("hashchange",s);s();
