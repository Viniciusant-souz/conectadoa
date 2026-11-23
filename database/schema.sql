-- ONG Patinhas Unidas · schema.sql
SET NAMES utf8mb4;
DROP DATABASE IF EXISTS patinhas_unidas;
CREATE DATABASE patinhas_unidas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE patinhas_unidas;

-- 1. Tabela de Adotantes (Quem adota os animais)
CREATE TABLE adotante (
                          id_adotante INT AUTO_INCREMENT PRIMARY KEY,
                          nome VARCHAR(150) NOT NULL,
                          email VARCHAR(100) UNIQUE NOT NULL,
                          telefone VARCHAR(20) NOT NULL,
                          cidade VARCHAR(100) NOT NULL,
                          data_cadastro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabela de Animais (Os pets disponíveis para adoção)
CREATE TABLE animal (
                        id_animal INT AUTO_INCREMENT PRIMARY KEY,
                        nome VARCHAR(100) NOT NULL,
                        especie VARCHAR(50) NOT NULL,
                        raca VARCHAR(50),
                        idade_aproximada VARCHAR(30),
                        status_adocao VARCHAR(30) NOT NULL DEFAULT 'Disponível' CHECK (status_adocao IN ('Disponível', 'Em Processo', 'Adotado')),
                        data_resgate DATE NOT NULL
);

-- 3. Tabela de Voluntários (Quem ajuda a ONG)
CREATE TABLE voluntario (
                            id_voluntario INT AUTO_INCREMENT PRIMARY KEY,
                            nome VARCHAR(150) NOT NULL,
                            email VARCHAR(100) UNIQUE NOT NULL,
                            funcao VARCHAR(100) NOT NULL,
                            data_entrada DATE NOT NULL
);

-- 4. Tabela de Eventos (Feiras de adoção, campanhas de arrecadação, etc.)
CREATE TABLE evento (
                        id_evento INT AUTO_INCREMENT PRIMARY KEY,
                        nome VARCHAR(150) NOT NULL,
                        data_evento DATETIME NOT NULL,
                        local_evento VARCHAR(200) NOT NULL,
                        descricao TEXT
);

-- 5. Tabela de Adoções (Relaciona um animal a um adotante)
CREATE TABLE adocao (
                        id_adocao INT AUTO_INCREMENT PRIMARY KEY,
                        id_animal INT NOT NULL,
                        id_adotante INT NOT NULL,
                        data_adocao DATE NOT NULL,
                        termo_assinado BOOLEAN NOT NULL DEFAULT FALSE,
                        FOREIGN KEY (id_animal) REFERENCES animal (id_animal) ON DELETE CASCADE,
                        FOREIGN KEY (id_adotante) REFERENCES adotante (id_adotante) ON DELETE CASCADE
);

-- 6. Tabela Associativa: Voluntario_Evento (Relacionamento N:N - Muitos para Muitos)
-- Um voluntário pode participar de vários eventos, e um evento tem vários voluntários.
CREATE TABLE voluntario_evento (
                                   id_voluntario INT NOT NULL,
                                   id_evento INT NOT NULL,
                                   funcao_no_evento VARCHAR(100) NOT NULL,
                                   PRIMARY KEY (id_voluntario, id_evento),
                                   FOREIGN KEY (id_voluntario) REFERENCES voluntario (id_voluntario) ON DELETE CASCADE,
                                   FOREIGN KEY (id_evento) REFERENCES evento (id_evento) ON DELETE CASCADE
);

CREATE TABLE usuario (
                         id_usuario INT AUTO_INCREMENT PRIMARY KEY,
                         nome VARCHAR(100) NOT NULL,
                         email VARCHAR(100) NOT NULL UNIQUE,
                         senha_hash CHAR(60) NOT NULL,
                         criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);