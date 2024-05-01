let clickupDataForTask
let clickupTeamData
let arrayListdata = []



function getListData() {
  const urlFetchData = new UrlFetchData();
  let getSystemValue = get_settings();
  let clickupTeamsData = urlFetchData.fetchData(`https://api.clickup.com/api/v2/team`, getSystemValue['Clickup Token'], 'get');
  let getTeamData = clickupTeamsData.teams.find(f => f.name === getSystemValue['Team Name']);
    console.log(getTeamData)

  let teamId = getTeamData.id;
  console.log(teamId)

  let spaceNames = getSystemValue['Space Name'].split(',');
  for (let spaceName of spaceNames) {
    let getSpacesData = urlFetchData.fetchData(`https://api.clickup.com/api/v2/team/${teamId}/space`, getSystemValue['Clickup Token'], 'get');
    let spaceArray = getSpacesData.spaces.find(f => f.name === spaceName.trim());

    if (!spaceArray) {
      continue;
    }
    let spaceId = spaceArray.id;
    console.log(spaceId)

    let folderNames = getSystemValue['Folder Name'].split(',');
    for (let folderName of folderNames) {
      let getFoldersData = urlFetchData.fetchData(`https://api.clickup.com/api/v2/space/${spaceId}/folder`, getSystemValue['Clickup Token'], 'get');
      let folderArray = getFoldersData.folders.find(f => f.name === folderName.trim());

      if (!folderArray) {
        continue;
      }

      let folderId = folderArray.id;

      let getListsData = urlFetchData.fetchData(`https://api.clickup.com/api/v2/folder/${folderId}/list`, getSystemValue['Clickup Token'], 'get');

      for (let listData of getListsData.lists) {
        let json = { Name: listData.name, Id: listData.id };
        arrayListdata.push(json);
      }
    }
  }
  console.log(arrayListdata)
  return arrayListdata;
}






function assigneId() {
  let getUserData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("UserConfiguration")
  let lengthUserData = getUserData.getLastRow();
  const urlFetchData = new UrlFetchData();
  let getSystemValue = get_settings()
  let arrayForTeam = [];
  let clickupTeamsData = urlFetchData.fetchData(`https://api.clickup.com/api/v2/team`, getSystemValue['Clickup Token'], 'get')

  let getTeamData = (clickupTeamsData.teams.find(f => f.name === getSystemValue['Team Name']))
  for (let i = 0; i < +getTeamData.members.length; i++) {
    arrayForTeam.push({
      _email: getTeamData.members[i].user.email,
      _userId: getTeamData.members[i].user.id
    });
  }
  console.log(arrayForTeam)
  for (let i = 2; i <= lengthUserData; i++) {
    let newUserEmail = getUserData.getRange(i, 2).getValue();
    let newUserAssignId = getUserData.getRange(i, 4).getValue();

    let userArray = (arrayForTeam.find(f => f._email === newUserEmail))
    getUserData.getRange(i, 4).setValue(userArray._userId)
  }

}


function getTaskTimeInStatus() {
  const query = 'custom_task_ids=true&team_id=43312857';
  const taskId = '86786ke4p';
  const apiKey = 'pk_61433184_A7UUHKTJ4A7AP2ACAY8TBKZ3I821LWMB';

  const url = `https://api.clickup.com/api/v2/task/${taskId}/time_in_status?${query}`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiKey
    }
  };

  const response = UrlFetchApp.fetch(url, options);
  const data = JSON.parse(response.getContentText());
  console.log(data);
}










