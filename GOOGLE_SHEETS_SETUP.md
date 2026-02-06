# Google Sheets Email Collection Setup

This guide will help you set up email collection from your landing page to a Google Spreadsheet.

## Step 1: Create a Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "Abocado Waitlist" or "Email Collection"
4. Note the spreadsheet name (you'll need it later)

## Step 2: Create Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click **"New Project"**
3. Delete the default code and paste the contents of `google-apps-script.js`
4. In the script, replace `'Sheet1'` with your actual sheet name (or keep it if your sheet is named "Sheet1")
5. Click **"Save"** (Ctrl+S or Cmd+S) and name your project (e.g., "Email Collector")

## Step 3: Link the Script to Your Spreadsheet

**Option A: If you want to use a specific spreadsheet:**
1. In the Google Apps Script editor, click on the project name
2. Click **"Project Settings"** (gear icon)
3. Under "Spreadsheet", click **"Change"**
4. Select your spreadsheet from the list
5. Click **"Save"**

**Option B: Or modify the script to use Spreadsheet ID:**
Replace this line in the script:
```javascript
const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
```

With:
```javascript
const sheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID').getSheetByName('Sheet1');
```
(Get the Spreadsheet ID from the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`)

## Step 4: Deploy as Web App

1. In the Google Apps Script editor, click **"Deploy"** > **"New deployment"**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **"Web app"**
4. Set the following:
   - **Description**: "Email Collection API" (optional)
   - **Execute as**: **"Me"** (your email)
   - **Who has access**: **"Anyone"** (important!)
5. Click **"Deploy"**
6. **Copy the Web app URL** that appears (it will look like: `https://script.google.com/macros/s/.../exec`)

## Step 5: Update Your HTML File

1. Open `index.html`
2. Find this line in the JavaScript section:
   ```javascript
   const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL` with the Web app URL you copied in Step 4
4. Save the file

## Step 6: Test It!

1. Open your landing page
2. Enter an email address in the form
3. Click "Join beta"
4. Check your Google Spreadsheet - you should see the email appear with a timestamp!

## Troubleshooting

- **Emails not appearing**: Make sure "Who has access" is set to "Anyone" in the deployment settings
- **Script errors**: Check the Apps Script execution log (View > Executions)
- **CORS errors**: The current setup uses `no-cors` mode, which should work, but you won't see error responses

## Security Note

The current setup allows anyone to submit emails. If you want to add authentication or rate limiting, you'll need to modify the Google Apps Script accordingly.

