// if (typeof require !== 'undefined') {
//     UnitTestingApp = require('./UnitTestingApp.min.js');
//     GetStatus = require('./getTaskStatus_helper.js')
// }

// function runTests() {
//     const test = new UnitTestingApp();
//     test.enable();
//     test.clearConsole();
//     const getStatus = new GetStatus();


//     test.runInGas(false);
//     test.printHeader('LOCAL TESTS');

//     let statusContent = getStatus.getTicketStatus();
    
//     test.assert(() => statusContent[0][0] === 'done', 'Multiple rows status data of clickup')
//     test.assert(() => statusContent[0][1] === 'to do', 'Multiple rows status data of clickup')
//     test.assert(() => statusContent[0][2] === 'done', 'Multiple rows status data of clickup')
//     test.assert(() => statusContent[0][3] === 'done', 'Multiple rows status data of clickup')

//     test.runInGas(true);
//     test.printHeader('ONLINE TESTS');
    
//     test.assert(() => statusContent[0] === 'done', 'Multiple rows status data of clickup')
//     test.assert(() => statusContent[1] === 'in progress', 'Multiple rows status data of clickup')
//     test.assert(() => statusContent[2] === 'done', 'Multiple rows status data of clickup')
//     test.assert(() => statusContent[3] === 'done', 'Multiple rows status data of clickup')
// }

// (function () {
//     const IS_GAS_ENV = typeof ScriptApp !== 'undefined';
//     if (!IS_GAS_ENV) runTests();
// })();
