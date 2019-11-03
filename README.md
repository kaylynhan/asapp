Download First:

MongoDB Compass
https://www.mongodb.com/download-center/compass

Postman
https://www.getpostman.com/downloads/

Make sure you have npm and node installed on your device. You can check on the terminal using

`npm -v` and `node -v`. 

The node version needs to be at least 12. 
You also want nodemon to have already been installed globally, which you can do with 

`npm i -g nodemon`

How to Set Up:

Open up MonogoDB Compass and click Connect without changing the defaults (ex. "hostname: localhost" and "Port: 27017")

Create a new database named "asappdb", and then within that database, create a collection called "users".

In a directory where you want to place the project, enter `git clone https://github.com/kaylynhan/asapp.git`

You'll be prompted to enter your username and password of your github account.

After the repository finishes downloading, cd into the client directory and enter into the terminal 

`npm install`

Then cd into the server directory and repeat the process there.

How to Run:

cd into the client directory and enter 

`npm start`

Open up another terminal instance and repeat the same for the server directory

How to Test:

Just Backend:
Open Postman and click on Create a Request. Click on the Body tag and select "raw" in the drop-down, and then "JSON" in the second drop-down that appears. Enter your inputs in the text box below in a JSON format, enter the URL at the top text field, and set the HTTPS request type in the drop-down next to the top text field. Click Send when you're ready.

Backend and Frontend:
Go to the appropiate React Component, input any data there, and then enter it. Open up developer mode on the page and check the console for any error messages or other output.

