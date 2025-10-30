/* Controla os componentes globais (Toasts e Modais) */

// Armazena o elemento que abriu o modal, para devolver o foco
let elementToFocusOnClose = null;

// Listener de "Tab" para o Focus Trap do Modal
function handleModalFocus(e) {
  if (e.key !== "Tab") return;

  const modal = document.getElementById("feedback-modal");
  if (modal.hidden) return;

  // Lista de todos os elementos focáveis dentro do modal
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (e.shiftKey) {
    // Se for Shift + Tab
    // Se o foco estiver no primeiro elemento, move para o último
    if (document.activeElement === firstElement) {
      lastElement.focus();
      e.preventDefault();
    }
  } else {
    // Se for só Tab
    // Se o foco estiver no último elemento, move para o primeiro
    if (document.activeElement === lastElement) {
      firstElement.focus();
      e.preventDefault();
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const toastContainer = document.getElementById("toast-container");

  window.showToast = function (title, message, type = "info", duration = 5000) {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    // Adiciona 'role' para acessibilidade do leitor de tela
    // 'alert' (assertivo) para erros/avisos, 'status' (polido) para sucesso/info
    if (type === "danger" || type === "warning") {
      toast.setAttribute("role", "alert");
    } else {
      toast.setAttribute("role", "status");
    }

    toast.innerHTML = `<strong>${title}</strong> ${message}`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("show");
    }, 100);

    setTimeout(() => {
      toast.classList.remove("show");
      toast.addEventListener("transitionend", () => toast.remove());
    }, duration);
  };

  // --- Gerenciamento do Modal ---
  const modal = document.getElementById("feedback-modal");
  if (modal) {
    const modalOverlay = modal.querySelector(".modal-overlay");
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const firstFocusableEl = modalCloseBtn; // O botão de fechar é o primeiro

    window.openModal = function ({ title, body, onConfirm, onCancel }) {
      // Salva o elemento que está em foco ANTES de abrir o modal
      elementToFocusOnClose = document.activeElement;

      modal.querySelector("#modal-title").textContent = title;
      modal.querySelector("#modal-body").innerHTML = body;
      const confirmBtn = modal.querySelector('[data-action="confirm"]');
      const cancelBtn = modal.querySelector('[data-action="cancel"]');

      // (Sua lógica de clonar botões está correta)
      const newConfirmBtn = confirmBtn.cloneNode(true);
      const newCancelBtn = cancelBtn.cloneNode(true);
      confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
      cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);

      newConfirmBtn.onclick = () => {
        if (onConfirm) onConfirm();
        closeModal();
      };
      newCancelBtn.onclick = () => {
        if (onCancel) onCancel();
        closeModal();
      };

      modal.hidden = false;
      document.body.style.overflow = "hidden";

      // Adiciona o listener do "focus trap"
      document.addEventListener("keydown", handleModalFocus);

      // Move o foco para dentro do modal
      firstFocusableEl.focus();
    };

    window.closeModal = function () {
      modal.hidden = true;
      document.body.style.overflow = "";

      // Remove o listener do "focus trap"
      document.removeEventListener("keydown", handleModalFocus);

      // Devolve o foco para o elemento que abriu o modal
      if (elementToFocusOnClose) {
        elementToFocusOnClose.focus();
        elementToFocusOnClose = null;
      }
    };

    modalCloseBtn.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", closeModal);

    // Listener de 'Escape' para fechar o modal
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.hidden) closeModal();
    });
  }
});
