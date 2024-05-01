let settingsMap = get_settings();
let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
let sheet = spreadsheet.getSheetByName("Get All Tickets");
let clickup_token = settingsMap['Clickup Token']
let clickupSpaceIds = settingsMap['Space Name'].trim().split(',')
let clickupFolderIds = settingsMap['Folder Name'].trim().split(',')
let clickupListIds = settingsMap['List Name'].trim().split(',')
let taskIds = []

function clcikupprojectdetails() {
  const teamId = getTeamId();
  const spaceIdArray = getSpaceIds(teamId);
  const folderIdArray = getFolderIds(spaceIdArray);
  const listIdsArray = getListIds(folderIdArray);
  const projectid = getProjectId();

  const overallfields = {
    'spaceIdsArray': spaceIdArray,
    'folderIdsArray': folderIdArray,
    'listIdsArray': listIdsArray,
    'projectid': projectid,
    'countapirequest': spaceIdArray.length + folderIdArray.length + listIdsArray.length + 3
  };

  console.log(overallfields);
  return overallfields;
}

function getTeamId() {
  const getTeamApi = 'https://api.clickup.com/api/v2/team';
  const jsonResponses = fetch_data_for_clickup(getTeamApi, 'GET', '');
  let teamId;

  for (const team of jsonResponses.teams) {
    teamId = team.id;
  }

  return teamId;
}

function getSpaceIds(teamId) {
  const spacesApi = `https://api.clickup.com/api/v2/team/${teamId}/space`;
  const jsonResponsesSpaces = fetch_data_for_clickup(spacesApi, 'GET', '');
  const spaceIdArray = [];

  for (const clickupSpaceId of clickupSpaceIds) {
    for (const space of jsonResponsesSpaces.spaces) {
      if (space.name === clickupSpaceId) {
        spaceIdArray.push(space.id);
      }
    }
  }

  return spaceIdArray;
}

function getFolderIds(spaceIdArray) {
  const folderIdsArray = [];

  for (const spaceId of spaceIdArray) {
    const getFolderIdsApi = `https://api.clickup.com/api/v2/space/${spaceId}/folder`;
    const getFolderIdsResp = fetch_data_for_clickup(getFolderIdsApi, 'GET', '');

    for (const clickupFolderId of clickupFolderIds) {
      for (const folder of getFolderIdsResp.folders) {
        if (folder.name === clickupFolderId) {
          folderIdsArray.push(folder.id);
        }
      }
    }
  }

  return folderIdsArray;
}

function getListIds(folderIdArray) {
  const listIdsArray = [];

  for (const folderId of folderIdArray) {
    const getListApi = `https://api.clickup.com/api/v2/folder/${folderId}/list`;
    const clickupList = fetch_data_for_clickup(getListApi, 'GET', '');

    for (const clickupListId of clickupListIds) {
      for (const list of clickupList.lists) {
        if (list.name === clickupListId) {
          listIdsArray.push(list.id);
        }
      }
    }
  }

  return listIdsArray;
}

function getProjectId() {
  const getProjectApi = 'https://api.clickup.com/api/v2/team';
  const jsonResponses = fetch_data_for_clickup(getProjectApi, 'GET', '');
  let projectid;

  for (const team of jsonResponses.teams) {
    projectid = team.id;
  }

  return projectid;
}




function fetch_data_for_clickup(url, type, data) {
  let header_options = {
    "method": type,
    "headers": {
      "Authorization": clickup_token
    }
  }
  if (type != 'GET') {
    header_options['payload'] = JSON.stringify(data)
    header_options['contentType'] = 'application/json'
  }

  let resp = UrlFetchApp.fetch(url, header_options);

  return JSON.parse(resp.getContentText());

}



let get_ticket_api;

function getData() {
  let get_listIds = clcikupprojectdetails();
  let tasks_data = [];

  for (let listId of get_listIds.listIdsArray) {
    let count = 0;
    let isEmpty = true;
    let countAdd = [];
    while (isEmpty) {
      let get_ticket_api = `https://api.clickup.com/api/v2/list/${listId}/task?subtasks=true&include_closed=true&page=${count}`;

      let tasksjsonResponses = fetch_data_for_clickup(get_ticket_api, 'GET', '');
      if (tasksjsonResponses.tasks.length != 0) {
        let temp = { "countAdd": countAdd, "countApirequest": get_listIds.countapirequest, "projectid": get_listIds.projectid, "data": tasksjsonResponses.tasks };
        tasks_data.push(temp);
      } else {
        isEmpty = false;
      }
      count = count + 1;
    }
  }
  console.log(tasks_data);
  return tasks_data;
}


