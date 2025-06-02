async function buscarDados(url) {
    try {
        const response = await fetch(url); // Faz a requisição fetch para a URL
        if (!response.ok) { // Verifica se a resposta foi bem-sucedida
            throw new Error(`Erro na requisição: ${response.status}`); // Lança um erro se a resposta não for ok
        }
        const data = await response.json(); // Converte a resposta para JSON
        return data; // Retorna os dados obtidos
    } catch (error) {
        console.error('Erro ao buscar dados:', error); // Trata erros e exibe no console
        throw error; // Re-lança o erro para que possa ser tratado por quem chamou a função
    }
}

// Exemplo de uso:
(async () => {
    try {    
        const dados = await buscarDados('https://jsonplaceholder.typicode.com/posts/1');
        console.log(dados); // Exibe os dados obtidos
    } catch (error) {
        console.error('Falha ao buscar dados:', error); // Trata o erro caso a requisição falhe  
    }
})();


