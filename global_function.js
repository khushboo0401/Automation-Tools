function get_settings() {
  let getSystemData =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Systemconfig");
  let s_map = {};
  let settings_array = getSystemData
    .getRange(1, 1, getSystemData.getLastRow(), 2)
    .getValues();
  settings_array.forEach(function (row) {
    if (row[0] != "") {
      s_map[row[0]] = row[1];
    }
  });
  return s_map;
}

function getUniqueProjectValues() {
  let getDataAdditonalTask = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("Additional Tasks")
    .getDataRange()
    .getValues();
  let projectValues = [];
  for (let i = 1; i < getDataAdditonalTask.length; i++) {
    let projectvalue = getDataAdditonalTask[i][3];
    if (projectValues.indexOf(projectvalue) == -1) {
      projectValues.push(projectvalue);
    }
  }
  return projectValues;
}
