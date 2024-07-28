# 📦 Inventory Management Automation

## 📋 Problem Statement

Manual data entry and inefficient communication are significant challenges in inventory management, leading to:

1. **Manual Data Entry** ✍️
    - Staff are required to manually key in "Current Stock Level," "Last Order Date," and "Last Received Date."
    - Copy supplier orders manually into a new sheet.
    - High potential for human error leading to inaccurate inventory levels.
    - Time-consuming process that diverts staff from more strategic tasks.

2. **Inefficient Communication** 📧
    - Staff must manually calculate reorder quantities and send emails to suppliers.
    - Delays in communication can lead to late orders and disruptions in the supply chain.
    - Lack of automation means critical reorder notifications can be missed, leading to stock shortages.

3. **Wastage of Resources** ⏳
    - Significant time spent on routine tasks like data entry, monitoring stock levels, and reordering.
    - Inefficient use of staff resources that could be better utilized in more value-added activities.

## 🛠️ Solution

This project aims to automate these processes using Google Apps Script and Google Sheets to:

1. Automatically update and manage inventory levels.
2. Calculate reorder quantities and send automated emails to suppliers.
3. Generate reports and notifications to prevent stock shortages and excesses.
4. Enhance communication and reduce human error in data entry and order processing.

## ✨ Features

- **Automated Data Entry**: Automatically updates "Current Stock Level," "Last Order Date," and "Last Received Date."
- **Reorder Calculation**: Automatically calculates reorder quantities based on predefined thresholds.
- **Automated Email Notifications**: Sends emails to suppliers with reorder details.
- **Report Generation**: Generates inventory reports to help staff monitor stock levels efficiently.

## 🧰 Technologies Used

- **Google Apps Script**: For scripting and automation within Google Sheets.
- **Google Sheets**: For data storage and manipulation.

## 🚀 Installation

1. **Download the Repository**:
    
2. **Open Google Sheets**:
    - Create a new Google Sheet or use an existing one.
3. **Add Apps Script**:
    - Open the Script Editor in Google Sheets (Extensions > Apps Script).
    - Copy and paste the code from the repository's `Inventory Management.Js` file into the Script Editor.
    - Save and name the script.
4. **Authorize the Script**:
    - Run the script for the first time to authorize the necessary permissions.
5. **Configure Settings**:
    - Adjust any settings within the script as needed, such as email recipients, reorder thresholds, etc.

## 📖 Usage

1. **Update Inventory**:
    - Use the Google Sheet to track inventory levels.
2. **Automate Reordering**:
    - The script will automatically calculate reorder quantities and send emails to suppliers when thresholds are met.
3. **Generate Reports**:
    - Use the built-in report generation features to monitor inventory levels and trends.
