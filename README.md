<div align="center">

# 🩸 BloodSync

### Intelligent Blood Bank Data Automation Platform

**Real-Time Blood Data • Automated Collection • Google Sheets Integration • Smart Healthcare Automation**

![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-Automation-2EAD33?style=for-the-badge)
![Google Sheets](https://img.shields.io/badge/Google%20Sheets-Integration-34A853?style=for-the-badge&logo=googlesheets&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![MIT](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)

<br>

### Automating Blood Bank Data for Smarter Healthcare Decisions

*Reliable Automation • Structured Data • Real-World Impact*

</div>

---

# 📖 Overview

BloodSync is an Intelligent Blood Bank Data Automation Platform designed to automate the collection, processing, and synchronization of real-time blood availability data from the **eRaktKosh** portal.

Built using **Node.js**, **Playwright**, and **Google Sheets API**, the platform eliminates repetitive manual data collection by transforming unstructured web information into organized, reliable, and continuously updated datasets.

Developed in collaboration with **Love Care Share Foundation**, BloodSync demonstrates how intelligent automation can improve operational efficiency, increase data accessibility, and support healthcare initiatives through modern software engineering.

---

# 🎯 Problem Statement

Blood banks continuously update inventory information, making manual data collection inefficient, repetitive, and prone to human error.

Organizations and volunteers require accurate and timely blood availability information to make informed decisions and improve operational workflows.

BloodSync addresses these challenges by creating an automated pipeline that collects, structures, validates, and synchronizes blood inventory data with minimal human intervention.

---

# ✨ Key Features

## 🩸 Automated Blood Data Collection

- Intelligent multi-page web scraping
- Automatic pagination handling
- Structured data extraction
- Reliable information processing

---

## 📊 Real-Time Blood Inventory

- Blood group availability tracking
- Blood component monitoring
- Live inventory synchronization
- Timestamp-based data freshness

---

## 🔄 Google Sheets Integration

- OAuth 2.0 authentication
- Automatic spreadsheet synchronization
- Centralized data management
- Cloud-based accessibility

---

## ⚡ Smart Automation

- Scheduled execution
- Daily automated updates
- Minimal manual intervention
- Reliable data pipeline

---

## 🏗️ Scalable Architecture

- Modular automation workflow
- Configurable deployment
- Easy maintenance
- Extensible project structure

---

# 🏗️ System Architecture

```text
                     eRaktKosh Portal

                             │

                             ▼

                  Playwright Automation Engine

                             │

                     Intelligent Data Extraction

                             │

                             ▼

                   Data Processing & Validation

                             │

                             ▼

                  Google Sheets API Integration

                             │

                             ▼

                    Structured Healthcare Data

                             │

                             ▼

                 Love Care Share Foundation
```

---

# 🛠️ Technology Stack

| Category | Technology |
| ------------------------- | ------------------------------ |
| Runtime Environment | Node.js |
| Automation Framework | Playwright |
| Programming Language | JavaScript |
| Data Integration | Google Sheets API |
| Authentication | OAuth 2.0 |
| Environment Management | dotenv |
| Scheduling | Windows Task Scheduler |
| Version Control | Git & GitHub |

---

# 📊 Project Statistics

| Property | Details |
| ---------------------- | --------------------------------------- |
| Project Type | Data Automation Platform |
| Domain | Healthcare |
| Architecture | Automation Pipeline |
| Data Source | eRaktKosh Portal |
| Integration | Google Sheets API |
| Automation | Playwright |
| License | MIT |
| Status | Active Development |

---
# 📂 Project Structure

```text
BloodSync/

├── auth_setup.js
├── scraper.js
├── run_scraper.bat
├── package.json
├── package-lock.json
├── credentials.json          # User Generated
├── token.json                # Auto Generated
├── .env                      # User Configuration
├── .gitignore
├── README.md
└── LICENSE
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/tanmayyenpure/BloodSync.git
```

```bash
cd BloodSync
```

---

# ⚙️ Installation

Install project dependencies.

```bash
npm install
```

Install Playwright Chromium browser.

```bash
npx playwright install chromium
```

---

# 🔐 Configuration

Create a `.env` file in the project root and configure the following variables.

```env
STATE=Your State
DISTRICT=Your District
GOOGLE_SHEET_ID=Your Google Sheet ID
```

Place your Google Cloud API credentials file in the project root.

```text
credentials.json
```

---

# 🔑 Authentication

Run the authentication setup once to authorize Google Sheets access.

```bash
node auth_setup.js
```

A browser window will open requesting Google account authorization.

After successful authentication, a `token.json` file will be generated automatically.

---

# ▶️ Running the Automation

Start the data automation pipeline.

```bash
node scraper.js
```

The application will:

- Connect to the eRaktKosh portal
- Extract blood availability information
- Process and validate collected data
- Synchronize records with Google Sheets
- Generate updated timestamps

---

# ⚙️ Automation Workflow

The project is designed for unattended execution.

Execute the following file manually:

```text
run_scraper.bat
```

or configure it with **Windows Task Scheduler** for fully automated daily synchronization.

---

# 🔄 Data Pipeline

```text
eRaktKosh Portal

        │

        ▼

Playwright Browser Automation

        │

        ▼

Multi-Page Data Extraction

        │

        ▼

Data Processing & Validation

        │

        ▼

Google Sheets Synchronization

        │

        ▼

Updated Blood Availability Records
```

---

# 🤝 Collaboration

BloodSync was developed as a real-world automation initiative in collaboration with **Love Care Share Foundation**.

The project demonstrates how intelligent automation can reduce repetitive manual processes, improve healthcare data accessibility, and provide reliable information through structured and continuously synchronized datasets.

---

# 🌟 Why BloodSync?

BloodSync is more than a web scraper.

It is an automation platform designed to transform repetitive healthcare data collection into a reliable, scalable, and intelligent workflow.

### Key Benefits

- Real-Time Blood Availability Monitoring
- Automated Multi-Page Data Collection
- Centralized Google Sheets Integration
- Reliable & Structured Healthcare Data
- Minimal Manual Intervention
- Scalable Automation Pipeline

---
# 📈 Future Roadmap

BloodSync is designed as a scalable healthcare automation platform with a vision of transforming blood inventory management through intelligent automation and modern data engineering.

### 🚀 Automation Enhancements

- Intelligent Retry Mechanism
- Automatic Error Recovery
- Advanced Data Validation
- Smart Duplicate Detection

---

### 📊 Analytics & Reporting

- Blood Availability Dashboard
- Historical Data Analysis
- Automated Report Generation
- Interactive Data Visualization

---

### ☁️ Cloud Integration

- Cloud Database Support
- Multi-State Data Synchronization
- REST API Integration
- Real-Time Notifications

---

### 🤖 AI-Powered Features

- Blood Demand Prediction
- Smart Inventory Forecasting
- AI-Based Data Insights
- Intelligent Healthcare Analytics

---

# 🎯 Real-World Impact

BloodSync demonstrates how automation can simplify repetitive healthcare workflows by transforming manual data collection into an intelligent and reliable process.

By integrating browser automation, structured data processing, and cloud synchronization, the platform improves operational efficiency while ensuring timely access to critical blood availability information.

---

# 🤝 Contributing

Contributions, ideas, and improvements are always welcome.

### 1. Fork the Repository

Create your own copy of the project.

### 2. Create a Feature Branch

```bash
git checkout -b feature/new-feature
```

### 3. Commit Your Changes

```bash
git commit -m "feat: add new feature"
```

### 4. Push Your Branch

```bash
git push origin feature/new-feature
```

### 5. Open a Pull Request

Submit your changes for review and help improve BloodSync.

---

# 📜 License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute this project in accordance with the license terms.

---

# 👨‍💻 Developer

**Tanmay Yenpure**

### AI/ML Engineer

---

### 🔗 GitHub

https://github.com/tanmayyenpure

---

# ⭐ Support the Project

If you found **BloodSync** useful or interesting, consider giving this repository a **Star ⭐** on GitHub.

Your support encourages continuous improvements and future open-source contributions.

---

<div align="center">

# 🩸 BloodSync

### Intelligent Blood Bank Data Automation Platform

**Building reliable healthcare automation through modern software engineering.**

**Engineered by Tanmay Yenpure**

</div>
