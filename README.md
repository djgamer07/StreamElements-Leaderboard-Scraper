# StreamElements Leaderboard Scraper

This repository contains a Node.js script designed to scrape leaderboard data from a StreamElements channel using Puppeteer. The script extracts information such as usernames and their points from the leaderboard and saves the data into a JSON file for further analysis.

## Features
- Extracts leaderboard data from a specified StreamElements channel.
- Handles pagination to collect data across multiple pages.
- Saves the data incrementally to avoid data loss.

## Requirements
- Node.js (>= 14.x)
- Dependencies: Puppeteer, Axios, Cheerio, FS

## Installation

### Automatic Installation
1. Clone this repository: `git clone https://github.com/djgamer07/streamelements-leaderboard-scraper.git && cd streamelements-leaderboard-scraper`
2. Install dependencies: `npm install`

### Manual Installation
1. Create a new directory and navigate to it: `mkdir streamelements-leaderboard-scraper && cd streamelements-leaderboard-scraper`
2. Initialize a new Node.js project: `npm init -y`
3. Install the required dependencies: `npm install puppeteer axios cheerio fs`
4. Create a file named `index.js` and paste the script content into it.
5. Create a `package.json` file if needed, and add the following content: `{"dependencies": {"puppeteer": "^23.10.3","axios": "^1.7.9","cheerio": "^1.0.0","fs": "^0.0.1-security"}}`

## Usage
1. Open the script file (`index.js`) and update the `url` variable with your StreamElements channel's leaderboard URL.
2. Run the script: `node index.js`
3. The extracted leaderboard data will be saved as `leaderboard.json` in the root directory.

## Notes
- **Rename the generated `leaderboard.json` file to `usernames.json`. After that, you can use [Twitch-User-Points-Updater](https://github.com/djgamer07/Twitch-User-Points-Updater) to insert the Twitch ID, username, and points into your SQL database.**
- Ensure the `tabSelector` and other DOM selectors match the structure of your StreamElements leaderboard page.
- You may need to update the `aria-label` value for the pagination buttons if the structure changes.

---

# Scraper de Leaderboard do StreamElements

Este repositório contém um script Node.js projetado para capturar dados do leaderboard de um canal do StreamElements utilizando o Puppeteer. O script extrai informações como nomes de usuários e pontos, salvando os dados em um arquivo JSON para análise posterior.

## Funcionalidades
- Extrai dados do leaderboard de um canal especificado no StreamElements.
- Lida com paginação para coletar dados de várias páginas.
- Salva os dados incrementalmente para evitar perdas.

## Requisitos
- Node.js (>= 14.x)
- Dependências: Puppeteer, Axios, Cheerio, FS

## Instalação

### Instalação Automática
1. Clone este repositório: `git clone https://github.com/djgamer07/streamelements-leaderboard-scraper.git && cd streamelements-leaderboard-scraper`
2. Instale as dependências: `npm install`

### Instalação Manual
1. Crie um novo diretório e navegue até ele: `mkdir streamelements-leaderboard-scraper && cd streamelements-leaderboard-scraper`
2. Inicie um novo projeto Node.js: `npm init -y`
3. Instale as dependências necessárias: `npm install puppeteer axios cheerio fs`
4. Crie um arquivo chamado `index.js` e cole o conteúdo do script nele.
5. Crie um arquivo `package.json` se necessário, e adicione o seguinte conteúdo: `{"dependencies": {"puppeteer": "^23.10.3","axios": "^1.7.9","cheerio": "^1.0.0","fs": "^0.0.1-security"}}`

## Uso
1. Abra o arquivo do script (`index.js`) e atualize a variável `url` com o URL do leaderboard do seu canal do StreamElements.
2. Execute o script: `node index.js`
3. Os dados extraídos do leaderboard serão salvos no arquivo `leaderboard.json` no diretório raiz.

## Notas
- **Altere o nome do ficheiro gerado `leaderboard.json` para `usernames.json`. Depois disso, pode usar o [Twitch-User-Points-Updater](https://github.com/djgamer07/Twitch-User-Points-Updater) para inserir o Twitch ID, nome de utilizador e os pontos na sua base de dados SQL.**
- Certifique-se de que o `tabSelector` e outros seletores DOM correspondem à estrutura da página do leaderboard do StreamElements.
- Pode ser necessário atualizar o valor de `aria-label` dos botões de paginação caso a estrutura da página mude.
