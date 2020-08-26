var GoogleSpreadsheet = require("google-spreadsheet");
var cred = require("./client-secret.json");
const { promisify } = require("util");

async function getSpreadsheet() {
  const doc = new GoogleSpreadsheet(
    `INSERT YOUR URL SHEET CODE HERE`,
    null,
    { gzip: false }
  );
  await promisify(doc.useServiceAccountAuth)(cred).catch((err) =>
    console.log("Google Sheets Authentication Error")
  );
  const info = await promisify(doc.getInfo)();
  const sheet = info.worksheets[0];
  const rows = await promisify(sheet.getRows)();
  return rows;
}

async function getGoals() {
  const sdgDoc = new GoogleSpreadsheet(
    `INSERT YOUR URL SHEET CODE HERE`,
    null,
    { gzip: false }
  );
  await promisify(sdgDoc.useServiceAccountAuth)(cred).catch((err) =>
    console.log("Google Sheets Authentication Error")
  );
  const sdgInfo = await promisify(sdgDoc.getInfo)();
  const sdgSheet = sdgInfo.worksheets[2];
  const sdgRows = await promisify(sdgSheet.getRows)();
  return sdgRows;
}

async function addProject(data) {
  const doc = new GoogleSpreadsheet(
    `INSERT YOUR URL SHEET CODE HERE`,
    null,
    { gzip: false }
  );
  await promisify(doc.useServiceAccountAuth)(cred).catch((err) =>
    console.log("Google Sheets Authentication Error")
  );

  const info = await promisify(doc.getInfo)();
  const sheet = info.worksheets[1];

  sheet.addRow(data, function (err) {
    if (err) {
      console.log(err);
    }
  });
}

export { getSpreadsheet, getGoals, addProject };
