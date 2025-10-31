const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/script-Dnc1U204.js","assets/index-BY-JyukN.js","assets/index-CZZ_Eraa.css","assets/cadastro-validation-C91uyGg_.js"])))=>i.map(i=>d[i]);
import{_ as n}from"./index-BY-JyukN.js";function d(e){return e.map(a=>`
    <div class="grid-item" role="group" aria-label="Slide">
      <img src="${a.src}" alt="${a.alt}">
    </div>
  `).join("")}function l(e){return`
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
      <h3>${e.titulo}</h3>
      <div class="carousel-container" tabindex="0" role="region" aria-label="Carrossel de projetos em ação">
        
        <div class="visually-hidden" aria-live="polite" data-carousel-live-region></div>

        <div class="carousel-wrapper">
          
          ${d(e.imagensCarousel)}

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
      
      <picture>
        <source srcset="/img/pix.webp" type="image/webp">
        <source srcset="/img/pix.png" type="image/png">
        <img src="/img/pix.png" alt="Logo do PIX para doações.">
      </picture>

    </section>
  `}const m={titulo:"Nossos Projetos em Ação",imagensCarousel:[{src:"/img/doacao-01.webp",alt:"Voluntários montando cestas básicas para doação."},{src:"/img/doacao-02.webp",alt:"Pessoa recebendo um prato de sopa quente."},{src:"/img/doacao-03.webp",alt:"Caixa de papelão repleta de alimentos não perecíveis."},{src:"/img/doacao-04.webp",alt:"Criança comendo uma maçã."},{src:"/img/doacao-05.webp",alt:"Distribuição de sacolas de alimentos para a comunidade."},{src:"/img/doacao-06.webp",alt:"Agricultor doando vegetais frescos para a ONG."},{src:"/img/doacao-07.webp",alt:"Veículo da ONG sendo carregado com doações de alimentos."},{src:"/img/doacao-08.webp",alt:"Armazém da ONG com prateleiras cheias de alimentos."},{src:"/img/doacao-09.webp",alt:"Equipe de voluntários da 'Comida para Todos'."},{src:"/img/doacao-10.webp",alt:"Pessoa recebendo uma cesta básica de um voluntário."},{src:"/img/doacao-11.webp",alt:"Arroz e feijão para doação."},{src:"/img/doacao-12.webp",alt:"Pessoas se alimentando em um refeitório comunitário."}]},t=document.getElementById("spa-content"),p="ONG - Comida para Todos";async function u(e){let a,i,o;switch(e){case"/":a="/pages/home.html",o="Página Inicial";break;case"/projetos":i=l(m),o="Projetos Sociais";break;case"/cadastro":a="/pages/cadastro.html",o="Cadastro de Voluntários";break;default:a="/pages/home.html",o="Página Inicial"}try{if(!i){const r=await fetch(a);if(!r.ok)throw new Error(`Erro ao buscar HTML: ${r.status} ${r.statusText}`);i=await r.text()}t.innerHTML=i,document.title=`${o} | ${p}`;const s=t.querySelector("h2");s&&(s.setAttribute("tabindex","-1"),s.focus()),g(e)}catch(s){console.error("Erro ao carregar página SPA:",s),t.innerHTML=`<p>Erro ao carregar conteúdo. Verifique se o arquivo '${a}' existe.</p>`}}function g(e){e==="/projetos"&&n(()=>import("./script-Dnc1U204.js"),__vite__mapDeps([0,1,2])).then(a=>{a.initCarousel&&a.initCarousel()}).catch(a=>console.error("Erro importando script.js:",a)),e==="/cadastro"&&n(()=>import("./cadastro-validation-C91uyGg_.js"),__vite__mapDeps([3,1,2])).then(a=>{a.initCadastroValidation&&a.initCadastroValidation()}).catch(a=>console.error("Erro importando cadastro-validation.js:",a))}function c(){const e=window.location.hash.slice(1);u(e||"/")}window.addEventListener("hashchange",c);c();
