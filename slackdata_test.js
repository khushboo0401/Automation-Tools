if (typeof require !== "undefined") {
  UnitTestingApp = require("./UnitTestingApp.min.js");
  SlackData = require("./slackdata_helper.js");
}

function runTests() {
  const test = new UnitTestingApp();
  test.enable();
  test.clearConsole();
  const slackData = new SlackData();
  test.runInGas(false);
  test.printHeader("LOCAL TESTS");

  let slackContent = slackData.getSlackContent();
  test.assert(
    () =>
      slackContent[0] ===
      "Bearer xoxb-4735780073537-4815008853524-lCRsdk9r0DJpJTSroBSDoYen",
    "Multiple rows User Add on Slack Online"
  );
  test.assert(
    () => slackContent[1] === "C04PZ01U5C4",
    "Multiple rows  User Add on Slack Online"
  );

  test.runInGas(true);
  test.printHeader("ONLINE TESTS");
  test.assert(
    () =>
      slackContent[0] ===
      "Bearer xoxb-4735780073537-4815008853524-lCRsdk9r0DJpJTSroBSDoYen",
    "Multiple rows User Add on Slack Online"
  );
  test.assert(
    () => slackContent[1] === "C04PZ01U5C4",
    "Multiple rows  User Add on Slack Online"
  );
}

(function () {
  const IS_GAS_ENV = typeof ScriptApp !== "undefined";
  if (!IS_GAS_ENV) runTests();
})();
