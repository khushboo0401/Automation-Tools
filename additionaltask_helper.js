if (typeof require !== 'undefined') {
  MockData = require('./MockData.min.js');
}

let AdditionalTaskData = (function () {
  const _userData = (
    [

      ["Name", "email", "System", "Project", "Is create user email sent", "is user assigned to a project", "Are tickets assigned", "Is Get Started Email Sent", "Id	Slack Channel (Comma separated)", "Google Meetings Id(Comma separated)", "Addtional tickets assigned"],
      ["Vaibhav Rawat", "vaibhavrawat8888@gmail.com", "Clickup", "Testing", "", "", "", "", "61391291", "", "", ""],
      ["Devendra Choukiker", "choukikerdevendra86@gmail.com", "Clickup", "OnBoardingTwo", "", "", "", "", "61404450", "", "", ""]
    ]
  )
  const _taskData = ([["Task Name", "Task Description", "System", "Project", "Tags"],
  ["Workflow procedures", "Define how a task should be done using any project management system e.g. Work Flow https://docs.google.com/document/d/1r6aUr47w5uvC7NLU4dJrBgPlWu4YSom6/edit", "Clickup", "Testing", "Day 17"], ["Workflow procedures", "Define how a task should be done using any project management system e.g. Work Flow https://docs.google.com/document/d/1r6aUr47w5uvC7NLU4dJrBgPlWu4YSom6/edit", "Clickup", "Testing", "Day 18"]])

  let mockData;
  if (typeof SpreadsheetApp === 'undefined') {
    mockData = new MockData().addData("userData", _userData);
    mockData.addData("taskData", _taskData);
  }
  let _clickUpTaskHelper = new WeakMap();
  class AdditionalTaskData {
    constructor() {
      if (mockData) {
        _clickUpTaskHelper.set(this, mockData);
        return this;
      }
    }


    getCreateTaskHelper() {
      let data = [];

      if (mockData) {
        const getTaskData = _clickUpTaskHelper.get(this).getData("taskData");
        const getUserData = _clickUpTaskHelper.get(this).getData("userData");
        let data = [];
        let lengthUserData = getUserData.length;
        for (let index = 1; index < +lengthUserData; index++) {
          let newUserProject = getUserData[index][3];
          let newAssign = getUserData[index][8];
          let newUserAdditionalTask = getUserData[index][11];

          checkUserProject(getTaskData, newUserProject, newUserAdditionalTask, newAssign, data);
        }
        return data
      }
      else {
        data = getSheetData();
      }

      return data;
    }



    print() {
      console.log(JSON.stringify(this.get(row)));
      return true;
    }
  }
  return AdditionalTaskData;
})();
if (typeof module !== "undefined") module.exports = AdditionalTaskData;


function checkUserProject(getTaskData, newUserProject, newUserAdditionalTask, newAssign, data) {
  for (let i = 1; i < +getTaskData.length; i++) {
    if (getTaskData[i][3] === newUserProject && newUserAdditionalTask !== "yes") {
      let tagArray = getTaskData[i][4].split(",");

      tagArray.forEach(tag => {
        let clickupDataForTask = getClickUpDataForTask(getTaskData[i], newAssign, tag);
        data.push(clickupDataForTask);
      });
    }
  }
}

function getClickUpDataForTask(taskData, assignee, tag) {
  return {
    name: taskData[0],
    description: taskData[1],
    assignees: [assignee],
    tags: [tag],
    due_date_time: false,
    start_date_time: false,
    notify_all: true,
    parent: null,
    links_to: null,
    check_required_custom_fields: true,
    custom_fields: []
  };
}


function getSheetData() {
  let getTaskData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Additional Tasks").getDataRange().getValues();
  let getUserData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("UserConfiguration");
  let dataTask = [];
  let lengthUserData = getUserData.getLastRow();

  for (let index = 1; index <= +lengthUserData; index++) {
    let newUserProject = getUserData.getRange(index, 4).getValue();
    let newAssign = getUserData.getRange(index, 9).getValue();
    let newUserAdditionalTask = getUserData.getRange(index, 12).getValue();

    for (let i = 1; i < +getTaskData.length; i++) {
      if (getTaskData[i][3] === newUserProject && newUserAdditionalTask !== "yes") {
        let tagArray = getTaskData[i][4].split(",");

        tagArray.forEach(tag => {
          clickupDataForTask = getClickUpDataForTask(getTaskData[i], newAssign, tag);
          dataTask.push(clickupDataForTask);
          getListId(index);
        });

        getUserData.getRange(index, 12).setValue("yes");
      }
    }
  }
  return dataTask;
}
