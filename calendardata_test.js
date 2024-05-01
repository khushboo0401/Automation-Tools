if (typeof require !== "undefined") {
  UnitTestingApp = require("./UnitTestingApp.min.js");
  CalendarData = require("./calendardata_helper.js");
}

function runTests() {
  const test = new UnitTestingApp();
  test.enable();
  test.clearConsole();
  const calendarData = new CalendarData();

  test.runInGas(false);
  test.printHeader("LOCAL TESTS");

  let calendarContent = calendarData.getCalendarContent();
  test.assert(
    () => calendarContent[0] === "vaibhav.rawat@madgicaltechdom.com",
    "Multiple rows create calendar on user Online"
  );

  test.runInGas(true);
  test.printHeader("ONLINE TESTS");

  test.assert(
    () => calendarContent[0] === "vaibhav.rawat@madgicaltechdom.com",
    "Multiple rows create calendar on user Online"
  );
}

(function () {
  const IS_GAS_ENV = typeof ScriptApp !== "undefined";
  if (!IS_GAS_ENV) runTests();
})();
