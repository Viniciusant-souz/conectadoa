import "./style.css";
import { lerNomeUsuario, lerToken, sair } from "./api.js";
import { telaLogin } from "./pages/login.js";

const app = document.querySelector("#app");

function mostrarApp() {
  app.innerHTML = `
        <header class="topo" style="display: flex; justify-content: space-between; padding: 1rem; background: #eee;">
            <strong>ConectaDoa</strong>
            <span class="usuario">${lerNomeUsuario()}</span>
            <button id="sair" class="secundario">Sair</button>
        </header>
        <div id="conteudo" style="padding: 2rem;">
            <h1>Bem-vindo ao PATINHAS!!</h1>
            <p>Você está logado no sistema!</p>
            <p><em>(Aqui entrarão as telas de doadores e doações nas próximas aulas)</em></p>
        </div>
    `;

  app.querySelector("#sair").onclick = () => {
    sair();
    iniciar();
  };
}

function iniciar() {
  if (lerToken()) {
    mostrarApp();
  } else {
    telaLogin(app, mostrarApp);
  }
}

iniciar();