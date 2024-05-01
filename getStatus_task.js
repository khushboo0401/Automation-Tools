
function setValueStatus() {
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("NewTickets")
  const getStatus = new GetStatus();

  let status_array = getStatus.getTicketStatus();
  for (let i = 0; i < status_array.length; i++) {
    spreadsheet.getRange(i + 2, 8).setValue(status_array[i])
  }
}


