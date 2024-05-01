if (typeof require !== 'undefined') {
  MockData = require('./MockData.min.js');
}

let SlackData = (function () {
  const _userData = (
    [
      ["Name", "email", "System", "Project", "Is create user email sent", "is user assigned to a project", "Are tickets assigned", "Is Get Started Email Sent", "Id	Slack Channel (Comma separated)", "Google Meetings Id(Comma separated)"],
      ["Vaibhav Rawat", "vaibhavrawat8888@gmail.com", "Clickup", "OnBoarding", "", "", "", "yes", "61391291", "", ""],
      ["Devendra Choukiker", "choukikerdevendra86@gmail.com", "Clickup", "OnBoardingTwo", "", "", "", "yes", "61404450", "", ""]
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

  let _SlackData = new WeakMap();
  class SlackData {
    constructor() {
      if (mockData) {
        _SlackData.set(this, mockData);
        return this;
      }

    }



    getSlackContent() {
      let getUserData;
      let getSystemData;
      let lengthUserData;

      if (mockData) {
        getUserData = _SlackData.get(this).getData("userData");
        getSystemData = _SlackData.get(this).getData("systemData");
        lengthUserData = getUserData.length;

        for (let index = 1; index <= +lengthUserData; index++) {
          let newUserStartEmailSend = getUserData[index][7];
          let newUserInviteSlack = getUserData[index][9];

          if (newUserInviteSlack !== "yes" && newUserStartEmailSend === "yes") {
            return [getSystemData["Slack Token"], getSystemData["Slack Channel"]];
          }
        }
      } else {
        getUserData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("UserConfiguration");
        lengthUserData = getUserData.getLastRow();
        getSystemData = get_settings();

        handleSlackInvite(getSystemData["Slack Token"], getSystemData["Slack Channel"], getUserData, lengthUserData);
        return [getSystemData["Slack Token"], getSystemData["Slack Channel"]];
      }
    }





    print() {
      console.log(JSON.stringify(this.get(row)));
      return true;
    }
  }
  return SlackData;
})();
if (typeof module !== "undefined") module.exports = SlackData;

function handleSlackInvite(slackToken, slackChannel, userDataSheet, length) {
  const urlFetchData = new UrlFetchData();
  for (let index = 1; index <= length; index++) {
    let newUserEmail = userDataSheet.getRange(index, 2).getValue();
    let newUserStartEmailSend = userDataSheet.getRange(index, 8).getValue();
    let newUserInviteSlack = userDataSheet.getRange(index, 10).getValue();

    if (newUserInviteSlack !== "yes" && newUserStartEmailSend === "yes") {
      let getSlackData = urlFetchData.getslackfetchid(slackToken, newUserEmail, "https://slack.com/api/users.lookupByEmail");
      let payload = {
        channel: slackChannel,
        users: getSlackData,
      };

      urlFetchData.fetchData("https://slack.com/api/conversations.invite", slackToken, "Post", payload);
    }
  }
}
