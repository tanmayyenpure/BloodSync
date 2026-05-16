require('dotenv').config();
const { chromium } = require('playwright');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { GoogleSpreadsheet } = require('google-spreadsheet');
const fs = require('fs');
const path = require('path');
const { OAuth2Client } = require('google-auth-library');

const CSV_FILE = 'blood_stock_pune.csv';
const STATE = process.env.STATE || 'Maharashtra';
const DISTRICT = process.env.DISTRICT || 'Pune';
const SHEET_ID = process.env.GOOGLE_SHEET_ID;

async function scrape() {
    console.log(`🚀 Pipeline Started at ${new Date().toLocaleString()}`);
    // Headless is set to true for automated daily runs
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        await page.goto('https://eraktkosh.mohfw.gov.in/eraktkoshPortal/#/publicPages/bloodAvailabilitySearch', { waitUntil: 'networkidle' });

        if (STATE && DISTRICT) {
            console.log(`📍 Selecting: ${STATE} / ${DISTRICT}`);
            await page.click('#rc_select_1');
            await page.fill('#rc_select_1', STATE);
            await page.waitForSelector(`.ant-select-item-option-content:has-text("${STATE}")`);
            await page.click(`.ant-select-item-option-content:has-text("${STATE}")`);

            await page.click('#rc_select_2');
            await page.fill('#rc_select_2', DISTRICT);
            await page.waitForSelector(`.ant-select-item-option-content:has-text("${DISTRICT}")`);
            await page.click(`.ant-select-item-option-content:has-text("${DISTRICT}")`);

            await page.click('button:has-text("Search")');
        }

        await page.waitForSelector('tr.ant-table-row-level-0', { timeout: 120000 });

        try {
            await page.click('.ant-pagination-options-size-changer');
            await page.waitForSelector('.ant-select-item-option-content:has-text("50 / page")');
            await page.click('.ant-select-item-option-content:has-text("50 / page")');
            await page.waitForTimeout(2000);
        } catch (e) {}

        const allData = [];
        let hasNextPage = true;
        let pageNum = 1;
        const timestamp = new Date().toLocaleString();

        while (hasNextPage) {
            console.log(`📑 Processing Page ${pageNum}...`);
            const pageResults = await extractPageData(page, timestamp);
            allData.push(...pageResults);

            const nextBtn = page.locator('li.ant-pagination-next');
            const isDisabled = await nextBtn.getAttribute('aria-disabled') === 'true' || await nextBtn.getAttribute('class').then(c => c.includes('disabled'));
            
            if (!isDisabled) {
                await nextBtn.click();
                await page.waitForTimeout(3000);
                pageNum++;
            } else {
                hasNextPage = false;
            }
        }

        console.log(`✅ Total Data Rows: ${allData.length}`);
        await saveToCsv(allData);
        await saveToSheets(allData);
        console.log(`🏁 Pipeline successfully completed at ${new Date().toLocaleString()}`);

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await browser.close();
    }
}

async function extractPageData(page, timestamp) {
    const bloodBankCount = await page.locator('tr.ant-table-row-level-0').count();
    const bloodBanks = [];
    for (let i = 0; i < bloodBankCount; i++) {
        const row = page.locator('tr.ant-table-row-level-0').nth(i);
        const name = await row.locator('td:nth-child(2) p').first().textContent().catch(() => 'Unknown');
        const address = await row.locator('td:nth-child(2)').first().textContent().catch(() => '');
        bloodBanks.push({ name: name.trim(), address: address.replace(name, '').trim() });
    }

    const pageData = [];
    for (let i = 0; i < bloodBanks.length; i++) {
        const bb = bloodBanks[i];
        const clickSuccess = await page.evaluate((index) => {
            const els = Array.from(document.querySelectorAll('*')).filter(el => 
                el.innerText && el.innerText.trim() === 'View Stock Availability' && el.children.length === 0
            );
            if (els[index]) { els[index].click(); return true; }
            return false;
        }, i);

        if (clickSuccess) {
            try {
                await page.waitForSelector('.nested_table', { state: 'visible', timeout: 10000 });
                const rowsFound = await page.evaluate((index) => {
                    const btns = Array.from(document.querySelectorAll('*')).filter(el => 
                        el.innerText && (el.innerText.trim() === 'View Stock Availability' || el.innerText.trim() === 'Hide Stock Availability') && el.children.length === 0
                    );
                    const container = btns[index].closest('td');
                    if (!container) return [];
                    const expandedArea = container.querySelector('.nested_table tbody');
                    if (!expandedArea) return [];
                    const trs = Array.from(expandedArea.querySelectorAll('tr'));
                    return trs.map(r => Array.from(r.querySelectorAll('td')).map(td => td.innerText.trim()));
                }, i);

                for (const cells of rowsFound) {
                    if (cells.length >= 10 && cells[1] !== '' && cells[1] !== 'Component') {
                        pageData.push({
                            'Last Updated': timestamp,
                            'Blood Bank': bb.name,
                            'Component': cells[1],
                            'A-Ve': normalizeValue(cells[2]),
                            'B+Ve': normalizeValue(cells[3]),
                            'B-Ve': normalizeValue(cells[4]),
                            'O+Ve': normalizeValue(cells[5]),
                            'AB+Ve': normalizeValue(cells[6]),
                            'AB-Ve': normalizeValue(cells[7]),
                            'A+Ve': normalizeValue(cells[8]),
                            'O-Ve': normalizeValue(cells[9]),
                            'Address': bb.address,
                            'State': STATE || 'Selected',
                            'District': DISTRICT || 'Selected'
                        });
                    }
                }
            } catch (err) {}
            
            await page.evaluate((index) => {
                const els = Array.from(document.querySelectorAll('*')).filter(el => 
                    el.innerText && el.innerText.trim() === 'Hide Stock Availability' && el.children.length === 0
                );
                if (els[0]) els[0].click(); 
            }, i);
            await page.waitForTimeout(300); 
        }
    }
    return pageData;
}

function normalizeValue(val) {
    if (!val || val.trim() === 'NA' || val.trim() === '-' || val.trim() === '') return '0';
    return val.trim();
}

async function saveToCsv(data) {
    const csvWriter = createCsvWriter({
        path: CSV_FILE,
        header: [
            { id: 'Last Updated', title: 'Last Updated' },
            { id: 'Blood Bank', title: 'Blood Bank' },
            { id: 'Component', title: 'Component' },
            { id: 'A-Ve', title: 'A-Ve' },
            { id: 'B+Ve', title: 'B+Ve' },
            { id: 'B-Ve', title: 'B-Ve' },
            { id: 'O+Ve', title: 'O+Ve' },
            { id: 'AB+Ve', title: 'AB+Ve' },
            { id: 'AB-Ve', title: 'AB-Ve' },
            { id: 'A+Ve', title: 'A+Ve' },
            { id: 'O-Ve', title: 'O-Ve' },
            { id: 'Address', title: 'Address' },
            { id: 'State', title: 'State' },
            { id: 'District', title: 'District' }
        ]
    });
    await csvWriter.writeRecords(data);
}

async function saveToSheets(data) {
    const credsPath = path.join(__dirname, 'credentials.json');
    const tokenPath = path.join(__dirname, 'token.json');
    if (!fs.existsSync(credsPath) || !fs.existsSync(tokenPath)) return;

    try {
        const credentials = JSON.parse(fs.readFileSync(credsPath));
        const {client_secret, client_id, redirect_uris} = credentials.installed || credentials.web;
        const auth = new OAuth2Client(client_id, client_secret, redirect_uris[0] || 'urn:ietf:wg:oauth:2.0:oob');
        auth.setCredentials(JSON.parse(fs.readFileSync(tokenPath)));

        const doc = new GoogleSpreadsheet(SHEET_ID, auth);
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        console.log('⏳ Updating Google Sheet...');
        await sheet.clear();
        await sheet.setHeaderRow(['Last Updated', 'Blood Bank', 'Component', 'A-Ve', 'B+Ve', 'B-Ve', 'O+Ve', 'AB+Ve', 'AB-Ve', 'A+Ve', 'O-Ve', 'Address', 'State', 'District']);
        if (data.length > 0) { await sheet.addRows(data); }
        console.log('📊 Google Sheet Updated Successfully');
    } catch (error) {
        console.error('❌ Error updating Google Sheets:', error);
    }
}

scrape();
