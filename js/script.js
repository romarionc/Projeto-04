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
  // Encontra o "locutor"
  const liveRegion = container?.querySelector("[data-carousel-live-region]");

  if (
    !container ||
    !wrapper ||
    !prevBtn ||
    !nextBtn ||
    items.length === 0 ||
    !liveRegion
  ) {
    console.warn("Elementos do carrossel ou 'live region' não encontrados.");
    return;
  }

  let currentIndex = 0;
  let itemsVisible = 1;
  let itemWidth = 0; // Vamos armazenar a largura do item
  let maxIndex = 0; // O índice máximo que podemos deslizar
  const totalItems = items.length; // Total de itens para o anúncio

  function calculateLayout() {
    const containerWidth = container.offsetWidth;

    // Pega a largura do primeiro item (assume que todos são iguais)
    if (items[0]) {
      itemWidth = items[0].offsetWidth;
    } else {
      itemWidth = 1;
    }

    // Usa Math.floor para ser conservador
    itemsVisible = Math.max(1, Math.floor(containerWidth / itemWidth));

    // Calcula o índice máximo permitido
    maxIndex = totalItems - itemsVisible;

    // Garante que o índice atual não seja inválido após redimensionar
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }
    // Garante que não tenha um maxIndex negativo se couberem todos
    if (maxIndex < 0) {
      maxIndex = 0;
    }

    updateCarousel(false); // Não anuncia na primeira carga/redimensionamento
  }

  function updateCarousel(announce = true) {
    // Muda a lógica: move em pixels (itemWidth) em vez de %
    const offsetPx = currentIndex * -itemWidth;
    wrapper.style.transform = `translateX(${offsetPx}px)`;

    // Anuncia o slide atual
    if (announce && liveRegion) {
      // Anuncia o índice visível (ex: "Slide 1 de 12")
      liveRegion.textContent = `Slide ${currentIndex + 1} de ${totalItems}`;
    }
  }

  function showNext() {
    currentIndex++;
    // Se passar do máximo, volta ao início
    if (currentIndex > maxIndex) {
      currentIndex = 0;
    }
    updateCarousel(); // Anuncia
  }

  function showPrev() {
    currentIndex--;
    // Se for menor que 0, vai para o fim
    if (currentIndex < 0) {
      currentIndex = maxIndex;
    }
    updateCarousel(); // Anuncia
  }

  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);

  // Adiciona navegação pelas setas do teclado
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
