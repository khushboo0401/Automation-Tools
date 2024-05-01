if (typeof require !== "undefined") {
  UnitTestingApp = require("./UnitTestingApp.min.js");
  ClickUpTaskData = require("./clickuptask_helper.js");
}

function runTests() {
  const test = new UnitTestingApp();
  test.enable();
  test.clearConsole();
  const clickUpTaskData = new ClickUpTaskData();

  test.runInGas(false);
  test.printHeader("LOCAL TESTS");
  let clickupTask = clickUpTaskData.getCreateTaskHelper();

  test.assert(
    () =>
      clickupTask["name"] ===
      "Terraform Fundamentals: Why we use Terraform and not Chef, Puppet, Ansible, Pulumi, or CloudFormation?",
    "Multiple rows in Create Task to Click Up OnLine"
  );
  test.assert(
    () => clickupTask["time_estimate"] === 2.88e7,
    "Multiple rows in Create Task to Click Up OnLine"
  );
  test.assert(
    () =>
      clickupTask["description"] ===
      "In the intro to the series, we discussed why every company should be using infrastructure-as-code (IAC). In this post, we’re going to discuss why we picked Terraform as our IAC tool of choice.https://blog.gruntwork.io/why-we-use-terraform-and-not-chef-puppet-ansible-saltstack-or-cloudformation-7989dad2865c#.63ls7fpkq",
    "Multiple rows in Create Task to Click Up OnLine"
  );

  test.runInGas(true);
  test.printHeader("ONLINE TESTS");
  test.assert(
    () =>
      clickupTask["name"] ===
      "Terraform Fundamentals: An Introduction to Terraform",
    "Multiple rows in Create Task to Click Up OnLine"
  );
  test.assert(
    () => clickupTask["time_estimate"] === 2.88e7,
    "Multiple rows in Create Task to Click Up OnLine"
  );
  test.assert(
    () =>
      clickupTask["description"] ===
      "Learn the basics of Terraform in this step-by-step tutorial of how to deploy a cluster of web servers and a load balancer on AWS\n\nhttps://blog.gruntwork.io/an-introduction-to-terraform-f17df9c6d180",
    "Multiple rows in Create Task to Click Up OnLine"
  );
}

(function () {
  const IS_GAS_ENV = typeof ScriptApp !== "undefined";
  if (!IS_GAS_ENV) runTests();
})();
