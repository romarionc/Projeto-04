// carrocel
// let _carouselInitialized = false; - estava travando apos o primeiro uso

function setupCarousel() {
  // if (_carouselInitialized) return; - estava travando apos um clique
  // _carouselInitialized = true; - estava travando apos um clique

  const container = document.querySelector(".carousel-container");
  const wrapper = document.querySelector(".carousel-wrapper");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const items = document.querySelectorAll(".grid-item");

  if (!container || !wrapper || !prevBtn || !nextBtn || items.length === 0) {
    console.warn("Elementos do carrossel não encontrados.");
    return;
  }

  let currentIndex = 0;
  let itemsVisible = 1;
  let itemWidth = 0; // Vamos armazenar a largura do item
  let maxIndex = 0; // O índice máximo que podemos deslizar

  function calculateLayout() {
    const containerWidth = container.offsetWidth;

    // Pega a largura do primeiro item (assume que todos são iguais)
    //  getBoundingClientRect para mais precisão (inclui padding/border)

    if (items[0]) {
      itemWidth = items[0].offsetWidth;
    } else {
      itemWidth = 1;
    }

    // Usa Math.floor para ser conservador
    itemsVisible = Math.max(1, Math.floor(containerWidth / itemWidth));

    // Calcula o índice máximo permitido
    // Se temos 12 itens e 5 visíveis, o maxIndex é 7 (12 - 5)
    maxIndex = items.length - itemsVisible;

    // Garante que o índice atual não seja inválido após redimensionar
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }
    // Garante que não tenha um maxIndex negativo se couberem todos
    if (maxIndex < 0) {
      maxIndex = 0;
    }

    updateCarousel();
  }

  function updateCarousel() {
    // Muda a lógica: move em pixels (itemWidth) em vez de %
    // Isso garante que desliza exatamente um item
    const offsetPx = currentIndex * -itemWidth;
    wrapper.style.transform = `translateX(${offsetPx}px)`;
  }

  function showNext() {
    currentIndex++;
    // Se passar do máximo, volta ao início, tava bugando
    if (currentIndex > maxIndex) {
      currentIndex = 0;
    }
    updateCarousel();
  }

  function showPrev() {
    currentIndex--;
    // Se for menor que 0, vai para o fim
    if (currentIndex < 0) {
      currentIndex = maxIndex;
    }
    updateCarousel();
  }

  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);

  // Adiciona navegação pelas setas do teclado
  // Isso funciona porque adicionamos tabindex="0" ao .carousel-container no template
  container.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault(); // Impede o scroll da página
      showPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault(); // Impede o scroll da página
      showNext();
    }
  });

  window.addEventListener("resize", calculateLayout);
  calculateLayout(); // Cálculo inicial
}

export function initCarousel() {
  setupCarousel();
}
