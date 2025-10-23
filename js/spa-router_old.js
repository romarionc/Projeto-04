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

      // ---- ESTA É A MUDANÇA PRINCIPAL ----
      // garanti que o css carregue antes do js, isso estava dando erro
      link.onload = () => {
        // Agora o css ja foi aplicado e o js pode medir os elementos (estava dando erro no carrocel)

        if (route === "/projetos") {
          import("./script.js")
            .then((mod) => {
              if (mod.initCarousel) mod.initCarousel();
            })
            .catch((err) =>
              console.error("Erro importando script do carrossel:", err)
            );
        }

        if (route === "/cadastro") {
          import("./cadastro-validation.js")
            .then((mod) => {
              if (mod.initCadastroValidation) mod.initCadastroValidation();
            })
            .catch((err) => console.error("Erro importando validação:", err));
        }
      };

      //  carrega o CSS
      document.head.appendChild(link);

      // Os imports de script (como carrossel e validação)
      // agora estão dentro do link.onload para evitar bugs de layout.

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Erro ao carregar página SPA:", err);
      content.innerHTML = "<p>Erro ao carregar conteúdo.</p>";
    }
  }

  function handleNavigation() {
    const hash = window.location.hash.slice(1);
    loadPage(hash || "/");
  }

  window.addEventListener("hashchange", handleNavigation);
  handleNavigation();
});
