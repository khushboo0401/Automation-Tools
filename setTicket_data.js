
function getTicketData() {
  const getClickupTasks = new GetClickupTasks();
  let ticketData = getClickupTasks.clickup_get_tasks()
  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName("Get All Tickets");

  const headerRow = ['Task ID', 'Task Name', 'Description', 'Assignees', 'Duration', 'Start Date', 'Due Date', 'Current Status','Completed Date','Actual Time Take', 'Ticket URL', 'List Name', 'Week', 'Created Date'];

  sheet.clearContents();

  sheet.getRange(1, 1, 1, headerRow.length).setValues([headerRow]);

  let data = ticketData.map(row => row.map(cell => typeof cell === 'number' ? cell.toString() : cell));

  if (data.length > 0) {
    sheet.getRange(2, 1, data.length, data[0].length).setValues(data);
  }
}





