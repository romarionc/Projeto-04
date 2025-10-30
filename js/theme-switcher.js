/* Gerencia a troca de tema (Claro, Escuro, Alto Contraste)
  e salva a preferência no localStorage.
*/
document.addEventListener("DOMContentLoaded", () => {
  const themeSwitcher = document.querySelector(".theme-switcher");
  if (!themeSwitcher) return;

  const themeButtons = themeSwitcher.querySelectorAll(".theme-btn");
  const body = document.body;
  const storageKey = "theme-preference";

  /**
   * Aplica o tema ao <body>, atualiza os botões ARIA e salva no localStorage
   * @param {string} theme - O nome do tema (ex: "light", "dark")
   */
  function applyTheme(theme) {
    // 1. Aplica o tema ao body
    body.dataset.theme = theme;

    // 2. Atualiza o estado ARIA dos botões (para leitores de tela)
    themeButtons.forEach((btn) => {
      const btnTheme = btn.dataset.themeBtn;
      if (btnTheme === theme) {
        btn.setAttribute("aria-checked", "true");
      } else {
        btn.setAttribute("aria-checked", "false");
      }
    });

    // 3. Salva a preferência
    localStorage.setItem(storageKey, theme);
  }

  // Adiciona o listener de clique ao grupo de botões
  themeSwitcher.addEventListener("click", (e) => {
    const clickedButton = e.target.closest("[data-theme-btn]");
    if (!clickedButton) return;

    const theme = clickedButton.dataset.themeBtn;
    applyTheme(theme);
  });

  // --- Carregamento Inicial ---
  const savedTheme = localStorage.getItem(storageKey);

  if (savedTheme) {
    // 1. Aplica o tema salvo
    applyTheme(savedTheme);
  } else {
    // 2. Se não houver tema salvo, tenta detectar a preferência do sistema
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (systemPrefersDark) {
      applyTheme("dark");
    } else {
      applyTheme("light"); // Padrão
    }
  }

  // Opcional: Ouve mudanças no sistema operacional
  // (só muda se o usuário não tiver uma preferência salva)
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem(storageKey)) {
        if (e.matches) {
          applyTheme("dark");
        } else {
          applyTheme("light");
        }
      }
    });
});
