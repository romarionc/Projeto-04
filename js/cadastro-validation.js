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

      // Foca no primeiro campo inválido
      const firstInvalidField = form.querySelector(":invalid");
      if (firstInvalidField) {
        firstInvalidField.focus();
      }

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
