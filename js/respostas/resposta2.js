function extrairIdDaUrl(url) {
    const params = new URL(url).searchParams;
    console.log(params.get("id"));
}

const url = "https://www.exemplo.com/produto?id=123&ref=afiliado";

function extrairIdDaUrl2(url) {
  const string = url.split("?")[1];

  const paramArray = string.split("&");

  const paramObject = {};
  paramArray.forEach((param) => {
    const [key, value] = param.split("=");
    paramObject[key] = value;
  });

  const id = paramObject["id"];

  console.log(id);
}

extrairIdDaUrl2(url); // Chama a função para extrair o ID da URL
