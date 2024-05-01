
function createTask() {
  let getUserData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("UserConfiguration")
  let lengthUserData = getUserData.getLastRow();
  getListData()

  for (let index = 2; index <= lengthUserData; index++) {
    let assignid = getUserData.getRange(index, 4).getValue();
    if (assignid != "" ) {
      const clickUpTaskData = new ClickUpTaskData();
      clickUpTaskData.getCreateTaskHelper();
    }
  }
}
