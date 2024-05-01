if (typeof require !== 'undefined') {
  MockData = require('./MockData.min.js');
}

let GetStatus = (function () {
  const _statusData =
    [
      [ 'done', 'to do', 'done', 'done' ]
    ]


  let mockData;
  if (typeof SpreadsheetApp === 'undefined') {
    mockData = new MockData().addData("statusData", _statusData);
  }
  let _getStatus = new WeakMap();
  class GetStatus {
    constructor() {
      if (mockData) {
        _getStatus.set(this, mockData);
        return this;
      }
    }

    getTicketStatus() {
      let ticketStatuses = [];

      if (mockData) {
        ticketStatuses = _getStatus.get(this).getData("statusData");
      } else {
        const urlFetchData = new UrlFetchData();
        let getSystemValue = get_settings();
        let taskIds = getTaskIds();
        for (let taskId of taskIds) {

          let ticketUrl = `https://api.clickup.com/api/v2/task/${taskId}`;
          let ticketData;

          try {
            ticketData = urlFetchData.fetchData(ticketUrl, getSystemValue['Clickup Token'], 'get');
            let ticketStatus = ticketData.status;
            ticketStatuses.push(ticketStatus.status);
          } catch (error) {
            ticketStatuses.push('Task not found');
          }
        }


      }
      return ticketStatuses;
    }


    print() {
      console.log(JSON.stringify(this.get(row)));
      return true;
    }
  }
  return GetStatus;
})();
if (typeof module !== "undefined") module.exports = GetStatus;














