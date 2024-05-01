function trigger1() {
  ScriptApp.newTrigger('setValueStatus')
      .timeBased()
      .everyDays(1)
      .atHour(20)
      .create();
}

function trigger2() {
  ScriptApp.newTrigger('setTicketDataToSheet')
      .timeBased()
      .everyDays(1)
      .atHour(21)
      .create();
}





