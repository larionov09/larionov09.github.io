# Make Your Own Simple Timetable
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/larionov09/larionov09.github.io/blob/main/LICENSE)

which you can access 24/7 and easily edit from pc or mobile.
The [larionov09.github.io](https://larionov09.github.io) website is an example. (I use it for studying)
## Features:
- It's completely free to use and make
- Edit timetable in Google Sheets (or allow someone else to do it)
- Use the website locally or host anywhere, even on Github
- Odd/even weeks support
- Easily customizable
## To do:
- Cache lesson data packet for instant loading (if timetable doesn't change too frequently)
- Add multiple groups support
- Additional data packet (for text at the top of the page, some additional notes for users, first week date for odd/even week calculations, etc.)
- Add English timetable example
# Usage
You will need some basic HTML and Javascript knowledge to set it up and customize for your needs. 
## Backend Setup (lessons data, tables and such):
1. Download the timetable example .xlsx file in the "backend" folder of the project
2. Open it in Google Sheets
3. Go to Extensions > Apps Script
4. Copy code from "google-sheets-app-script.js" in the "backend" folder
5. Paste it to "Code.gs" in your new Apps Script project
6. Click "New Deployment"
7. Select "Web app" type
8. Set "Who has access" to "Anyone"
9. Click "Deploy"
10. Copy the web app URL from the window, you'll need it 
## Frontend Setup (the website):
It consists of 3 files: index.html, style.css and script.js. 
1. Open script.js in any text editor
2. Find "const DAY_DATA_URL = " and replace the link to the one you've copied earlier
3. Open index.html in any browser and see if everything works
4. If it doesn't, these tutorials might help you: [https://youtu.be/OcncrLyddAs](https://youtu.be/OcncrLyddAs), [https://youtu.be/lOPOmAhkL7I](https://youtu.be/lOPOmAhkL7I)
## Customize it:
- Change the contents of the Google Sheets table, names of columns, apps script project, etc.
- Use Github Pages or other services to host the website (or keep it local)
# License
This project is licensed under the MIT License - see the LICENSE file for details
