if (typeof require !== 'undefined') {
  MockData = require('./MockData.min.js');
}

let ClickUpTaskData = (function () {
  const _userData = (
    [

      ["Name", "email", "System", "Project", "Is create user email sent", "is user assigned to a project", "Are tickets assigned", "Is Get Started Email Sent", "Id	Slack Channel (Comma separated)", "Google Meetings Id(Comma separated)"],
      ["Vaibhav Rawat", "vaibhavrawat8888@gmail.com", "Clickup", "OnBoarding", "", "yes", "", "", "61391291", "", ""],
      ["Devendra Choukiker", "choukikerdevendra86@gmail.com", "Clickup", "OnBoardingTwo", "", "yes", "", "", "61404450", "", ""]
    ]
  )
  const _taskData = ([["Summary", "Description", "Estimate", "System", "Project"],
  ["Terraform Fundamentals: Why we use Terraform and not Chef, Puppet, Ansible, Pulumi, or CloudFormation?", "In the intro to the series, we discussed why every company should be using infrastructure-as-code (IAC). In this post, we’re going to discuss why we picked Terraform as our IAC tool of choice." + "https://blog.gruntwork.io/why-we-use-terraform-and-not-chef-puppet-ansible-saltstack-or-cloudformation-7989dad2865c#.63ls7fpkq", 8, "Clickup", "OnBoarding"],
  ["Terraform Fundamentals: An Introduction to Terraform, Learn the basics of Terraform in this step-by-step tutorial of how to deploy a cluster of web servers and a load balancer on AWS", "https://blog.gruntwork.io/an-introduction-to-terraform-f17df9c6d180", "8", "Clickup", "OnBoardingTwo"],
  ["Terraform Fundamentals: How to manage Terraform state, A guide to file layout, isolation, and locking for Terraform projects", "https://blog.gruntwork.io/how-to-manage-terraform-state-28f5697e68fa#.r6xdvtxqe", "8", "Clickup", "OnBoardingTwo"],
  ["Terraform Fundamentals: How to create reusable infrastructure with Terraform modules my work, In this post, you’ll learn how to create reusable infrastructure with Terraform modules.", "https://blog.gruntwork.io/how-to-create-reusable-infrastructure-with-terraform-modules-25526d65f73d", "8", "Clickup", "OnBoarding"]])

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
  for (let index = 1; index < lengthUserData; index++) {
    let newUserProject = getUserData[index][3];
    let newAssign = getUserData[index][8];
    let newUsersys = getUserData[index][5];
    let newUserTicketAssign = getUserData[index][6];
    if (newUsersys === "yes" && newUserTicketAssign !== "yes") {
      for (let i = 1; i < +getTaskData.length; i++) {
        if (getTaskData[i][4] === newUserProject) {
          let clickupDataForTask = createClickupData(getTaskData[i], newAssign, getTaskData[i][2] * 3600000);
          return clickupDataForTask;
        }
      }
    }
  }
}

function createSpreadsheetData(getTaskData, getUserData, lengthUserData) {
  for (let index = 1; index <= lengthUserData; index++) {
    let newUserProject = getUserData.getRange(index, 4).getValue();
    let newAssign = getUserData.getRange(index, 9).getValue();
    let newUsersys = getUserData.getRange(index, 6).getValue();
    let newUserTicketAssign = getUserData.getRange(index, 7).getValue();
    if (newUsersys === "yes" && newUserTicketAssign !== "yes") {
      for (let i = 1; i < +getTaskData.length; i++) {
        if (getTaskData[i][4] === newUserProject) {
          clickupDataForTask = createClickupData(getTaskData[i], newAssign, getTaskData[i][2] * 3600000);
          getListId(index);
        }
      }
      return clickupDataForTask;

    }
  }
}
