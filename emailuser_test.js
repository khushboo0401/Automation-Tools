if (typeof require !== "undefined") {
  UnitTestingApp = require("./UnitTestingApp.min.js");
  EmailUserData = require("./emailuser_helper.js");
}

function runTests() {
  const test = new UnitTestingApp();
  test.enable();
  test.clearConsole();
  const emailData = new EmailUserData();
  test.runInGas(false);
  test.printHeader("LOCAL TESTS");

  let userEmailContent = emailData.getUserEmailContent();
  test.assert(
    () => userEmailContent["newEmail"] === "vaibhavrawat8888@gmail.com",
    "Multiple rows Send Email to User Online"
  );
  test.assert(
    () =>
      userEmailContent["textSub"] ===
      "Vaibhav Rawat : Offer Letter from Madgical Techdom (OPC) Pvt Ltd",
    "Multiple rows Send Email to User Online"
  );
  test.assert(
    () =>
      userEmailContent["textMsg"] ===
      "Hi Vaibhav Rawat,\n" +
        "\n" +
        "Welcome Vaibhav Rawat! We're proud to have you become part of our team. We look forward to learning and growing alongside you for the years to come. You shall be a part of DevOps training and the training duration is ~ 12 weeks.\n" +
        "\n" +
        "We shall be assigning DevOps training tickets to you and you should start working on them whenever you start working with us.\n" +
        "\n" +
        "You should read our document(https://docs.google.com/document/d/1r6aUr47w5uvC7NLU4dJrBgPlWu4YSom6/edit) for the onboarding process and watch the videos to get familiar with the system. We shall invite you to the slack channel and our weekly meetings.\n" +
        "\n" +
        "Let me know if you have any questions.\n" +
        "\n" +
        "Best Regards,\n" +
        "Admin Name",
    "Multiple rows Send Email to User Online"
  );

  test.runInGas(true);
  test.printHeader("ONLINE TESTS");
  test.assert(
    () => userEmailContent["newEmail"] === "vaibhavrawat8888@gmail.com",
    "Multiple rows Send Email to User Online"
  );
  test.assert(
    () =>
      userEmailContent["textSub"] ===
      "Vaibhav Rawat : Offer Letter from Madgical Techdom (OPC) Pvt Ltd",
    "Multiple rows Send Email to User Online"
  );
  test.assert(
    () =>
      userEmailContent["textMsg"] ===
      "Hi Vaibhav Rawat,\n" +
        "\n" +
        "Welcome Vaibhav Rawat! We're proud to have you become part of our team. We look forward to learning and growing alongside you for the years to come. You shall be a part of DevOps training and the training duration is ~ 12 weeks.\n" +
        "\n" +
        "We shall be assigning DevOps training tickets to you and you should start working on them whenever you start working with us.\n" +
        "\n" +
        "You should read our document(https://docs.google.com/document/d/1r6aUr47w5uvC7NLU4dJrBgPlWu4YSom6/edit) for the onboarding process and watch the videos to get familiar with the system. We shall invite you to the slack channel and our weekly meetings.\n" +
        "\n" +
        "Let me know if you have any questions.\n" +
        "\n" +
        "Best Regards,\n" +
        "Admin Name",
    "Multiple rows Send Email to User Online"
  );
}

(function () {
  const IS_GAS_ENV = typeof ScriptApp !== "undefined";

  if (!IS_GAS_ENV) runTests();
})();
