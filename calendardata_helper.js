if (typeof require !== 'undefined') {
  MockData = require('./MockData.min.js');
}

let CalendarData = (function () {
  const _userData = (
    [
      ["Name", "email", "System", "Project", "Is create user email sent", "is user assigned to a project", "Are tickets assigned", "Is Get Started Email Sent", "Id	Slack Channel (Comma separated)", "Google Meetings Id(Comma separated)"],
      ["Vaibhav Rawat", "vaibhavrawat8888@gmail.com", "Clickup", "OnBoarding", "", "", "", "", "61391291", "yes", ""],
      ["Devendra Choukiker", "choukikerdevendra86@gmail.com", "Clickup", "OnBoardingTwo", "", "", "", "", "61404450", "yes", ""]
    ]
  )
  const _systemData = (
    {
      'Key': 'Value',
      'Admin': 'vaibhav.rawat@madgicaltechdom.com',
      'Zoho PortalId': '134438000000025725',
      'Zoho Devops Training': '134438000000027045',
      'Zoho Data Engineering Training': '134438000000028015',
      'Admin Name': 'Veb',
      'Slack Token': 'Bearer xoxb-4735780073537-4815008853524-lCRsdk9r0DJpJTSroBSDoYen',
      'Slack Channel': 'C04PZ01U5C4',
      'Clickup Workspace': '43312857',
      'Clickup OnBoarding': '900200102875',
      'Clickup Token': 'pk_61433184_A7UUHKTJ4A7AP2ACAY8TBKZ3I821LWMB',
      'calenderId': 'vaibhav.rawat@madgicaltechdom.com',
      'NewTicket Team Name': 'Productivity Training',
      'NewTicket Space Name': 'Playground',
      'NewTicket Folder Name': 'JumpStart',
      'Additional Task Team Name': 'Productivity Training',
      'Additional Task Space Name': 'Playground',
      'Additional Task Folder Name': 'JumpStart',
      'Cal Start Date': 'Wed Jan 10 2024 00:00:00 GMT+0530 (India Standard Time)',
      'Cal End Date': 'Wed Feb 28 2024 00:00:00 GMT+0530 (India Standard Time)',
    }
  )




  let mockData;
  if (typeof SpreadsheetApp === 'undefined') {
    mockData = new MockData().addData("userData", _userData);
    mockData.addData("systemData", _systemData);
  }

  let _CalendarData = new WeakMap();
  class CalendarData {
    constructor() {
      if (mockData) {
        _CalendarData.set(this, mockData);
        return this;
      }
    }



    getCalendarContent() {
      let getUserData;
      let getSystemData;
      let lengthUserData;

      if (mockData) {
        getUserData = _CalendarData.get(this).getData("userData");
        getSystemData = _CalendarData.get(this).getData("systemData");
        lengthUserData = getUserData.length;

        for (let index = 1; index < lengthUserData; index++) {
          return [getSystemData["calenderId"]];

        }
      } else {
        getUserData = SpreadsheetApp.getActiveSpreadsheet()
          .getSheetByName("UserConfiguration")
          .getDataRange()
          .getValues();
        getSystemData = get_settings();
        lengthUserData = getUserData.length;
      }

      for (let index = 1; index < lengthUserData; index++) {
        let newUserEmail = getUserData[index][1];
        let newUserInviteSlack = getUserData[index][9];
        let newUserAddCalendar = getUserData[index][10];

        if (newUserInviteSlack === "yes" && newUserAddCalendar !== "yes") {
          let calendarId = getSystemData["calenderId"];
          let start_Date = new Date(getSystemData["Cal Start Date"]);
          let end_Date = new Date(getSystemData["Cal End Date"]);
          let eventName = getSystemData["Event Name"]

          inviteUserToEvent(calendarId, eventName, newUserEmail,start_Date,end_Date)
        }
      }

      return [getSystemData["calenderId"]];
    }


    print() {
      console.log(JSON.stringify(this.get(row)));
      return true;
    }
  }
  return CalendarData;
})();
if (typeof module !== "undefined") module.exports = CalendarData;





function inviteUserToEvent(calendarId, eventName, newUserEmail,start_Date,end_Date) {
  let calendar = CalendarApp.getCalendarById(calendarId);

  if (calendar === null) {
    console.log("Calendar not found", calendarId);
    return;
  }

  let events = calendar.getEvents(start_Date, end_Date, {search: eventName});
  
  if(events.length === 0) {
    console.log("No events found with name", eventName);
    return;
  }

  console.log(events.length)
  for (let i = 0; i < events.length; i++) {
    events[i].addGuest(newUserEmail);
  }
}



