const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    
    req.on('data', (data) => {
      body += data;
    });

    req.on('end', () => {
      const parsedBody = JSON.parse(body);
      const { field1, field2 } = parsedBody; // Adjust the field names as per your form fields

      // Generate text content
      const textContent = `Field 1: ${field1}\nField 2: ${field2}`;

      // Write text content to a file
      fs.writeFile('output.txt', textContent, (err) => {
        if (err) {
          console.error('Error writing to file:', err);
          res.statusCode = 500;
          res.end('Error writing to file');
        } else {
          console.log('File created successfully');
          res.statusCode = 200;
          res.end('File created successfully');
        }
      });
    });
  } else {
    res.statusCode = 404;
    res.end('Invalid request');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


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

