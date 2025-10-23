Projeto ONG - Refatoração 

Requisitos:

*Manipulação do DOM Implementar sistema de Single Page Application (SPA) básico
*Criar sistema de templates JavaScript.

Para atender so requistos pedidos foi necessário os seguintes itens.

1 - Um Roteador SPA do Zero (spa-router.js):

Ele "escuta" a URL (window.location.hash) para saber qual página o usuário quer ver.

Ele busca o conteúdo (HTML, CSS e JS) daquela página dinamicamente.

Ele injeta tudo dentro do <main id="spa-content"> sem recarregar o site.

2 - Um Sistema de Templates (templates.js):

Para páginas dinâmicas (como a de "Projetos"), eu não queria deixar o HTML "chumbado" no código.

Criei um "molde" em JavaScript (templateProjetos) e separei os dados (projetos-data.js).

Quando você acessa /projetos, o roteador junta os dois e gera o HTML na hora. Para as páginas estáticas (Home/Cadastro), ele só usa fetch para buscar o HTML parcial.

3 - Carregamento Inteligente de Scripts e CSS:

O script.js (do carrossel) não é carregado na Home. Ele só é importado dinamicamente quando você entra na página /projetos.

O mesmo vale para o cadastro-validation.js e os arquivos CSS de cada página. Isso economiza recursos!

💻 O que eu usei?

HTML5 Semântico

CSS3 (Flexbox, Grid e Variáveis)

JavaScript (ES6+) - O herói da festa!

Módulos (import/export)

Fetch API (com Promises e async/await)

Template Literals (para os templates)

Manipulação avançada do DOM

Para acessar o site:

[clique_aqui](https://romarionc.github.io/Projeto_03/)

🧾 Autor

Feito por Romario Costa 👋


Vamos nos conectar!

💼 [LinkedIn](https://www.linkedin.com/in/romario-costa-345664207/) 
🌐 [GitHub](https://github.com/romarionc/)
