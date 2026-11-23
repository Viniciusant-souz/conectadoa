const CHAVE_TOKEN = "conectadoa_token";
const CHAVE_NOME = "conectadoa_usuario";

export function lerToken() {
    return localStorage.getItem(CHAVE_TOKEN);
}

export function lerNomeUsuario() {
    return localStorage.getItem(CHAVE_NOME);
}

export function sair() {
    localStorage.removeItem(CHAVE_TOKEN);
    localStorage.removeItem(CHAVE_NOME);
}

// Função central que adiciona o token em TODAS as chamadas
async function requisicao(metodo, url, corpo) {
    const opcoes = { method: metodo, headers: {} };
    if (corpo) {
        opcoes.headers["Content-Type"] = "application/json";
        opcoes.body = JSON.stringify(corpo);
    }
    const token = lerToken();
    if (token) opcoes.headers.Authorization = `Bearer ${token}`;

    const resposta = await fetch(url, opcoes);
    if (resposta.status === 204) return null;

    const dados = await resposta.json();
    if (!resposta.ok) throw new Error(dados.erro || `Erro ${resposta.status}`);
    return dados;
}

export async function entrar(email, senha) {
    const dados = await requisicao("POST", "/api/auth/login", { email, senha });
    localStorage.setItem(CHAVE_TOKEN, dados.token);
    localStorage.setItem(CHAVE_NOME, dados.usuario.nome);
    return dados.usuario;
}

export const listarDoadores = () => requisicao("GET", "/api/doadores");