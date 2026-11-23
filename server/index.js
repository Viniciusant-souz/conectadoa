import "dotenv/config";
import express from "express";
import auth, { autenticar } from "./auth.js";
import db from "./db.js";

const app = express();
app.use(express.json());

// Rotas públicas (não exigem token)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "ConectaDoa", hora: new Date().toISOString() });
});

// Rota de login (PÚBLICA - deve ficar antes do middleware)
app.use("/api/auth", auth);

// Middleware de autenticação (daqui para baixo, tudo exige token)
app.use("/api", autenticar);

// Rota protegida de teste
app.get("/api/doadores", (req, res) => {
  res.json({ mensagem: "Você está logado!", usuario: req.usuario.nome });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});