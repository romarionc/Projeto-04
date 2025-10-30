document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.getElementById("main-nav");
  const dropdownLinks = document.querySelectorAll(
    ".dropdown > a[aria-haspopup='true']"
  );

  if (navToggle && mainNav) {
    // --- GERENCIAMENTO DO MENU MOBILE ---

    // Armazena o primeiro link focável dentro do menu
    const firstFocusableEl = mainNav.querySelector("a[href]");

    // Função para fechar o menu
    function closeMobileMenu() {
      mainNav.classList.remove("nav-open");
      navToggle.classList.remove("is-active");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-lock-scroll");
      // Devolve o foco ao botão que abriu o menu
      navToggle.focus();
    }

    // Função para abrir o menu
    function openMobileMenu() {
      mainNav.classList.add("nav-open");
      navToggle.classList.add("is-active");
      navToggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("nav-lock-scroll");
      // Move o foco para o primeiro item do menu
      firstFocusableEl?.focus();
    }

    // Listener do botão de toggle
    navToggle.addEventListener("click", () => {
      const isExpanded = mainNav.classList.contains("nav-open");
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Listener para fechar o menu com a tecla 'Escape'
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mainNav.classList.contains("nav-open")) {
        closeMobileMenu();
      }
    });

    // --- GERENCIAMENTO DO DROPDOWN DE DESKTOP ---

    dropdownLinks.forEach((link) => {
      const submenu = link.nextElementSibling; // O <ul> do submenu

      function toggleDropdown(event) {
        // Impede a navegação SPA se for um clique para abrir/fechar o dropdown
        // Permite a navegação se o link for pressionado (Enter)
        if (event.type === "click") {
          event.preventDefault();
        }

        const isExpanded = link.getAttribute("aria-expanded") === "true";

        // Fecha todos os outros dropdowns abertos
        closeAllDropdowns(link);

        if (isExpanded) {
          link.setAttribute("aria-expanded", "false");
          submenu.classList.remove("submenu-open");
        } else {
          link.setAttribute("aria-expanded", "true");
          submenu.classList.add("submenu-open");
        }
      }

      // Abre com Click
      link.addEventListener("click", toggleDropdown);

      // Abre com Enter ou Espaço
      link.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault(); // Impede o scroll da página (Espaço)
          toggleDropdown(e);
        }
      });
    });
    

    // Fecha dropdowns se clicar fora deles
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".dropdown")) {
        closeAllDropdowns();
      }
    });

    // Fecha dropdowns com a tecla 'Escape'
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeAllDropdowns();
      }
    });

    function closeAllDropdowns(exceptLink = null) {
      dropdownLinks.forEach((l) => {
        if (l !== exceptLink) {
          l.setAttribute("aria-expanded", "false");
          l.nextElementSibling.classList.remove("submenu-open");
        }
      });
    }
  }
});
