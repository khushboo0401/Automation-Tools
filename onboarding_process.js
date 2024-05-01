
function onboarding() {
  let getUserData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("UserConfiguration")
  let projectValues = getUniqueProjectValues();
  let lengthUserData = getUserData.getLastRow();
  getListData()

  for (let i = 2; i <= lengthUserData; i++) {
    let index = i
    let newUserProject = getUserData.getRange(i, 4).getValue();
    let newUserAdditionalTask = getUserData.getRange(i, 12).getValue();
    let newUsersys = getUserData.getRange(index, 6).getValue();
    let newUserTicketAssign = getUserData.getRange(index, 7).getValue();
    let newUserStartEmailSend = getUserData.getRange(index, 8).getValue();
    let newUserAddCalendar = getUserData.getRange(index, 11).getValue();
    let newUserInviteSlack = getUserData.getRange(index, 10).getValue();
    let newUserStatusAdminEmail = getUserData.getRange(index, 5).getValue();
    let newUserAssignId = getUserData.getRange(index, 9).getValue();



    if (projectValues.includes(newUserProject) && newUserAdditionalTask !== "yes" && newUserAssignId !== "") {
      const additionalTaskHelper = new AdditionalTaskData();
      additionalTaskHelper.getCreateTaskHelper()
    }


    if (newUserStartEmailSend !== "yes" && newUserTicketAssign == "yes") {
      const emailUserHelper = new EmailUserData();
      let emailData = emailUserHelper.getUserEmailContent()
      MailApp.sendEmail(emailData['newEmail'], emailData['textSub'], emailData['textMsg'])
      getUserData.getRange(index, 8).setValue("yes")
    }

    else if (newUserInviteSlack !== "yes" && newUserStartEmailSend === "yes") {
      const slackData = new SlackData();
      slackData.getSlackContent()
      getUserData.getRange(index, 10).setValue("yes")

    }

    else if (newUsersys === "yes" && newUserTicketAssign !== "yes") {
      const clickUpTaskData = new ClickUpTaskData();
      clickUpTaskData.getCreateTaskHelper();
      getUserData.getRange(index, 7).setValue("yes")

    }

    else if (newUserInviteSlack === "yes" && newUserAddCalendar !== "yes") {
      const calendarData = new CalendarData();
      calendarData.getCalendarContent();
      getUserData.getRange(index, 11).setValue("yes")

    }
    else if (newUserStatusAdminEmail !== "yes" && !projectValues.includes(newUserProject) && newUserAssignId == "") {
      const emailAdminHelper = new EmailAdminData();
      let emailData = emailAdminHelper.getAdminEmailContent()
      MailApp.sendEmail(emailData['adminEmail'], emailData['textSub'], emailData['textMsg'])
      getUserData.getRange(index, 5).setValue("yes")

    }
  }
}
