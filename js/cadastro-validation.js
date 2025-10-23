// validar o formulario do cadastro
// let _cadastroInitialized = false; - estava travando apos um clique

function setupCadastroValidation() {
  // if (_cadastroInitialized) return; - estava travando apos um clique
  // _cadastroInitialized = true; - estava travando apos um clique

  const form = document.getElementById("volunteer-form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio real do formulário

    form.classList.add("was-validated");

    if (!form.checkValidity()) {
      window.showToast?.(
        "Campos Incompletos",
        "Por favor, preencha todos os campos obrigatórios corretamente.",
        "warning"
      );
      return;
    }

    window.openModal?.({
      title: "Confirmar Cadastro",
      body: "<p>Obrigado pelo seu interesse! Seus dados estão prontos para serem enviados. Deseja continuar?</p>",
      onConfirm: () => {
        console.log(
          "Formulário enviado!",
          Object.fromEntries(new FormData(form))
        );
        window.showToast?.(
          "Cadastro Enviado!",
          "Recebemos seus dados. Entraremos em contato em breve. Muito obrigado!",
          "success",
          8000
        );
        form.reset();
        form.classList.remove("was-validated");
      },
      onCancel: () => {
        window.showToast?.(
          "Ação Cancelada",
          "Seu cadastro não foi enviado.",
          "info"
        );
      },
    });
  });

  form.querySelectorAll("input, select").forEach((element) => {
    element.addEventListener("input", () => {
      if (form.classList.contains("was-validated")) {
        element.checkValidity();
      }
    });
  });
}

// Exporta a função de init para o spa-router
export function initCadastroValidation() {
  setupCadastroValidation();
}

// // Exporta a função de init para o spa-router
// export function initCadastroValidation() {
//   setupCadastroValidation();
// }

// // Fallback para caso o script seja carregado fora do SPA (ex: <script src="...">)
// if (document.readyState === "loading") {
//   document.addEventListener("DOMContentLoaded", setupCadastroValidation);
// } else if (!document.getElementById("spa-content")) {
//   // Só executa o setup se NÃO estivermos em modo SPA
//   setupCadastroValidation();
// }
// conflito no carrocel
// se o script for carregado <script> normalmente antes do DOMContentLoaded
// if (document.readyState === "loading") {
//   document.addEventListener("DOMContentLoaded", setupCadastroValidation);
// } else {
//   // se o HTML já estiver pronto — não faz nada aqui
//   // chama o setup se o form existir no DOM (padrão para uso não-SPA)
//   setupCadastroValidation();
// }
