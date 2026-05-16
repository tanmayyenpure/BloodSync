const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://eraktkosh.mohfw.gov.in/eraktkoshPortal/#/publicPages/bloodAvailabilitySearch');
    await page.click('#rc_select_1');
    await page.fill('#rc_select_1', 'Maharashtra');
    await page.click('.ant-select-item-option-content:has-text("Maharashtra")');
    await page.click('#rc_select_2');
    await page.fill('#rc_select_2', 'Pune');
    await page.click('.ant-select-item-option-content:has-text("Pune")');
    await page.click('button:has-text("Search")');
    await page.waitForSelector('.ant-table-row');
    await page.screenshot({ path: 'screenshot.png', fullPage: true });
    await browser.close();
    console.log('Screenshot saved to screenshot.png');
})();
