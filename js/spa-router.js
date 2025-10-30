// Controla a navegação SPA e o carregamento das páginas
import { templateProjetos } from "./templates.js";
import { dadosProjetos } from "./projetos-data.js";

document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("spa-content");
  const baseTitle = "ONG - Comida para Todos";

  async function loadPage(route) {
    let path, cssPath, html, pageTitle;

    switch (route) {
      case "/":
        path = "pages/home.html";
        cssPath = "css/style_index.css";
        pageTitle = "Página Inicial"; // Título para o leitor de tela
        break;
      case "/projetos":
        cssPath = "css/style_projetos.css";
        html = templateProjetos(dadosProjetos);
        pageTitle = "Projetos Sociais"; // Título para o leitor de tela
        break;
      case "/cadastro":
        path = "pages/cadastro.html";
        cssPath = "css/style_cadastro.css";
        pageTitle = "Cadastro de Voluntários"; // Título para o leitor de tela
        break;
      default:
        path = "pages/home.html";
        cssPath = "css/style_index.css";
        pageTitle = "Página Inicial";
    }

    try {
      if (!html) {
        const response = await fetch(path);
        if (!response.ok) {
          throw new Error(
            `Erro ao buscar HTML: ${response.status} ${response.statusText}`
          );
        }
        html = await response.text();
      }

      content.innerHTML = html;

      // --- MUDANÇAS PARA LEITORES DE TELA ---
      // 1. Atualiza o título da aba do navegador (anuncia a mudança de página)
      document.title = `${pageTitle} | ${baseTitle}`;

      // 2. Move o foco para o novo conteúdo
      // Encontra o primeiro <h2> (ou <h3>, <section>) no conteúdo carregado
      const newHeading = content.querySelector("h2");
      if (newHeading) {
        // Adiciona tabindex="-1" para permitir que ele receba foco via JS
        newHeading.setAttribute("tabindex", "-1");
        // Move o foco do leitor de tela para o novo título
        newHeading.focus();
      }
      // --- FIM DAS MUDANÇAS ---

      // tira estilos antigos
      document
        .querySelectorAll("link[data-page-style]")
        .forEach((link) => link.remove());

      // tentando criar novos links css
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssPath + "?v=" + Date.now();
      link.setAttribute("data-page-style", "true");

      link.onerror = () => {
        console.error(`Falha ao carregar o arquivo CSS: ${cssPath}`);
        loadPageScripts(route);
      };

      link.onload = () => {
        // O CSS carregou, agora carregamos os scripts
        loadPageScripts(route);
      };

      //  carrega o CSS
      document.head.appendChild(link);

      // (Scroll para o topo removido, pois o foco no H2 já faz isso)
    } catch (err) {
      // O 'fetch' do HTML falhou
      console.error("Erro ao carregar página SPA:", err);
      content.innerHTML = `<p>Erro ao carregar conteúdo. Verifique se o arquivo '${path}' existe.</p>`;
    }
  }

  // Função separada para carregar scripts
  function loadPageScripts(route) {
    if (route === "/projetos") {
      import("./script.js")
        .then((mod) => {
          if (mod.initCarousel) mod.initCarousel();
        })
        .catch(
          (err) => console.error("Erro importando script.js:", err) // ADICIONADO
        );
    }

    if (route === "/cadastro") {
      import("./cadastro-validation.js")
        .then((mod) => {
          if (mod.initCadastroValidation) mod.initCadastroValidation();
        })
        .catch(
          (err) => console.error("Erro importando cadastro-validation.js:", err) // ADICIONADO
        );
    }
  }

  function handleNavigation() {
    const hash = window.location.hash.slice(1);
    loadPage(hash || "/");
  }

  window.addEventListener("hashchange", handleNavigation);
  handleNavigation();
});
