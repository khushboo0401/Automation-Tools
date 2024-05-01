// if (typeof require !== 'undefined') {
//   UnitTestingApp = require('./UnitTestingApp.min.js');
//   GetClickupTasks = require('./getClickupTasksHelper.js')
// }

// function runTests() {
//   const test = new UnitTestingApp();
//   test.enable();
//   test.clearConsole();
//   const getClickupTasks = new GetClickupTasks();


//   test.runInGas(false);
//   test.printHeader('LOCAL TESTS');

//   let ticketContent = getClickupTasks.clickup_get_tasks();
//   console.log(ticketContent)
//   test.assert(() => ticketContent[0][0] === '86786ke4p', 'Multiple rows ticket data of Clickup')
//   test.assert(() => ticketContent[0][1] === 'Create a update video for the feature added in the clickup . ', 'Multiple rows ticket data of Clickup')
//   test.assert(() => ticketContent[0][2] === 'Create a update video for the feature added in the clickup .', 'Multiple rows ticket data of Clickup')
//   test.assert(() => ticketContent[0][3][0] === 'Vaibhav Rawat', 'Multiple rows ticket data of Clickup')
//   test.assert(() => ticketContent[0][4] === '1', 'Multiple rows ticket data of Clickup')
//   test.assert(() => ticketContent[0][5] === 'N/A', 'Multiple rows ticket data of Clickup')
//   test.assert(() => ticketContent[0][6] === 'N/A', 'Multiple rows ticket data of Clickup')
//   test.assert(() => ticketContent[0][7] === 'to do', 'Multiple rows ticket data of Clickup')
//   test.assert(() => ticketContent[0][8] === 'N/A', 'Multiple rows ticket data of Clickup')
//   test.assert(() => ticketContent[0][9] === 'N/A', 'Multiple rows ticket data of Clickup')
//   test.assert(() => ticketContent[0][10] === 'https://app.clickup.com/t/86786ke4p', 'Multiple rows ticket data of Clickup')
//   test.assert(() => ticketContent[0][11] === 'Training On Boarding', 'Multiple rows ticket data of Clickup')
//   test.assert(() => ticketContent[0][12] === '25', 'Multiple rows ticket data of Clickup')
//   test.assert(() => ticketContent[0][13] ===  'Sat Jun 24 2023 13:16:02 GMT+0530 (India Standard Time)', 'Multiple rows ticket data of Clickup')

//   test.runInGas(true);
//   test.printHeader('ONLINE TESTS');
//   test.assert(() => ticketContent[0][0] === '86786ke4p', 'Multiple rows ticket data of Clickup')
//   test.assert(() => ticketContent[0][1] === 'Create a update video for the feature added in the clickup . ', 'Multiple rows ticket data of Clickup')
//   test.assert(() => ticketContent[0][2] === 'Create a update video for the feature added in the clickup .', 'Multiple rows ticket data of Clickup')
//   test.assert(() => ticketContent[0][3][0] === 'Vaibhav Rawat', 'Multiple rows ticket data of Clickup')
//   test.assert(() => ticketContent[0][4] === 1, 'Multiple rows ticket data of Clickup')
//   test.assert(() => ticketContent[0][5] === 'N/A', 'Multiple rows ticket data of Clickup')
//   test.assert(() => ticketContent[0][6] === 'N/A', 'Multiple rows ticket data of Clickup')
//   test.assert(() => ticketContent[0][7] === 'to do', 'Multiple rows ticket data of Clickup')
//   test.assert(() => ticketContent[0][8] === 'N/A', 'Multiple rows ticket data of Clickup')
//   test.assert(() => ticketContent[0][9] === 'N/A', 'Multiple rows ticket data of Clickup')
//   test.assert(() => ticketContent[0][10] === 'https://app.clickup.com/t/86786ke4p', 'Multiple rows ticket data of Clickup')
//   test.assert(() => ticketContent[0][11] === 'Training On Boarding', 'Multiple rows ticket data of Clickup')
//   test.assert(() => ticketContent[0][12] === 25, 'Multiple rows ticket data of Clickup')
//   test.assert(() => ticketContent[0][13].toString() ===  'Sat Jun 24 2023 13:16:02 GMT+0530 (India Standard Time)', 'Multiple rows ticket data of Clickup')
// }

// (function () {
//   const IS_GAS_ENV = typeof ScriptApp !== 'undefined';
//   if (!IS_GAS_ENV) runTests();
// })();
