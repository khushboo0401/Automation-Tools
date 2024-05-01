# Updated-Onboarding-Process

This repository contains functions for Training OnBoard Process .

We need to add a user and assign the user respective tasks in an issue tracking system(Clickup).

I upload the video file for how to use this repository.


## Prerequisites

Use Google Sheets for create this automation process as it has a simple and friendly interface.

Generate the Token in the clickup for create task in an issue tracking system(Clickup).

First add that email id to your slack workspace manually then go to https://api.slack.com/ website and generate a token to add users to channels.


## Setup
* Clone this repository: https://github.com/madgicaltechdom/OnBoarding-Vaibhav/tree/Updated-OnBoarding-Process
* Copy this Google Sheet : https://docs.google.com/spreadsheets/d/1JGb_MfSF0xgm_JWKqvUna5qaBLU4zrkhrLv7LsOvDLE/edit#gid=0
* Open the google script code of the copied Google sheet.
* Need to change the value in the systemconfig sheet.

1. Admin
2. Zoho PortalId
3. Zoho Devops Training
4. Zoho Data Engineering Training
5. Slack Host
6. Slack Token
7. Slack Channel
8. Clickup Workspace
9. Clickup OnBoarding
10. Clickup Token 
11. calenderId
12. Space Name
13. Team Name
14. Cal Start Date
15. Cal End Date
16. Additional Task Folder Name
17. Additional Task List Name
18. Additional Task Space Name
19. Folder Name

## Usage

1. First we add the user Name , Emial , System and the project in the user configuration sheet.
2. The script should run every 6 hours or it can be run manually to process the onboarding process.
3. First script will run and and the script compare the userconfig sheet project column if the user project is similar to Additional Task List Name of the system configuration sheet it will pick the data from the addtional task sheet and create the ticket on the user name or if it is not similar that script will run from point 4 to 8 which mention below.
4.  send the Email to the admin to add the user in the clickup and update the sheet with UserId.
5. Then again the script will run and use the task’s information from the Ticket sheet and assign those tasks to this user.
6. After that script will run and Send an email to the user with the onboarding document link.
7. The script will run again and add the user to the slack channel.
8. Then add user to the Google Weekly Meeting.

## Links

* Repository: https://github.com/madgicaltechdom/OnBoarding-Vaibhav/tree/Updated-OnBoarding-Process
By this link you see the code of this project.

* Link to Workdone Video : https://1drv.ms/v/s!AgwIsSVc22rdgQnVMpX9PKNd3EVR?e=oJmcbV

## Contributing

We welcome contributions to this repository.Please sumbit a pull request with your changes and we will review them as soon as possible.
  






































