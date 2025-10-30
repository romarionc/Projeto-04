document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.getElementById("main-nav");
  const dropdownLinks = document.querySelectorAll(
    ".dropdown > a[aria-haspopup='true']"
  );
  const allNavLinks = mainNav.querySelectorAll("a[href]");

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
      mainNav.setAttribute("aria-hidden", "true"); // OCULTA do leitor de tela
      // Devolve o foco ao botão que abriu o menu
      navToggle.focus();
    }

    // Função para abrir o menu
    function openMobileMenu() {
      mainNav.classList.add("nav-open");
      navToggle.classList.add("is-active");
      navToggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("nav-lock-scroll");
      mainNav.setAttribute("aria-hidden", "false"); // EXIBE para o leitor de tela
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

    // Fechar o menu mobile ao clicar em QUALQUER link
    allNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        // Só fecha se o menu mobile estiver aberto
        if (mainNav.classList.contains("nav-open")) {
          closeMobileMenu();
        }
      });
    });

    // --- GERENCIAMENTO DO DROPDOWN DE DESKTOP (CORRIGIDO) ---

    dropdownLinks.forEach((link) => {
      const submenu = link.nextElementSibling; // O <ul> do submenu

      function toggleDropdown(open) {
        const isExpanded = link.getAttribute("aria-expanded") === "true";
        // Decide se deve abrir ou fechar.
        const shouldOpen = typeof open === "boolean" ? open : !isExpanded;

        if (shouldOpen) {
          // Fecha outros dropdowns abertos
          closeAllDropdowns(link);
          link.setAttribute("aria-expanded", "true");
          submenu.classList.add("submenu-open");
        } else {
          link.setAttribute("aria-expanded", "false");
          submenu.classList.remove("submenu-open");
        }
      }

      // Abre/Fecha com Click (e navega)
      link.addEventListener("click", (e) => {
        // Apenas verificamos se estamos no desktop para abrir o submenu.
        const isDesktop = window.matchMedia("(min-width: 480px)").matches;
        if (isDesktop) {
          toggleDropdown(); // Abre ou fecha o submenu
        }
      });

      // Abre com Enter ou Espaço
      link.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          // Enter: DEVE navegar (comportamento padrão).
          // Apenas garantimos que o menu *abra* para ver os sub-itens.
          toggleDropdown(true);
        }

        if (e.key === " ") {
          // Espaço: NÃO DEVE navegar e NÃO DEVE rolar a página.
          // DEVE apenas abrir/fechar o submenu.
          e.preventDefault();
          toggleDropdown();
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
