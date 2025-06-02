const questoes = [
  {
    titulo: "2. Manipulação de Strings e Objetos",
    pergunta: `No trackeamento de eventos, muitas vezes precisamos manipular URLs antes de enviá-las para ferramentas de análise.

                Dado o seguinte URL:
                const url = "https://www.exemplo.com/produto?id=123&ref=afiliado";

                Escreva um código JavaScript para extrair o valor do parâmetro "id" dessa URL.`,
    observacao:
      "Alternativa 1, funciona apenas em navegadores modernos, ou seja, não funciona no Internet Explorer",
    alternativas: [
      {
        texto: "Alternativa 1",
        codigo: `function extrairIdDaUrl(url) {
    const params = new URL(url).searchParams;
    console.log(params.get("id"));
}`,
      },
      {
        texto: "Alternativa 2",
        codigo: `function extrairIdDaUrl(url) {
  const string = url.split("?")[1];

  const paramArray = string.split("&");

  const paramObject = {};
  paramArray.forEach((param) => {
    const [key, value] = param.split("=");
    paramObject[key] = value;
  });

  const id = paramObject["id"];

  console.log(id);
}`,
      },
    ],
  },
  {
    titulo: "3. Funções e Closures",
    pergunta: `No trackeamento de tempo de sessão, precisamos criar contadores reutilizáveis.

                Implemente uma função chamada criarContador() que:

Retorne outra função que, ao ser chamada, incremente um contador interno e exiba o valor atualizado no console.

Exemplo de uso esperado:
const contador = criarContador();
contador(); // Deve exibir: 1
contador(); // Deve exibir: 2
contador(); // Deve exibir: 3`,
    observacao:
      "",
    alternativas: [
      {
        texto: "Alternativa 1",
        codigo: `function criarContador() {
    let contador = 0; // Inicializa o contador interno

    function incrementar() {
        contador++; // Incrementa o contador
        console.log(contador); // Exibe o valor atualizado no console
    }

    return incrementar; // Retorna a função que incrementa o contador
}`,
      },
    ],
  },
  {
    titulo: "4. Assíncrono e Promises",
    pergunta: `Em algumas situações, precisamos buscar dados externos antes de enviar eventos para ferramentas de análise.

              Implemente uma função assíncrona em JavaScript chamada buscarDados(url), que:

1. Receba uma URL como parâmetro.
2. Faça uma requisição fetch para essa URL.
3. Retorne os dados obtidos.
4. Trate erros para evitar falhas caso a requisição falhe.`,
    observacao:
      "Exemplo utilizando a ferramenta JSONPlaceholder: https://jsonplaceholder.typicode.com/posts/1",
    alternativas: [
      {
        texto: "Alternativa 1",
        codigo: `async function buscarDados(url) {
    try {
        const response = await fetch(url); 
        if (!response.ok) { 
            throw new Error('Erro na requisição: ' + response.status); 
        }
        const data = await response.json(); 
        return data; 
    } catch (error) {
        console.error('Erro ao buscar dados:', error); 
        throw error; 
    }
}`,
      },
    ],
  },
  {
    titulo: "5. Programação Funcional",
    pergunta: `Em aplicações modernas, muitas vezes lidamos com arrays de objetos e precisamos
transformá-los.
Dado o seguinte array de objetos representando produtos:
const produtos = [
{ id: 1, nome: "Camiseta", preco: 50 },
{ id: 2, nome: "Calça", preco: 120 },
{ id: 3, nome: "Tênis", preco: 250 }
];

Escreva uma função chamada formatarProdutos que:
● Retorne um novo array contendo apenas os nomes dos produtos em letras maiúsculas.
● Use a função map para fazer isso.

Saída esperada:
["CAMISETA", "CALÇA", "TÊNIS"]`,
    observacao:
      "",
    alternativas: [
      {
        texto: "Alternativa 1",
        codigo: `function formatarProdutos(produtos) {
    return produtos.map(produto => produto.nome.toUpperCase());
}`,
      },
    ],
  },
];


window.questoes = questoes;
