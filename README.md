# ⏱️ Unifoco - Central de Produtividade Acadêmica

> **Projeto Integrador de Extensão (PIE) • Semestre 2026/1** > **Curso:** Sistemas de Informação — [UniSales](https://unisales.br/) (Vitória - ES)  
> **Período:** 5º Período de Tecnologia  

O **Unifoco** é um assistente virtual automatizado integrado à plataforma Discord. O ecossistema foi projetado estrategicamente para apoiar a rotina de estudos de alunos de TI, combatendo a procrastinação e otimizando a gestão de tempo em disciplinas das modalidades híbrida, remota e semi-presencial através da aplicação prática da **Técnica Pomodoro**.

---

## 👥 Equipe de Desenvolvimento

O projeto foi idealizado, projetado e codificado pelos acadêmicos do 5º período:
* **Adryel** — [GitHub](https://github.com/)
* **Bruno Araujo** — [GitHub](https://github.com/BrunooA)
* **Rafaella** — [GitHub](https://github.com/)

---

## 🚀 Funcionalidades Principais & Governança

* **Validação Institucional:** Restringe o uso da ferramenta a estudantes formalmente matriculados, exigindo o registro com o e-mail institucional oficial (`@souunisales.com.br`).
* **Tratamento de Identidade Acadêmica:** Converte automaticamente o prefixo do e-mail em um apelido padronizado no servidor (`🎓 Nome Sobrenome`), garantindo a formalidade exigida pelo corpo docente.
* **Conformidade com a LGPD:** Visando a segurança de dados sensíveis, o bot apaga a mensagem contendo o e-mail do estudante imediatamente após o registro, mantendo os dados salvos puramente em estrutura volátil (memória RAM).
* **Interface Inteligente (UX Poluição Zero):** Evita a fadiga de interface comum em chats coletivos, deletando de forma automatizada os cards públicos de alertas de conclusão após 15 segundos de sua emissão.
* **Alerta Sonoro Coletivo:** Dispara uma notificação em tempo real marcando `@everyone`, emitindo um sinal sonoro nativo no aplicativo do Discord de todos os membros integrados na sala de estudos assim que o timer zera.

---

## 🛠️ Ferramentas & Tecnologias Utilizadas

* **Ambiente de Execução:** [Node.js](https://nodejs.org/) (Versão estável v24+)
* **Linguagem de Programação:** JavaScript (ECMAScript 6+)
* **Biblioteca Principal:** [Discord.js v14](https://discord.js.org/) (API do Discord)
* **Segurança de Credenciais:** `dotenv` (Isolamento de variáveis de ambiente locais)
* **Modelagem e Documentação:** Microsoft Loop, Miro (Diagramação UML e DER) e GitHub.

---

## 📚 Fundamentação Científica (Embasamento Teórico)

Para sustentar as regras de negócio aplicadas no software, o projeto baseia-se nos seguintes estudos da literatura acadêmica:

1.  **Engajamento e Menor Formalidade:** *Turnbull et al. (2021)* comprovam que o uso do Discord como campus virtual mitiga o distanciamento característico dos AVAs tradicionais e eleva a participação estudantil.
2.  **Mitigação da Carga Cognitiva (UX Limpa):** *Nielsen & Zhou (2024)* defendem a redução de alertas poluentes em interfaces de chatbots educacionais para mitigar a fadiga visual e manter o foco do usuário.
3.  **Gestão de Procrastinação:** *Santos & Silva (2022)* validam a eficácia da Técnica Pomodoro na preservação da saúde mental e manutenção da constância de alunos do ensino superior online.

---

## 💻 Como Executar o Projeto no VS Code

Siga o passo a passo abaixo para rodar o bot localmente na sua máquina:

### 1. Pré-requisitos
Certifique-se de ter instalado em seu computador:
* [Visual Studio Code (VS Code)](https://code.visualstudio.com/)
* [Node.js](https://nodejs.org/) 

### 2. Clonar e Acessar o Repositório
Abra o terminal do seu VS Code e execute os comandos para baixar o código:
```bash
git clone [https://github.com/BrunooA/bot_unifoco.git](https://github.com/BrunooA/bot_unifoco.git)
cd bot_unifoco
