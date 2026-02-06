/**
 * Google Apps Script to collect email addresses in Google Sheets
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Click "New Project"
 * 3. Replace the default code with this script
 * 4. Replace 'YOUR_SHEET_NAME' with your actual Google Sheet name (or create a new one)
 * 5. Click "Deploy" > "New deployment"
 * 6. Select type: "Web app"
 * 7. Set "Execute as" to "Me"
 * 8. Set "Who has access" to "Anyone"
 * 9. Click "Deploy"
 * 10. Copy the Web app URL and paste it in your index.html file where it says YOUR_GOOGLE_APPS_SCRIPT_URL
 */

function doPost(e) {
  try {
    // Handle both JSON and FormData
    let email, timestamp;
    
    if (e.postData.type === 'application/json') {
      // JSON format
      const data = JSON.parse(e.postData.contents);
      email = data.email;
      timestamp = data.timestamp || new Date().toISOString();
    } else {
      // FormData format
      email = e.parameter.email;
      timestamp = e.parameter.timestamp || new Date().toISOString();
    }
    
    // Open your Google Sheet (replace 'YOUR_SHEET_NAME' with your actual sheet name)
    // Or use the Spreadsheet ID: SpreadsheetApp.openById('YOUR_SPREADSHEET_ID')
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
    
    // If sheet doesn't exist, create it
    if (!sheet) {
      const newSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Sheet1');
      newSheet.appendRow(['Email', 'Timestamp']);
      newSheet.appendRow([email, timestamp]);
      return ContentService.createTextOutput(JSON.stringify({success: true}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Check if headers exist, if not add them
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Email', 'Timestamp']);
    }
    
    // Add the email and timestamp to the sheet
    sheet.appendRow([email, timestamp]);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: GET handler for testing
function doGet(e) {
  return ContentService.createTextOutput('Email collection service is running!')
    .setMimeType(ContentService.MimeType.TEXT);
}

