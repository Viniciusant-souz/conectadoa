import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "./db.js";

const router = Router();

// Rota de Login
router.post("/login", async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ erro: "Informe e-mail e senha" });

    try {
        const [linhas] = await db.execute("SELECT * FROM usuario WHERE email = ?", [email]);
        const usuario = linhas[0];

        if (!usuario || !(await bcrypt.compare(senha, usuario.senha_hash))) {
            return res.status(401).json({ erro: "E-mail ou senha inválidos" });
        }

        const token = jwt.sign(
            { id: usuario.id_usuario, nome: usuario.nome },
            process.env.JWT_SECRET,
            { expiresIn: "8h" }
        );

        res.json({ token, usuario: { nome: usuario.nome, email: usuario.email } });
    } catch (erro) {
        res.status(500).json({ erro: "Erro no servidor" });
    }
});

// Middleware de proteção
export function autenticar(req, res, next) {
    const [tipo, token] = (req.headers.authorization || "").split(" ");
    if (tipo !== "Bearer" || !token) {
        return res.status(401).json({ erro: "Token ausente" });
    }
    try {
        req.usuario = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        res.status(401).json({ erro: "Token inválido ou expirado" });
    }
}

export default router;