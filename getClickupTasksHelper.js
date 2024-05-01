
if (typeof require !== 'undefined') {
  MockData = require('./MockData.min.js');
}

let GetClickupTasks = (function () {
  const _userData =
    [

      ['86786ke4p',
        'Create a update video for the feature added in the clickup . ',
        'Create a update video for the feature added in the clickup .',
        ['Vaibhav Rawat'],
        '1',
        'N/A',
        'N/A',
        'to do',
        'N/A',
        'N/A',
        'https://app.clickup.com/t/86786ke4p',
        'Training On Boarding',
        '25',
        'Sat Jun 24 2023 13:16:02 GMT+0530 (India Standard Time)']
    ]


  let mockData;
  if (typeof SpreadsheetApp === 'undefined') {
    mockData = new MockData().addData("userData", _userData);
  }
  let _getClickupTasks = new WeakMap();
  class GetClickupTasks {
    constructor() {
      if (mockData) {
        _getClickupTasks.set(this, mockData);
        return this;
      }
    }



    clickup_get_tasks() {
      let list = [];

      if (mockData) {
        list = _getClickupTasks.get(this).getData("userData");
      } else {
        const sheet1 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("UserConfiguration");
        const cell = sheet1.getRange("D2");
        const value = cell.getValue();
        console.log(value);
        let overalldata = getData();



        for (const overalldataItem of overalldata) {


          let data = overalldataItem.data;

          for (const taskData of data) {
            let taskId = taskData.id;
            taskIds.push(taskId);

            let time = taskData.start_date;
            let start_date = taskData.start_date != null ? new Date(parseInt(time)) : "N/A";
            let duration;
            let difference = taskData.time_estimate / 3600000;
            duration = +difference;
            let due_date = null;
            if (taskData.due_date != null) {
              due_date = new Date(parseInt(taskData.due_date));
            } else {
              due_date = "N/A";
            }

            let listname = taskData.list.name;

            let description = taskData.description || 'N/A';
            description = description.slice(0, 1000).replace(/\s/g, ' ');

            let assignees = taskData.assignees.map(item => item.username);
            let ticketCreatedDate = new Date(parseInt(taskData.date_created));

            let weekNumber = getWeekNumber(ticketCreatedDate);

            let completedDate = null;
            if (taskData.date_done != null) {
              completedDate = new Date(parseInt(taskData.date_done));
            }
            else {
              completedDate = "N/A"
            }
            let actualTime = isNaN((completedDate - start_date) / (1000 * 60 * 60)) ? 'N/A' : (completedDate - start_date) / (1000 * 60 * 60);



            let temp = [taskId, taskData.name, description, assignees, duration, start_date, due_date, taskData.status.status, completedDate, actualTime, taskData.url, listname, weekNumber, ticketCreatedDate];
            let filteredAssignees = taskData.assignees.filter(item => item.id === value);
            if (filteredAssignees.length > 0) {
              list.push(temp)
            }
          }
        }
      }

      list.sort((a, b) => b[13] - a[13]);
      return list;
    }




    print() {
      console.log(JSON.stringify(this.get(row)));
      return true;
    }
  }
  return GetClickupTasks;
})();
if (typeof module !== "undefined") module.exports = GetClickupTasks;




