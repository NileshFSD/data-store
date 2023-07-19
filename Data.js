WhatsApp Business API:
The WhatsApp Business API allows businesses to connect with their customers on WhatsApp. It enables businesses to send notifications, provide customer support, and conduct various other interactions with users through WhatsApp. It is not designed for personal use or for general application development.

Key features of the WhatsApp Business API include:

Message Templates: Businesses can create pre-approved message templates for specific use cases like order updates, shipping notifications, appointment reminders, etc. These templates are used for proactive communication with customers.

Session Messaging: Businesses can respond to incoming messages from users within a 24-hour window without any additional cost. This window allows for interactive and responsive conversations.

WhatsApp Number Verification: Before using the API, businesses need to verify their WhatsApp Business Account and get their phone number approved by WhatsApp.

Media Support: The API allows businesses to send images, videos, documents, and other media types to users.
// ////////////////////////////////
const http = require('http');
const https = require('https');
const fs = require('fs');

function downloadXLS(url, destinationPath, callback) {
  const protocol = url.startsWith('https') ? https : http;

  const file = fs.createWriteStream(destinationPath);

  protocol.get(url, (response) => {
    response.pipe(file);

    file.on('finish', () => {
      file.close(() => {
        callback(null);
      });
    });
  }).on('error', (error) => {
    fs.unlink(destinationPath, () => {
      callback(error);
    });
  });
}

// Example usage:
const fileUrl = 'http://www.example.com/example.xls';
const destination = './repository/example.xls';

downloadXLS(fileUrl, destination, (error) => {
  if (error) {
    console.error('Download failed:', error);
  } else {
    console.log('Download completed!');
  }
});



///////////////////////////////////////////////////////////////////////
const http = require('http');
const fs = require('fs');

function downloadFile(url, destinationPath, callback) {
  const file = fs.createWriteStream(destinationPath);

  http.get(url, (response) => {
    response.pipe(file);

    file.on('finish', () => {
      file.close(() => {
        callback(null);
      });
    });
  }).on('error', (error) => {
    fs.unlink(destinationPath, () => {
      callback(error);
    });
  });
}

// Example usage:
const fileUrl = 'http://www.example.com/example.txt';
const destination = './downloads/example.txt';

downloadFile(fileUrl, destination, (error) => {
  if (error) {
    console.error('Download failed:', error);
  } else {
    console.log('Download completed!');
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////


async function exportZohoSheet(sheetUrl, outputPath) {
  try {
    const response = await axios.get(sheetUrl, { responseType: 'arraybuffer' });
    const sheetData = response.data;

    // Save the sheet data to a file
    fs.writeFileSync(outputPath, sheetData);

    console.log('Zoho Sheet exported successfully:', outputPath);
  } catch (error) {
    console.error('An error occurred while exporting the Zoho Sheet:', error.message);
  }
}
const zohoSheetUrl = 'https://sheet.zoho.com/sheet/example'; // Replace with the actual Zoho Sheet URL
const outputFilePath = 'path/to/output/file.xlsx'; // Replace with the desired output file path and extension

exportZohoSheet(zohoSheetUrl, outputFilePath);


//////////////////////////////////////////////////////////////////////////

https://docs.google.com/spreadsheets/d/19vwwBsFAH-hV1MAIxPs2FTm3Rg-m9pFW0J9l2Wx_IOE

/////////////////////////////////////////////////////////////////////////////////////////
async function readZohoSheet() {
  const sheetURL = 'https://sheet.zoho.com/sheet/your-sheet-url'; // Replace with the actual Zoho Sheet URL

  try {
    const response = await axios.get(`${sheetURL}/html`);
    const sheetHTML = response.data;

    // Process the sheet HTML data as needed
    console.log('Sheet HTML:', sheetHTML);
  } catch (error) {
    console.error('An error occurred while reading the sheet:', error.message);
  }
}

readZohoSheet();


//-convert zoho hseet into csv
async function convertZohoSheetToCSV() {
  const sheetURL = 'https://sheet.zoho.com/sheet/your-sheet-url'; // Replace with the actual Zoho Sheet URL

  try {
    const response = await axios.post(
      `https://sheet.zoho.com/api/v3/workbooks/${encodeURIComponent(sheetURL)}/export`,
      {
        export_format: 'csv',
      },
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const csvData = response.data.file_content;

    // Process the CSV data as needed
    console.log('CSV data:', csvData);
  } catch (error) {
    console.error('An error occurred while converting the sheet to CSV:', error.message);
  }
}

convertZohoSheetToCSV();

