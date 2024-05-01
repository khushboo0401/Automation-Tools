let clickupDataForTask
let clickupTeamData
let arrayListdata = []


function getListId(index) {
  const urlFetchData = new UrlFetchData();
  let getUserData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("UserConfiguration");
  let newUserProject = getUserData.getRange(index, 4).getValue();
  let getSystemValue = get_settings()
  let listIdData = arrayListdata.find(f => f.Name == newUserProject)
  let listId = listIdData.Id
  urlFetchData.fetchData(`https://api.clickup.com/api/v2/list/${listId}/task`, getSystemValue['Clickup Token'], 'post', clickupDataForTask)

}


function getListData() {
  const urlFetchData = new UrlFetchData();
  let getSystemValue = get_settings()
  let clickupTeamsData = urlFetchData.fetchData(`https://api.clickup.com/api/v2/team`, getSystemValue['Clickup Token'], 'get')
  let getTeamData = (clickupTeamsData.teams.find(f => f.name === getSystemValue['Team Name']))
  let teamId = getTeamData.id
  let getSpacesData = urlFetchData.fetchData(`https://api.clickup.com/api/v2/team/${teamId}/space`, getSystemValue['Clickup Token'], 'get')
  let spaceArray = getSpacesData.spaces.find(f => f.name === getSystemValue['Space Name'])
  let spaceId = (spaceArray.id)
  let getFoldersData = urlFetchData.fetchData(`https://api.clickup.com/api/v2/space/${spaceId}/folder`, getSystemValue['Clickup Token'], 'get')
  let folderArray = getFoldersData.folders.find(f => f.name ===  getSystemValue['Folder Name'])
  let folderId = (folderArray.id)
  let getListsData = urlFetchData.fetchData(`https://api.clickup.com/api/v2/folder/${folderId}/list`, getSystemValue['Clickup Token'], 'get')
  let lenOfListData = (getListsData.lists.length)
  for (let i = 0; i < lenOfListData; i++) {
    let json = { Name: getListsData.lists[i].name, Id: getListsData.lists[i].id };
    arrayListdata.push(json)
  }
    return arrayListdata

}


function getUserId() {
  const urlFetchData = new UrlFetchData();
  let getSystemValue = get_settings()
  let arrayForTeam = [];
  let clickupTeamsData = urlFetchData.fetchData(`https://api.clickup.com/api/v2/team`, getSystemValue['Clickup Token'], 'get')
  let getTeamData = (clickupTeamsData.teams.find(f => f.name === getSystemValue['Team Name']))
  for (let i = 0; i < +getTeamData.members.length; i++) {
    arrayForTeam.push({
      _userName: getTeamData.members[i].user.username,
      _userId: getTeamData.members[i].user.id
    });
  }
  clickupTeamData = arrayForTeam
 console.log(clickupTeamData)
}









