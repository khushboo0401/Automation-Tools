if (typeof require !== 'undefined') {
    UnitTestingApp = require('./UnitTestingApp.min.js');
    ClickUpTaskData = require('./clickuptask_helper.js')
}

function runTests() {
    const test = new UnitTestingApp();
    test.enable();
    test.clearConsole();
    const clickUpTaskData = new ClickUpTaskData();

    test.runInGas(false);
    test.printHeader('LOCAL TESTS');
    let clickupTask = clickUpTaskData.getCreateTaskHelper()
    console.log(clickupTask)
    test.assert(() => clickupTask['name'] === 'Create the trigger function for automatically get the ticket status into the sheet . ', 'Multiple rows in Create Task to Click Up OnLine')
    test.assert(() => clickupTask['time_estimate'] === 10800000, 'Multiple rows in Create Task to Click Up OnLine')
    test.assert(() => clickupTask['description'] === 'Create the trigger function for automatically get the ticket status into the sheet .', 'Multiple rows in Create Task to Click Up OnLine')
    test.assert(() => clickupTask['assignees'][0] === '61433184' , 'Multiple rows in Create Task to Click Up OnLine')
    test.assert(() => clickupTask['tags'][0] === 'Documentation' , 'Multiple rows in Create Task to Click Up OnLine')





    test.runInGas(true);
    test.printHeader('ONLINE TESTS');
    test.assert(() => clickupTask['name'] === 'abc', 'Multiple rows in Create Task to Click Up OnLine')
    test.assert(() => clickupTask['time_estimate'] === 7200000, 'Multiple rows in Create Task to Click Up OnLine')
    test.assert(() => clickupTask['description'] === 'xyz', 'Multiple rows in Create Task to Click Up OnLine')
    test.assert(() => clickupTask['assignees'][0] === 61433184 , 'Multiple rows in Create Task to Click Up OnLine')
    test.assert(() => clickupTask['tags'][0] === 'Documentation' , 'Multiple rows in Create Task to Click Up OnLine')


}

(function () {
    const IS_GAS_ENV = typeof ScriptApp !== 'undefined';
    if (!IS_GAS_ENV) runTests();
})();
