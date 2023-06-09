



async function convertHTMLToCSV(url, csvFilePath) {
  const html = await fetchHTML(url);
  if (html) {
    const $ = cheerio.load(html);

    // Example: Extract data from table rows and columns
    const data = [];
    $('table tr').each((rowIndex, rowElement) => {
      const rowData = [];
      $(rowElement)
        .find('td')
        .each((colIndex, colElement) => {
          const cellData = $(colElement).text();
          rowData.push(cellData);
        });
      data.push(rowData);
    });

    // Write data to CSV file
    const csvWriter = createCsvWriter({
      path: csvFilePath,
      header: data[0].map((_, index) => ({ id: `col${index + 1}`, title: `Column ${index + 1}` })),
    });
    await csvWriter.writeRecords(data.slice(1));

    console.log('CSV file has been created:', csvFilePath);
  }
}

// Usage example: Replace 'https://example.com' with the actual URL of the HTML page you want to convert
convertHTMLToCSV('https://example.com', 'output.csv');

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

