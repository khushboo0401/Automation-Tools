if (typeof require !== "undefined") {
  UnitTestingApp = require("./UnitTestingApp.min.js");
  EmailAdminData = require("./emailadmin_helper.js");
}

function runTests() {
  const test = new UnitTestingApp();
  test.enable();
  test.clearConsole();
  const emailData = new EmailAdminData();

  test.runInGas(false);
  test.printHeader("LOCAL TESTS");

  let admilEmailContent = emailData.getAdminEmailContent();
  test.assert(
    () =>
      admilEmailContent["adminEmail"] === "vaibhav.rawat@madgicaltechdom.com",
    "Multiple rows Send Email to Admin Online"
  );
  test.assert(
    () =>
      admilEmailContent["textSub"] ===
      "Please create a user with Vaibhav Rawat vaibhavrawat8888@gmail.com",
    "Multiple rows Send Email to Admin Online"
  );
  test.assert(
    () =>
      admilEmailContent["textMsg"] ===
      "This guy has joined us so please create a user in Clickup",
    "Multiple rows Send Email to Admin Online"
  );

  test.runInGas(true);
  test.printHeader("ONLINE TESTS");
  test.assert(
    () =>
      admilEmailContent["adminEmail"] === "vaibhav.rawat@madgicaltechdom.com",
    "Multiple rows Send Email to Admin Online"
  );
  test.assert(
    () =>
      admilEmailContent["textSub"] ===
      "Please create a user with Vaibhav Rawat vaibhavrawat8888@gmail.com",
    "Multiple rows Send Email to Admin Online"
  );
  test.assert(
    () =>
      admilEmailContent["textMsg"] ===
      "This guy has joined us so please create a user in Clickup",
    "Multiple rows Send Email to Admin Online"
  );
}

(function () {
  const IS_GAS_ENV = typeof ScriptApp !== "undefined";
  if (!IS_GAS_ENV) runTests();
})();
