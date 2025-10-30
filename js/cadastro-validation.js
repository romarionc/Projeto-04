// validar o formulario do cadastro
// let _cadastroInitialized = false; - estava travando apos um clique

function setupCadastroValidation() {
  // if (_cadastroInitialized) return; - estava travando apos um clique
  // _cadastroInitialized = true; - estava travando apos um clique

  const form = document.getElementById("volunteer-form");
  if (!form) return;

  const allFields = form.querySelectorAll("input, select");

  /**
   * Atualiza o estado aria-invalid do campo com base na validação,
   * mas apenas se o formulário já foi submetido (tem 'was-validated')
   */
  function updateFieldValidity(field) {
    if (form.classList.contains("was-validated")) {
      if (field.checkValidity()) {
        field.setAttribute("aria-invalid", "false");
      } else {
        field.setAttribute("aria-invalid", "true");
      }
    }
  }

  /**
   * Limpa todos os estados de validação ARIA e a classe do formulário
   */
  function clearAllValidity() {
    allFields.forEach((field) => {
      field.removeAttribute("aria-invalid");
    });
    form.classList.remove("was-validated");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio real do formulário
    form.classList.add("was-validated");

    // Atualiza o ARIA de todos os campos no momento da submissão
    allFields.forEach(updateFieldValidity);

    if (!form.checkValidity()) {
      window.showToast?.(
        "Campos Incompletos",
        "Por favor, preencha todos os campos obrigatórios corretamente.",
        "warning"
      );

      // Foca no primeiro campo inválido
      const firstInvalidField = form.querySelector("[aria-invalid='true']");
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
        clearAllValidity(); // Limpa os estados de validação
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

  // Validação em tempo real após a primeira tentativa de envio
  allFields.forEach((element) => {
    element.addEventListener("input", () => {
      updateFieldValidity(element);
    });
  });
}

// Exporta a função de init para o spa-router
export function initCadastroValidation() {
  setupCadastroValidation();
}
