
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

