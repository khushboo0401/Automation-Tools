if (typeof require !== "undefined") {
  UnitTestingApp = require("./UnitTestingApp.min.js");
  AdditionalTaskData = require("./additionaltask_helper.js");
}

function runTests() {
  const test = new UnitTestingApp();
  test.enable();
  test.clearConsole();
  const additionalTaskHelper = new AdditionalTaskData();

  test.runInGas(false);
  test.printHeader("LOCAL TESTS");

  let clickupAdditionalTask = additionalTaskHelper.getCreateTaskHelper();
  test.assert(
    () => clickupAdditionalTask[0]["name"] === "Workflow procedures",
    "Multiple rows in Create AdditionalTask to Click Up OnLine"
  );
  test.assert(
    () => clickupAdditionalTask[0]["tags"][0] === "Day 17",
    "Multiple rows in Create AdditionalTask to Click Up OnLine"
  );
  test.assert(
    () =>
      clickupAdditionalTask[0]["description"] ===
      "Define how a task should be done using any project management system e.g. Work Flow https://docs.google.com/document/d/1r6aUr47w5uvC7NLU4dJrBgPlWu4YSom6/edit",
    "Multiple rows in Create AdditionalTask to Click Up OnLine"
  );

  test.runInGas(true);
  test.printHeader("ONLINE TESTS");

  test.assert(
    () => clickupAdditionalTask[0]["name"] === "Workflow procedures",
    "Multiple rows in Create AdditionalTask to Click Up OnLine"
  );
  test.assert(
    () => clickupAdditionalTask[0]["tags"][0] === "Day 17",
    "Multiple rows in Create AdditionalTask to Click Up OnLine"
  );
  test.assert(
    () =>
      clickupAdditionalTask[0]["description"] ===
      "Define how a task should be done using any project management system e.g. Work Flow https://docs.google.com/document/d/1r6aUr47w5uvC7NLU4dJrBgPlWu4YSom6/edit",
    "Multiple rows in Create AdditionalTask to Click Up OnLine"
  );
}

(function () {
  const IS_GAS_ENV = typeof ScriptApp !== "undefined";
  if (!IS_GAS_ENV) runTests();
})();
