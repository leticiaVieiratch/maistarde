# Documentação e Guia de Testes da Coleção Postman

> **Disciplina:** Frameworks Front-End  
> **Professor:** Me. Deivison S. Takatu  
> **Instituição:** SENAI  
> **Referência:** Aula 05 — Criando APIs para o Front-End (Slide 29)  
> **Arquivo da Coleção:** `DevPulse_Notes_API.postman_collection.json`

---

## 1. Visão Geral da Coleção

O Postman é a ferramenta padrão de mercado para especificação, desenvolvimento, depuração e testes automatizados de APIs RESTful.

Para a atividade prática da **Aula 05**, foi construída uma coleção de testes rigorosa no padrão **Postman Collection v2.1.0** cobrindo todos os fluxos da API **DevPulse Notes**, integrando:
1. **Variáveis de Coleção Dinâmicas:** Centralização da URL base (`{{baseUrl}}`) e encadeamento de requisições armazenando o ID criado (`{{notaIdCriada}}`).
2. **Test Scripts Automatizados (Chai / Postman BDD):** Cada uma das requisições possui asserções em JavaScript (`pm.test`) que validam o código de status HTTP, tempo de resposta e integridade do payload retornado.
3. **Fluxo Completo de Ciclo de Vida (CRUD E2E):** Teste encadeado de ponta a ponta (Criação ➔ Leitura ➔ Edição ➔ Deleção ➔ Verificação de 404).

---

## 2. Como Importar e Configurar no Postman

### Passo 1: Importar o Arquivo JSON
1. Abra o **Postman** (aplicativo Desktop ou versão Web);
2. No canto superior esquerdo da barra lateral, clique no botão **Import**;
3. Arraste ou selecione o arquivo:
   `06-Criando-e-Consumindo-APIs/atividade-03-postman-collection/DevPulse_Notes_API.postman_collection.json`;
4. A coleção **"DevPulse Notes API - SENAI"** aparecerá na sua lista de coleções.

### Passo 2: Configurar a Variável `baseUrl`
Por padrão, a variável já vem configurada para `http://localhost:3001`.
* Caso você execute a API em outra porta (ex: `3000` ou `8080`), clique com o botão direito na coleção ➔ **Edit** ➔ aba **Variables** ➔ altere o campo *Current Value* de `baseUrl`.

---

## 3. Catálogo Detalhado das 11 Requisições e Test Scripts

A coleção é organizada didaticamente em **5 pastas temáticas**:

```
DevPulse Notes API - SENAI/
├── 📁 01. Informações e Health Check
│   ├── 🔹 GET / (Apresentação e Rotas)
│   └── 🔹 GET /api/health (Métricas e Uptime)
├── 📁 02. Leitura de Notas (GET)
│   ├── 🔹 GET /api/notes (Listar Todas)
│   ├── 🔹 GET /api/notes?busca=cors (Filtro por Palavra-Chave)
│   ├── 🔹 GET /api/notes?categoria=Prática (Filtro por Categoria)
│   ├── 🔹 GET /api/notes/:id (Buscar por ID Existente)
│   └── 🔸 GET /api/notes/:id (ID Inexistente - Erro 404)
├── 📁 03. Criação de Notas (POST)
│   ├── 🔹 POST /api/notes (Criar com Sucesso - 201)
│   └── 🔸 POST /api/notes (Validação de Erro - 400 Bad Request)
├── 📁 04. Atualização de Notas (PUT)
│   └── 🔹 PUT /api/notes/:id (Atualizar Nota Criada)
└── 📁 05. Exclusão de Notas (DELETE)
    ├── 🔹 DELETE /api/notes/:id (Excluir Nota Criada)
    └── 🔸 GET /api/notes/:id (Validar Exclusão - 404)
```

---

### Detalhamento das Validações Automatizadas por Requisição:

#### 1. `GET / (Apresentação e Rotas)`
* **Objetivo:** Garantir que o servidor está rodando e devolvendo a documentação de rotas.
* **Script de Teste:**
```javascript
pm.test("Status code é 200 OK", function () {
    pm.response.to.have.status(200);
});
pm.test("Retorna status ONLINE", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.status).to.eql("ONLINE");
});
```

#### 2. `GET /api/health`
* **Objetivo:** Verificar a integridade do serviço, uso de memória e total de notas gravadas.
* **Script de Teste:**
```javascript
pm.test("Status code é 200 OK", function () {
    pm.response.to.have.status(200);
});
pm.test("Serviço está UP", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.status).to.eql("UP");
});
```

#### 3. `GET /api/notes` (Listar Todas)
* **Objetivo:** Validar o contrato de resposta de listagem.
* **Script de Teste:**
```javascript
pm.test("Status code é 200 OK", function () {
    pm.response.to.have.status(200);
});
pm.test("Payload contém array de notas", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.sucesso).to.be.true;
    pm.expect(jsonData.dados).to.be.an("array");
});
```

#### 4. `POST /api/notes (Criar com Sucesso - 201)`
* **Objetivo:** Inserir uma nota e **salvar o ID gerado** para as etapas seguintes de teste.
* **Script de Teste com Encadeamento de Variável:**
```javascript
pm.test("Status code é 201 Created", function () {
    pm.response.to.have.status(201);
});
var jsonData = pm.response.json();
pm.test("Nota foi criada e retornou ID", function () {
    pm.expect(jsonData.sucesso).to.be.true;
    pm.expect(jsonData.dados.id).to.not.be.empty;
});

// Encadeamento inteligente: salva o ID da nova nota para uso nas requisições PUT e DELETE
if (jsonData.dados && jsonData.dados.id) {
    pm.collectionVariables.set("notaIdCriada", jsonData.dados.id);
}
```

#### 5. `POST /api/notes (Validação de Erro - 400 Bad Request)`
* **Objetivo:** Garantir que o servidor rejeite requisições com dados inconsistentes.
* **Script de Teste:**
```javascript
pm.test("Status code é 400 Bad Request", function () {
    pm.response.to.have.status(400);
});
pm.test("Retorna mensagem de validação", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.sucesso).to.be.false;
    pm.expect(jsonData.erro).to.include("obrigatório");
});
```

#### 6. `PUT /api/notes/:id`
* **Objetivo:** Atualizar a nota identificada pela variável `{{notaIdCriada}}`.
* **Script de Teste:**
```javascript
pm.test("Status code é 200 OK", function () {
    pm.response.to.have.status(200);
});
pm.test("Título foi atualizado com sucesso", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.dados.titulo).to.eql("Entendendo Middlewares no Express (Revisado)");
});
```

#### 7. `DELETE /api/notes/:id` e `GET (Confirmação 404)`
* **Objetivo:** Excluir o recurso e provar que ele não existe mais no disco.
* **Scripts de Teste:**
```javascript
// No DELETE:
pm.test("Status code é 200 OK", function () {
    pm.response.to.have.status(200);
});

// No GET subsequente:
pm.test("Status code é 404 Not Found após deleção", function () {
    pm.response.to.have.status(404);
});
```

---

## 4. Execução Automatizada em Lote (Collection Runner)

Para rodar todos os testes de uma só vez:
1. No Postman, passe o mouse sobre a coleção **DevPulse Notes API - SENAI** e clique nos três pontinhos (`...`);
2. Selecione **Run collection**;
3. Verifique se as 11 requisições estão marcadas;
4. Clique no botão azul **Run DevPulse Notes API - SENAI**;
5. Todas as asserções passarão em verde (**All Passed**).

### Execução via Linha de Comando com Newman (Opcional):
Se você tiver o Newman instalado globalmente (`npm install -g newman`), pode rodar no terminal:
```bash
newman run DevPulse_Notes_API.postman_collection.json --env-var "baseUrl=http://localhost:3001"
```
