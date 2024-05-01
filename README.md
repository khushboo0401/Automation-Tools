#  Create The Weekly Tasks in Clickup And Get All the Ticket Details.
## Introduction
Introducing our revolutionary task management tool for ClickUp. Effortlessly create weekly tasks while retrieving ticket details for assignees in a convenient sheet. Streamline task creation with automatic syncing to ClickUp. Retrieve comprehensive ticket information for specific assignees, ensuring centralized tracking. Simplify workflow, enhance collaboration, and unlock team potential. Experience the future of task management today.
 

## Create a new Google Sheet
To begin, go to Google Sheets, an online tool for creating spreadsheets. Create a new sheet and customize its name for meaningful identification.

## Prerequisites
In the sheet that you have created, you need to create multiple sub-sheets based on the names mentioned below:

* *SystemConfig* Sheet -
This sheet includes all the credentials for creating the tasks in the ClickUp, such as Clickup token, Team Name, Space Name, and Folder Name of the ClickUp.

* *Clickup list details* Sheet:
This sheet includes the all list, folder and space names from which we want to retrieve data or to create tickets in which list

* *NewTickets* Sheet -
We need to enter the new ticket or task details on this sheet and get some of the deatils automatically. The columns of this sheet are: Summary, Description, Estimation, List Name,Task ID, Ticket URL, Status and Week Number.

* *Get All Tickets* Sheet -
We will use this sheet for store all basic information of tickets from ClickUp of retrieving all ticket details for a particular assignee.

## Two report sheets will be generated automatically when we run the function to generate the reports.

## Functions Applied on weekly task creator for clickup
#### 1) Sync to clickup
The sync to clickup function retrieves user configuration data from a spreadsheet and iterates over each user. It instantiates a ClickUpTaskData object and calls the getCreateTaskHelper method to create tasks for the assignee in ClickUp, using the assignee's mail id.
##### The createClickupData function
The createClickupData function takes task data, a new assignee, and a time estimate as input, and returns an object with the ClickUp task data structure.

##### The createClickUpTaskData function
The createClickUpTaskData function iterates over the user data and task data, and for each user and task combination, it calls the createClickupData function to create the ClickUp task data object.

##### The createClickUpTaskData function
The createClickUpTaskData functionThe createClickUpTaskData function creates and updates spreadsheet data based on the task and user data. It retrieves clilckup list details, retrieves the list ID from it, makes a request to the ClickUp API to create a task, and updates the spreadsheet with the task ID, URL, week number, and other relevant information.

##### The getWeekNumber function
The getWeekNumber function calculates the week number for a given date.

#### 2) Sync from clickup
The sync from clickup function retrieves ticket data using the clickup_get_tasks method from the GetClickupTasks class. It then clears the contents of the "Get All Tickets" sheet, sets the header row, and populates the sheet with the retrieved ticket data.

#####  clickup_get_tasks function
The clickup_get_tasks function retrieves task data either from mock data or from a spreadsheet. It iterates over the data and extracts relevant task details such as task ID, start date, duration, due date, list name, description, assignees, and more. It then filters the tasks based on the assignee's email ID and pushes them into a list. The list is sorted based on the ticket creation date and returned as the result.

#### 3) Generate report
The generate report function will generate two reports based on the data on the get all ticket sheet report1 will be on the basis of the status and tags count of the tickets in the sheet and report2 will be the basis on status and days number of the tickets in sheet.

## Explaining Unit testing files
* *UnitTestingApp.min.js* and *MockData.min.js* files are common files which is used in unit testing.
### clickuptask_helper
The createTask function retrieves user configuration data and iterates over each user. If an assignee ID is present, it creates tasks in ClickUp using the ClickUpTaskData class.

The ClickUpTaskData class handles the creation of tasks. It retrieves task data and user data either from a mock data object or from a spreadsheet. It generates ClickUp task data based on the retrieved data and returns it.

The createClickupData function creates and returns an object with ClickUp task data based on the provided task data, assignee, and time estimate.

The createClickUpTaskData function generates ClickUp task data for each user and task combination.

The createSpreadsheetData function creates task data using spreadsheet data and the ClickUp API. It retrieves ClickUp system settings, assigns a list ID, and creates tasks for each user and task combination.

### getTaskStatus_helper
The code defines a GetStatus class that retrieves ticket statuses. If SpreadsheetApp is not defined, it uses mock data from MockData.min.js. The getTicketStatus method retrieves ticket statuses either from ClickUp API or the mock data. The print method logs the ticket statuses. The class is exported for usage in other modules if module is defined.

### getClickupTasksHelper
The code defines a GetClickupTasks class that retrieves tasks from ClickUp or uses mock data based on the environment. The clickup_get_tasks method filters the tasks based on the assignee mail ID and returns the filtered tasks sorted by their creation date. The class can be exported for usage in other modules.

## Links
* [Document Link](https://app.clickup.com/43312857/v/dc/199tpt-7384)
* [Sheet Link](https://docs.google.com/spreadsheets/d/1IFllJRt_kzzu_Z3fvd8qrfKuku2fkTpLEayCnHEBcE4/edit?usp=sharing)
* [Demo Video Link](https://drive.google.com/file/d/1bPTxIeHwI6hTSzq4wZgXL5aJWqPh8erg/view?usp=sharing)
