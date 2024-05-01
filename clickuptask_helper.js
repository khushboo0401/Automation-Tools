if (typeof require !== 'undefined') {
  MockData = require('./MockData.min.js');
}

let ClickUpTaskData = (function () {
  const _userData = (
    [

      ["Name", "Email", "System", "ClickUp Assign ID"],
      ["Vaibhav Rawat", "vaibhav.rawat@madgicaltechdom.com", "Clickup", "61433184"],
    ]
  )
  const _taskData = ([["Summary", "Description", "Estimate", "List Name", "Task ID"],
  ["Create the trigger function for automatically get the ticket status into the sheet . ", "Create the trigger function for automatically get the ticket status into the sheet .", 3, "Training On Boarding", "86781qg2c","","","","Documentation"],
  ])

  let mockData;
  if (typeof SpreadsheetApp === 'undefined') {
    mockData = new MockData().addData("userData", _userData);
    mockData.addData("taskData", _taskData);
  }
  let _clickUpTaskHelper = new WeakMap();
  class ClickUpTaskData {
    constructor() {
      if (mockData) {
        _clickUpTaskHelper.set(this, mockData);
        return this;
      }
    }


    getCreateTaskHelper() {
      let getTaskData;
      let getUserData;
      let lengthUserData;
      let data;

      if (mockData) {
        getTaskData = _clickUpTaskHelper.get(this).getData("taskData");
        getUserData = _clickUpTaskHelper.get(this).getData("userData");
        lengthUserData = getUserData.length;
        data = createClickUpTaskData(getTaskData, getUserData, lengthUserData);
      } else {
        getTaskData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("NewTickets").getDataRange().getValues();
        getUserData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("UserConfiguration");
        lengthUserData = getUserData.getLastRow();
        data = createSpreadsheetData(getTaskData, getUserData, lengthUserData);
      }
      return data;
    }


    print() {
      console.log(JSON.stringify(this.get(row)));

      return true;
    }
  }
  return ClickUpTaskData;
})();
if (typeof module !== "undefined") module.exports = ClickUpTaskData;


function createClickupData(getTaskData, newAssign, timeEstimate) {

  return {
    name: getTaskData[0],
    description: getTaskData[1],
    assignees: [newAssign],
    tags: [getTaskData[4]],
    due_date_time: false,
    time_estimate: timeEstimate,
    start_date_time: false,
    notify_all: true,
    parent: null,
    links_to: null,
    check_required_custom_fields: true,
    custom_fields: []
  };
}



function createClickUpTaskData(getTaskData, getUserData, lengthUserData) {
  for (let userData of getUserData.slice(1, lengthUserData)) {
    let newAssign = userData[3];
    for (let taskData of getTaskData.slice(1)) {
      return createClickupData(taskData, newAssign, taskData[2] * 3600000);
    }
  }
}


function createSpreadsheetData(getTaskData, getUserData, lengthUserData) {
  const urlFetchData = new UrlFetchData();

  let clickupDataForTask;

  for (let index = 2; index <= lengthUserData; index++) {
    let newAssign = getUserData.getRange(index, 4).getValue();

    for (let i = 1; i < getTaskData.length; i++) {
      let idx = i + 1;

      let getData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("NewTickets");
      let ticketId = getData.getRange(idx, 6).getValue();

      clickupDataForTask = createClickupData(getTaskData[i], newAssign, getTaskData[i][2] * 3600000);

      if (ticketId == '') {
        let getSystemValue = get_settings();
        let listIdData = arrayListdata.find(f => f.Name == getTaskData[i][3]);
        let listId = listIdData.Id;
        let ticket_details = urlFetchData.fetchData(`https://api.clickup.com/api/v2/list/${listId}/task`, getSystemValue['Clickup Token'], 'post', clickupDataForTask);
        getData.getRange(idx, 6).setValue(ticket_details.id);
        getData.getRange(idx, 7).setValue(ticket_details.url);

        let ticketCreatedDate = new Date(parseInt(ticket_details.date_created))

        let weekNumber = getWeekNumber(ticketCreatedDate);
        let week = weekNumber.toString()
        getData.getRange(idx, 9).setValue(week);
        setValueStatus()
      }
    }
  }

  return clickupDataForTask;
}






function getWeekNumber(dateString) {
  const date = new Date(dateString);
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const daysOffset = firstDayOfYear.getDay() === 0 ? 1 : 8 - firstDayOfYear.getDay();
  const dayOfYear = Math.floor((date - firstDayOfYear) / 86400000) + 1;
  return Math.floor((dayOfYear - daysOffset + 7) / 7);

}

function abc() {
  const sheet1 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Systemconfig");
  const cell = sheet1.getRange("B2").getValue();
  console.log(cell)
  return cell 
}




