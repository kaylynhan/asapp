## Download First ##

MongoDB Compass
https://www.mongodb.com/download-center/compass

Postman
https://www.getpostman.com/downloads/

Make sure you have npm and node installed on your device. You can check on the terminal using

`npm -v` and `node -v`. 

The node version needs to be at least 12.

You need to have mongodb installed. If you have brew, you can do this through

`brew install mongodb-community`

There's also some links here for tutorials to install for different OS

https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials
 
You also want nodemon to have already been installed globally, which you can do with 

`npm i -g nodemon`

## How to Set Up ##
Create the data directory for MongoDB by entering into the terminal

`mkdir -p /data/db`

Start up MongoDB by entering

`mongod`

Open up MonogoDB Compass and click Connect without changing the defaults (ex. "hostname: localhost" and "Port: 27017")

Create a new database named "asappdb", and then within that database, create a collection called "users".

In a directory where you want to place the project, enter `git clone https://github.com/kaylynhan/asapp.git`

You'll be prompted to enter your username and password of your github account.

After the repository finishes downloading, cd into the client directory and enter into the terminal 

`npm install`

Then cd into the server directory and repeat the process there.

## How to Run ##
If not already running, start up MongoDB with

`mongod`

cd into the client directory and enter 

`npm start`

Open up another terminal instance and repeat the same for the server directory

## How to Test ##

### Just Backend
Open Postman and click on Create a Request. Click on the Body tag and select "raw" in the drop-down, and then "JSON" in the second drop-down that appears. Enter your inputs in the text box below in a JSON format, enter the URL at the top text field, and set the HTTPS request type in the drop-down next to the top text field. Click Send when you're ready.

### Backend and Frontend
Go to the appropiate React Component, input any data there, and then enter it. Open up developer mode on the page and check the console for any error messages or other output.

## How to Pull Changes to Master ##
After your branch's new feature is working without errors, you'll want to push the changes to master.
### Fix Merge Conflicts
First within your feature branch pull from master. This is to correct any merge conflicts before pushing to master.

`git pull origin master`

Git will indicate which files have merge conflicts. After fixing them, check with 

`git status`

that all your merge conflicts have been fixed.

### Make a Pull Request on the Github Website
Open up a browser and go to 

https://github.com/kaylynhan/asapp/pulls

Click on "Create New Pull Request". On the dropdown that says "compare: master", click on it and then select the feature branch whose changes you want to pull to master.

### Approving the Pull Request

You'll need at least one other person to review your pull request and approve it from the Github website. They can do this by going to 

https://github.com/kaylynhan/asapp/pulls

where they can see all current pull requests.

