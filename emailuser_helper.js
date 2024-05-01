if (typeof require !== 'undefined') {
  MockData = require('./MockData.min.js');


}

let EmailUserData = (function () {
  const _userData = (
    [
      ["Name", "email", "System", "Project", "Is create user email sent", "is user assigned to a project", "Are tickets assigned", "Is Get Started Email Sent", "Id	Slack Channel (Comma separated)", "Google Meetings Id(Comma separated)"],
      ["Vaibhav Rawat", "vaibhavrawat8888@gmail.com", "Clickup", "OnBoarding", "", "", "yes", "", "61391291", "", ""],
      ["Devendra Choukiker", "choukikerdevendra86@gmail.com", "Clickup", "OnBoardingTwo", "", "", "yes", "", "61404450", "", ""]
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

  const _emailTemplateData = ([
    ["Template Name", "Subject", "Body"],
    ["On Boarding",
      "{Name} : Offer Letter from Madgical Techdom (OPC) Pvt Ltd",
      "Hi {Name},\n\nWelcome {Name}! We\'re proud to have you become part of our team. We look forward to learning and growing alongside you for the years to come. You shall be a part of DevOps training and the training duration is ~ 12 weeks.\n\nWe shall be assigning DevOps training tickets to you and you should start working on them whenever you start working with us.\n\nYou should read our document(https://docs.google.com/document/d/1r6aUr47w5uvC7NLU4dJrBgPlWu4YSom6/edit) for the onboarding process and watch the videos to get familiar with the system. We shall invite you to the slack channel and our weekly meetings.\n\nLet me know if you have any questions.\n\nBest Regards,\n{Admin Name}"
    ],
    ["New User",
      "Please create a user with {name} {email}",
      "This guy has joined us so please create a user in {System}"
    ]
  ])



  let mockData;
  if (typeof SpreadsheetApp === 'undefined') {
    mockData = new MockData().addData("userData", _userData);
    mockData.addData("systemData", _systemData);
    mockData.addData("emailTemplateData", _emailTemplateData);

  }

  let _EmailData = new WeakMap();
  class EmailUserData {
    constructor() {
      if (mockData) {
        _EmailData.set(this, mockData);
        return this;
      }

    }



    getUserEmailContent() {
      let getUserData;
      let lengthUserData
      let emailTemplate;
      let getSystemData
      if (mockData) {
        getUserData = _EmailData.get(this).getData("userData");
        getSystemData = _EmailData.get(this).getData("systemData");
        emailTemplate = _EmailData.get(this).getData("emailTemplateData")
        lengthUserData = getUserData.length;
      }

      else {

        getUserData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("UserConfiguration").getDataRange().getValues();
        emailTemplate = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Email").getDataRange().getValues();
        lengthUserData = getUserData.length
        getSystemData = get_settings();



      }


      for (let index = 1; index < lengthUserData; index++) {
        let newUserEmail = getUserData[index][1]
        let newUserName = getUserData[index][0]
        let newUserTicketAssign = getUserData[index][6]
        let newUserStartEmailSend = getUserData[index][7]

        if (newUserStartEmailSend !== "yes" && newUserTicketAssign == "yes") {
          let newEmail = newUserEmail;
          let textMsg = emailTemplate[1][2]
          textMsg = textMsg.replace(/{Name}/g, newUserName).replace(/{Admin Name}/g, getSystemData['Admin Name']);
          let textSub = emailTemplate[1][1]
          textSub = textSub.replace(/{Name}/g, newUserName);
          return ({ newEmail, textSub, textMsg })
        }

      }

    }

    print() {
      console.log(JSON.stringify(this.get(row)));
      return true;
    }
  }
  return EmailUserData;
})();
if (typeof module !== "undefined") module.exports = EmailUserData;
