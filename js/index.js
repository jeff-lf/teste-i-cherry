document.addEventListener("DOMContentLoaded", function () {
    
    console.log(questoes[0].titulo);

  const container = document.getElementById("app");

  questoes.forEach((questao, index) => {
    const bloco = document.createElement("div");
    bloco.style.marginBottom = "2rem";
    bloco.className = "card"
    bloco.style = `
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #f9f9f9;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      margin: 20px;
      font-family: Montserrat, sans-serif;
      font-size: 1.1rem;
    `;

    bloco.innerHTML = `
      <h2 style="font-family: Montserrat, sans-serif; font-size: 2rem;">${questao.titulo}</h2>
      <p style="font-family: Montserrat, sans-serif; font-size: 1.1rem;"><strong>Pergunta:</strong></p>
      <p style="font-family: Montserrat, sans-serif; font-size: 1.1rem;">${questao.pergunta.replace(/\n/g, "<br>")}</p>

      <p style="font-family: Montserrat, sans-serif; font-size: 1rem;"><strong>Observação:</strong> ${questao.observacao}</p>

      <label for="select-${index}" style="font-family: Montserrat, sans-serif; font-size: 1rem;"><strong>Alternativas:</strong></label><br />
      <select id="select-${index}" style="margin-bottom: 1rem; font-family: Montserrat, sans-serif; font-size: 1rem; margin: 20px;">
      ${questao.alternativas
        .map((alt, i) => `<option value="${i}">${alt.texto}</option>`)
        .join("")}
      </select>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1rem;">
      <div style="flex: 1; min-width: 300px;">
        <div style="width: 60%; display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <h3 style="margin: 0; font-family: Montserrat, sans-serif; font-size: 1.2rem;">📥 Entrada</h3>
        <button id="run-${index}" class="run-button" style="margin: 0; font-family: Montserrat, sans-serif; font-size: 1rem;">RUN</button>
        </div>
        <div style="width: 60%; position: relative; margin-bottom: 1rem;">
        <textarea id="input-${index}" rows="6" style="width: 100%; font-family: Montserrat, monospace, sans-serif; font-size: 1.1rem; box-sizing: border-box;"></textarea>
        </div>

        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <!-- Código base -->
        <div style="flex: 1; min-width: 300px;">
          <h3 style="font-family: Montserrat, sans-serif; font-size: 1.1rem;">📄 Código base</h3>
          <pre id="codebase-${index}" style="background-color: #1e1e1e; color: #ccc; padding: 1rem; border-radius: 5px; font-family: Montserrat, monospace, sans-serif; font-size: 1.05rem;">
  <code class="language-javascript">${Prism.highlight(
      questao.alternativas[0].codigo,
      Prism.languages.javascript,
      "javascript"
    )}</code></pre>
        </div>

        <!-- Resultado -->
        <div style="flex: 1; min-width: 300px;">
          <h3 style="font-family: Montserrat, sans-serif; font-size: 1.1rem;">💡 Resultado</h3>
          <pre id="output-${index}" style="background-color:#1e1e1e; color: #ccc; padding: 1rem; border-radius: 5px; min-height: 100px; font-family: Montserrat, monospace, sans-serif; font-size: 1.05rem; width: 100%; box-sizing: border-box;"></pre>
        </div>
        </div>
      </div>
      </div>
    `;

    container.appendChild(bloco);

    const select = document.getElementById(`select-${index}`);
    const textarea = document.getElementById(`input-${index}`);
    const codeBase = document.getElementById(`codebase-${index}`);

    // Inicializa o código base com a primeira alternativa
    codeBase.innerHTML = Prism.highlight(
      questao.alternativas[0].codigo,
      Prism.languages.javascript,
      "javascript"
    );

    // Atualiza o código base ao mudar a alternativa
    select.addEventListener("change", () => {
      const selected = parseInt(select.value, 10);
      const highlightedCode = Prism.highlight(
        questao.alternativas[selected].codigo,
        Prism.languages.javascript,
        "javascript"
      );
      codeBase.innerHTML = highlightedCode;
    });

// Lógica do botão RUN
document.getElementById(`run-${index}`).addEventListener("click", async () => {
    const selected = parseInt(select.value, 10);
    const baseCode = questao.alternativas[selected].codigo;
    const userInput = textarea.value;
    const output = document.getElementById(`output-${index}`);
    
    // Limpa o output antes de cada execução
    output.textContent = "";
    
    const originalConsoleLog = console.log;
    let logs = [];
    
    console.log = function (...args) {
        const message = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ');
        
        logs.push(message);
        originalConsoleLog.apply(console, args);
    };

    try {
        logs = [];
        
        // 1. Avalia as declarações (código base)
        eval(baseCode);
        
        // 2. Avalia o input do usuário
        if (userInput.trim()) {
            // Caso assíncrono
            if (userInput.includes('buscarDados(')) {
                const result = await eval(userInput);
                if (result !== undefined) {
                    logs.push(JSON.stringify(result, null, 2));
                }
            } 
            // Caso de funções normais
            else {
                const userResult = eval(userInput);
                
                // Se for função (como criarContador), não executa automaticamente
                if (typeof userResult === 'function' && !userInput.includes('(')) {
                    if (logs.length === 0) {
                        logs.push("Função criada. Chame-a no formato: minhaFuncao()");
                    }
                }
            }
        }
        
        output.textContent = logs.join("\n");
        
    } catch (err) {
        output.textContent = "Erro ao executar o código: " + err.message;
    } finally {
        console.log = originalConsoleLog;
    }
});
  });
});
