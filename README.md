# Prompt Maker STI

Aplicação web local para montar prompts de testes de mesa de um sistema de feedback pedagógico com IA.

---

## Pré-requisitos

- Node.js 18+
- npm

---

## Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar dev server
npm run dev
# → http://localhost:5173
```

---

## Funcionalidades

### Novo teste (aba principal)

1. **Seleção da questão** — escolha entre 6 questões (3 corretas, 3 incorretas)
2. **Dados da questão** — exibe enunciado, desenvolvimento e respostas
3. **Questionário pedagógico** — muda automaticamente conforme o status (correta/incorreta)
4. **Código ao vivo** — exibe o código das respostas marcadas em tempo real (ex: `CP1A2B3D_DSP1C_PEE1A2E3B`)
5. **Edição começo/final do prompt** — preenchidos automaticamente, editáveis; botão para restaurar padrão
6. **Prompt final** — textarea editável + botão copiar
7. **Resposta da IA** — campo para colar a resposta
8. **Salvar teste** — gera ID padronizado e salva no localStorage

### Histórico

- Lista todos os testes salvos
- Ver detalhes completos de cada teste
- Copiar ID ou prompt individualmente
- Excluir registro
- Importar um teste, um array ou um objeto com a chave `tests`
- Exportar testes antigos e novos em JSON
- Preservar IDs repetidos com o sufixo `_DUPLICADO_N`

---

## Padrão de ID gerado

**Questão incorreta:**
```
nome_questao_CP1{A-D}2{A-D}3{A-D}_DSP1{A-C}2{A-C}3{A-D}_PEE1{A-E}2{A-E}3{A-C}_ROTULO
```

**Questão correta:**
```
nome_questao_CP1{A-D}2{A-D}3{A-D}_DSP1{A-C}_PEE1{A-E}2{A-E}3{A-C}_ROTULO
```

O rótulo curto (opcional, máx. 25 chars) é normalizado: sem acentos, sem caracteres especiais, espaços → `_`, tudo maiúsculo.

Novos registros usam `schema_version: 2` e `questionario_version: "2026-06-novo-questionario"`. Registros sem versão são tratados como schema 1 e continuam disponíveis no histórico.

---

## Build para produção

```bash
npm run build
# arquivos em dist/
```
