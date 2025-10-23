// Controla a navegação SPA e o carregamento das páginas
import { templateProjetos } from "./templates.js";
import { dadosProjetos } from "./projetos-data.js";

document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("spa-content");

  async function loadPage(route) {
    let path, cssPath, html;

    switch (route) {
      case "/":
        path = "pages/home.html";
        cssPath = "css/style_index.css";
        break;
      case "/projetos":
        cssPath = "css/style_projetos.css";
        html = templateProjetos(dadosProjetos);
        break;
      case "/cadastro":
        path = "pages/cadastro.html";
        cssPath = "css/style_cadastro.css";
        break;
      default:
        path = "pages/home.html";
        cssPath = "css/style_index.css";
    }

    try {
      if (!html) {
        const response = await fetch(path);
        // ADICIONADO: Verificar se o fetch foi bem sucedido
        if (!response.ok) {
          throw new Error(
            `Erro ao buscar HTML: ${response.status} ${response.statusText}`
          );
        }
        html = await response.text();
      }

      content.innerHTML = html;

      // tira estilos antigos
      document
        .querySelectorAll("link[data-page-style]")
        .forEach((link) => link.remove());

      // tentando criar novos links css
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssPath + "?v=" + Date.now();
      link.setAttribute("data-page-style", "true");

      // não estava achando o erro 'onerror' para reportar falhas no CSS
      link.onerror = () => {
        console.error(`Falha ao carregar o arquivo CSS: ${cssPath}`);
        // Mesmo se o CSS falhar, tentamos carregar o JS
        // (Remova isso se o JS depender estritamente do CSS)
        loadPageScripts(route);
      };

      link.onload = () => {
        // O CSS carregou, agora carregamos os scripts
        loadPageScripts(route);
      };

      //  carrega o CSS
      document.head.appendChild(link);

      window.scrollTo({ top: 0, behavior: "smooth" });
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
