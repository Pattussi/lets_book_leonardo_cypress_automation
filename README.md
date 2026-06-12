# 🏨 LetsBook - Cypress Automation & Auditoria de Qualidade

Suíte de testes automatizados E2E desenvolvida com **Cypress** utilizando o padrão **Page Objects (POM)** para a aplicação **LetsBook**.

O projeto foi desenhado sob a estratégia de **Testes de Caracterização de Bugs**, servindo como documentação viva que mapeia, reproduz e valida o comportamento das falhas críticas de negócio, cálculos financeiros e instabilidades de front-end presentes na SPA.

---

## 📌 Funcionalidades e Bugs Testados (Rastreabilidade)

As suítes foram estruturadas com base nos dois módulos principais da aplicação (Portal Público e Painel CRM) e organizadas de forma linear e crescente para garantir rastreabilidade total com a planilha de reportes.

### 🌐 Módulo: Portal de Reservas (`portal-reservas.cy.js`)

#### Cenários de Sucesso (`@sucesso`)

* Fluxo feliz de preenchimento do formulário com dados válidos e confirmação com toast de sucesso.

#### Componentes Dinâmicos (`@interface`)

* Atualização dinâmica e síncrona do tipo de quarto no rodapé da página ao alterar a seleção.

#### Auditoria de Validações Legadas (`@bugs`)

* **BUG-001**: O sistema não barra o envio e não exibe erro ao aplicar um cupom inválido.
* **BUG-002**: O sistema permite realizar uma reserva com data de check-out anterior ao check-in.
* **BUG-003**: O sistema gera um valor total negativo no resumo ao inserir data de check-out retroativa.
* **BUG-004**: O sistema aceita e permite realizar reservas com datas de check-in retroativas (no passado).
* **BUG-005**: O sistema permite concluir reservas utilizando formatos de e-mail inválidos.
* **BUG-006**: O sistema aceita quantidades de hóspedes iguais a zero ou negativas.
* **BUG-007**: O campo de nome aceita entradas contendo puramente números e caracteres especiais.
* **BUG-008**: O sistema permite aplicar e acumular o mesmo cupom de desconto múltiplas vezes.
* **BUG-009**: O sistema permite criar reservas com 0 noites (Check-in e Check-out na mesma data).
* **BUG-010**: O motor de cálculo ignora a variação da quantidade de hóspedes, mantendo o valor estático.
* **BUG-011**: O sistema calcula o valor total incorreto para a Suíte Presidencial (R$ 450 em vez de R$ 1200).
* **BUG-012**:  O sistema falha no cálculo do cupom VIP20 (Aplica 90% em vez de 20% de desconto, gerando R$ 25.00)
---

### 📊 Módulo: Painel CRM (`painel-crm.cy.js`)

#### Validações Positivas (`@sucesso`)

* Pesquisa funcional por nome de hóspede existente na barra de busca.
* Alteração e persistência do estado lógico para o status **Pendente** no dropdown.

#### Auditoria de Comportamento Incorreto (`@bugs`)

* **BUG-013**: O sistema renderiza e exibe linhas com dados inconsistentes ou zerados (`0`) no painel.
* **BUG-014**: O badge de status altera seu valor lógico para **Cancelado**, mas falha ao não atualizar sua cor de fundo para o padrão visual esperado.
* **BUG-015**: A barra de busca oculta os dados quando não há resultados, mas falha ao não exibir uma mensagem amigável de feedback ("Nenhum registro encontrado").
* **BUG-016**: A tabela do CRM quebra a estrutura visual das colunas e omite dados por falta de scroll horizontal em viewports mobile (<768px).

---

### 🔄 US-002 - Fluxo de Integração de Compra Ponta a Ponta (`fluxo-reserva-completo.cy.js`)

#### Cenário de Integração (`@e2e`)

Simulação contínua da jornada do usuário:

1. Efetua uma reserva completa e válida através do Portal Público de Reservas.
2. Navega até o Painel CRM Administrativo.
3. Utiliza a barra de pesquisas.
4. Valida que o registro foi computado e listado com sucesso na tabela do hotel.

---

## 🤖 Relatório de Uso de IA

Em conformidade com os requisitos da avaliação, a Inteligência Artificial foi integrada ao fluxo de engenharia de QA de forma assistida e supervisionada.

### 1. Engenharia de Resiliência Front-End

Apoio no diagnóstico do erro crítico de runtime da aplicação (`Minified React error #418` / Erro de Hidratação).

A partir disso foram construídas estratégias de bypass via:

```javascript
Cypress.on('uncaught:exception', () => false)
```

evitando falsos negativos na execução.

### 2. Mitigação de Detached DOM

Refatoração dos comandos assíncronos da barra de busca do CRM.

O comando foi desacoplado:

```javascript
cy.get('input').clear()
cy.get('input').type('Leonardo')
```

permitindo ao Cypress reconsultar o elemento após re-renderizações do React.

### 3. Mapeamento de Regras de Negócio

Utilizada para:

* Partições de equivalência
* Análise de valores limite
* Cobertura de regras de cupons
* Cobertura de datas e cálculo financeiro

---

## 🧰 Tecnologias Utilizadas

* Node.js v20+
* Cypress v15+
* @cypress/grep
* Mochawesome
* GitHub Actions
* JavaScript (ES6)

---

## 🚀 Como Executar os Testes Localmente

### Instalar dependências

```bash
npm install
```

### Executar toda a suíte

```bash
npm run test:all
```

### Executar apenas cenários de sucesso

```bash
npm run test:sucesso
```

### Executar apenas auditoria de bugs

```bash
npm run test:bugs
```

### Executar apenas testes de interface

```bash
npm run test:interface
```

### Executar apenas fluxo E2E

```bash
npm run test:e2e
```

### Executar tudo + gerar relatório

```bash
npm run test:full
```

---

## 📊 Relatórios de Teste

Após a execução:

```bash
npm run test:full
```

será gerado o relatório HTML consolidado em:

```text
reports/html/mochawesome.html
```

---

## ⚙️ Integração CI/CD (GitHub Actions)

O workflow automatiza:

1. Instalação das dependências.
2. Execução dos testes Cypress em modo headless.
3. Consolidação dos resultados.
4. Geração do relatório Mochawesome.
5. Upload dos artefatos da execução.

Arquivo:

```text
.github/workflows/cypress.yml
```

---

## 📂 Estrutura de Pastas

```text
letsbook-cypress-automation/
│
├── .github/
│   └── workflows/
│       └── cypress.yml
│
├── cypress/
│   ├── e2e/
│   │   ├── fluxo-reserva-completo.cy.js
│   │   ├── painel-crm.cy.js
│   │   └── portal-reservas.cy.js
│   │
│   ├── fixtures/
│   │   └── example.json
│   │
│   ├── pages/
│   │   └── BookingPage.js
│   │
│   └── support/
│       └── e2e.js
│
├── reports/
│   └── html/
│       └── mochawesome.html
│
├── scripts/
│   ├── generate-report.js
│   └── open-report.js
│
├── cypress.config.js
├── package.json
└── README.md
```

---

## ✨ Sobre o Autor

**Leonardo Gallardo**

Profissional em transição para a área de Qualidade de Software (QA), com foco em testes manuais, automação de testes, análise de defeitos, validação de regras de negócio e melhoria contínua da qualidade de produtos digitais.

📫 Contato: [pattussi@hotmail.com](mailto:pattussi@hotmail.com)  
🔗 [LinkedIn](https://linkedin.com/in/leonardo-pattussi)
