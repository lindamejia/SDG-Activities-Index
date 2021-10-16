const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("./client-secret.json");

const SDG_MAP = {
  'No Poverty': 1,
  'Zero Hunger': 2,
  'Good Health And Well Being': 3,
  'Quality Education': 4,
  'Gender Equality': 5,
  'Clean Water And Sanitation': 6,
  'Affordable Clean Energy': 7,
  'Decent Work And Economic Growth': 8,
  'Industry, Innovation And Infrastructure': 9,
  'Reduced Inequalities': 10,
  'Sustainable Cities And Communities': 11,
  'Responsible Consumption And Production': 12,
  'Climate Action': 13,
  'Life Below Water': 14,
  'Life On Land': 15,
  'Peace, Justice And Strong Institutions': 16,
  'Partnerships For The Goals': 17
};

async function getSpreadsheet() {
  const doc = new GoogleSpreadsheet('INSERT SHEET ID');
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();
  return rows;
}

async function getGoals() {
  const sdgDoc = new GoogleSpreadsheet('INSERT SHEET ID');
  await sdgDoc.useServiceAccountAuth(creds);
  await sdgDoc.loadInfo();
  const sdgSheet = sdgDoc.sheetsByIndex[2];
  const sdgRows = await sdgSheet.getRows();
  return sdgRows;
}

function transformNewProjectData(data) {
  const fieldMap = {
    activityType: 'activity type',
    description: 'Description',
    email: 'Email',
    name: 'Name',
    organization: 'organization',
    projectname: 'Project Name',
    sdg: 'sdg',
    sector: 'sector',
    themes: 'themes',
    timeSubmitted: 'time submitted',
    website: 'website'
  };

  // Transform keys / fields 
  const transformedData = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [fieldMap[key], value])
  );

  // Map SDG to IDs
  transformedData.sdg = transformedData.sdg.map(goal => SDG_MAP[goal]);
  transformedData.sdg.sort((a, b) => parseInt(a) - parseInt(b));


  // Join values together for SDG and Themes
  transformedData.sdg = transformedData.sdg.join(',');
  transformedData.themes = transformedData.themes.join(', ');

  return transformedData;
}

async function addProject(data) {
  const transformedData = transformNewProjectData(data);
  const doc = new GoogleSpreadsheet('INSERT SHEET ID');
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[1];
  await sheet.addRow(transformedData);
}

export { getSpreadsheet, getGoals, addProject };
