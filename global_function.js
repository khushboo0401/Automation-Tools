function get_settings() {
    let getSystemData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Systemconfig")
    let s_map = {}
    let settings_array = getSystemData.getRange(1, 1, getSystemData.getLastRow(), 2).getValues()
    settings_array.forEach(function (row) {
        if (row[0] != "") {
            s_map[row[0]] = row[1];
        }
    });
    return s_map;
}


function getTaskIds() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("NewTickets")
  let data = sheet.getDataRange().getValues();
  console.log(data)
  let taskIds = [];
  
  for (let row of data.slice(1)) { 
    let taskId = row[5];
    taskIds.push(taskId);
  }
  return taskIds;
}



