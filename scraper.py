from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

import pandas as pd
import time
import gspread
from google_auth_oauthlib.flow import InstalledAppFlow

# ---------------- GOOGLE AUTH ----------------

scopes = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive"
]

flow = InstalledAppFlow.from_client_secrets_file(
    "credentials.json",
    scopes
)

creds = flow.run_local_server(port=0)

client = gspread.authorize(creds)

sheet = client.open("BloodData").sheet1

# ---------------- SELENIUM ----------------

driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install())
)

driver.maximize_window()

# ---------------- OPEN WEBSITE ----------------

driver.get(
    "https://eraktkosh.mohfw.gov.in/eraktkoshPortal/#/publicPages/bloodAvailabilitySearch"
)

print("Website Opened")

# ---------------- MANUAL SELECTION ----------------

print("\nSelect:")
print("1. Maharashtra")
print("2. Pune")
print("3. Click Search")

time.sleep(40)

# ---------------- WAIT AFTER SEARCH ----------------

print("Waiting for results...")
time.sleep(10)

# ---------------- FIND ALL RESULT CARDS ----------------

cards = driver.find_elements(
    By.XPATH,
    "//mat-card"
)

print("Total Cards:", len(cards))

data = []

# ---------------- LOOP THROUGH CARDS ----------------

for card in cards:

    try:

        text = card.text

        lines = text.split("\n")

        # REMOVE EMPTY LINES
        lines = [line.strip() for line in lines if line.strip()]

        if len(lines) < 10:
            continue

        # ---------------- BLOOD BANK ----------------

        blood_bank = lines[0]

        address = lines[1]

        print("\nBlood Bank:", blood_bank)

        # ---------------- FIND COMPONENT ROWS ----------------

        for i in range(len(lines)):

            line = lines[i]

            # COMPONENT NAMES
            if line in [
                "Packed Red Blood Cells",
                "Random Donor Platelets",
                "Fresh Frozen Plasma",
                "Single Donor Platelet",
                "Cryoprecipitate",
                "Whole Blood"
            ]:

                component = line

                try:

                    a_neg = lines[i + 1]
                    b_pos = lines[i + 2]
                    b_neg = lines[i + 3]
                    o_pos = lines[i + 4]
                    ab_pos = lines[i + 5]
                    ab_neg = lines[i + 6]
                    a_pos = lines[i + 7]
                    o_neg = lines[i + 8]

                    row_data = [
                        "Maharashtra",
                        "Pune",
                        blood_bank,
                        address,
                        component,
                        a_neg,
                        b_pos,
                        b_neg,
                        o_pos,
                        ab_pos,
                        ab_neg,
                        a_pos,
                        o_neg
                    ]

                    data.append(row_data)

                    print(row_data)

                except:
                    pass

    except Exception as e:

        print("Error:", e)

driver.quit()

# ---------------- DATAFRAME ----------------

df = pd.DataFrame(data, columns=[
    "State",
    "District",
    "Blood Bank",
    "Address",
    "Component",
    "A-Ve",
    "B+Ve",
    "B-Ve",
    "O+Ve",
    "AB+Ve",
    "AB-Ve",
    "A+Ve",
    "O-Ve"
])

print("\nTOTAL ROWS:", len(df))

print(df.head())

# ---------------- UPDATE GOOGLE SHEET ----------------

sheet.clear()

sheet.update(
    [df.columns.values.tolist()] + df.values.tolist()
)

print("\nGoogle Sheet Updated Successfully")