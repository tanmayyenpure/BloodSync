# Blood Bank Data Automation Scraper

An automated web scraping pipeline for the [eRaktKosh portal](https://eraktkosh.mohfw.gov.in/eraktkoshPortal/#/publicPages/bloodAvailabilitySearch) designed to extract real-time blood stock data and sync it with Google Sheets.

## Features
- **Multi-Page Scraping**: Automatically handles pagination to extract all records.
- **Deep Extraction**: Pulls detailed stock levels for all blood groups (A+, B-, etc.) and components (Plasma, Platelets, etc.).
- **Google Sheets Integration**: Syncs data directly to a spreadsheet using OAuth 2.0.
- **Automated Scheduling**: Ready for daily updates via Windows Task Scheduler.
- **Timestamps**: Includes "Last Updated" column for data freshness tracking.

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   npx playwright install chromium
   ```

2. **Configuration**:
   - Create a `.env` file with your `STATE`, `DISTRICT`, and `GOOGLE_SHEET_ID`.
   - Place your Google Cloud `credentials.json` in the root folder.

3. **Authentication**:
   Run the setup script once to link your Google account:
   ```bash
   node auth_setup.js
   ```

4. **Run Scraper**:
   ```bash
   node scraper.js
   ```

## Automation (Windows)
Double-click `run_scraper.bat` or set it up in **Windows Task Scheduler** for daily updates.
