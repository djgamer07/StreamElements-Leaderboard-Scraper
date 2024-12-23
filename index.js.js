const puppeteer = require('puppeteer');
const fs = require('fs');

async function scrapeLeaderboard() {
    const url = 'https://streamelements.com/your_chanel/leaderboard';

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    console.log("Acessando a página...");
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Aguarda a aba específica ser carregada
    console.log("Aguardando carregamento da aba específica...");
    const tabSelector = '#tab-content-16'; // Alterar conforme necessário
    await page.waitForSelector(tabSelector, { timeout: 10000 }).catch((err) => {
        console.error("Aba não encontrada! Verifique os seletores.");
        browser.close();
        process.exit(1);
    });

    console.log("Aguardando carregamento da tabela dentro da aba...");
    const tableSelector = `${tabSelector} .md-row`; // Restrição à aba
    await page.waitForSelector(tableSelector, { timeout: 10000 });

    const allData = new Set();
    let hasNextPage = true;
    let lastFirstEntry = null;

    while (hasNextPage) {
        console.log("Extraindo os dados da aba específica...");
        const leaderboard = await page.evaluate((tableSelector) => {
            const rows = document.querySelectorAll(tableSelector);
            const data = [];

            rows.forEach(row => {
                const username = row.querySelector('.leaderboard-row')?.textContent.trim() || "N/A";
                const points = row.querySelector('.leaderboard-row + td')?.textContent.trim() || "N/A";

                if (username !== "N/A" && points !== "N/A") {
                    data.push({ username, points });
                }
            });

            return data;
        }, tableSelector);

        if (leaderboard.length > 0) {
            leaderboard.forEach(entry => allData.add(JSON.stringify(entry)));
            console.log(`Dados extraídos nesta página: ${leaderboard.length} registros.`);
        } else {
            console.warn("Nenhum dado extraído nesta página.");
        }

        // Salvar dados parciais
        fs.writeFileSync('leaderboard_partial.json', JSON.stringify([...allData].map(JSON.parse), null, 2));

        const firstEntry = leaderboard[0]?.username || null;

        if (firstEntry === lastFirstEntry) {
            console.log("Os dados não mudaram. Encerrando para evitar duplicação.");
            break;
        }
        lastFirstEntry = firstEntry;

        console.log("Verificando se há próxima página...");
        hasNextPage = await page.evaluate((tabSelector) => {
            const nextButton = document.querySelector(`${tabSelector} button[aria-label="Next"]`);
            return nextButton && !nextButton.disabled;
        }, tabSelector);

        if (hasNextPage) {
            console.log("Indo para a próxima página...");
            try {
                const nextButton = await page.$(`${tabSelector} button[aria-label="Next"]`);
                await nextButton.click();

                await page.waitForFunction(
                    (tableSelector, lastFirstEntry) => {
                        const firstRow = document.querySelector(`${tableSelector} .leaderboard-row`);
                        return firstRow && firstRow.textContent.trim() !== lastFirstEntry;
                    },
                    { timeout: 15000 },
                    tableSelector,
                    lastFirstEntry
                );

                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (err) {
                console.error("Erro ao clicar no botão de próxima página:", err);
                break;
            }
        } else {
            console.log("Não há mais páginas disponíveis.");
        }
    }

    if (allData.size === 0) {
        console.error("Nenhum dado foi extraído! Verifique os seletores ou estrutura da página.");
    } else {
        console.log(`Total de registros extraídos: ${allData.size}`);
    }

    fs.writeFileSync('leaderboard.json', JSON.stringify([...allData].map(JSON.parse), null, 2));
    console.log('Leaderboard salvo em leaderboard.json');

    await browser.close();
}

scrapeLeaderboard().catch(err => {
    console.error("Erro durante o scraping:", err);
});
