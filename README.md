# Employee-login-webapp
This App enables Office employee to create his personal account on the office website allowing him to upload pictures to server using multer framework in node.js. Afterwards the data is stored in mysql database and can later be retrieved for verification. After logging in the user can send emails through company"s email adress using nodemailer and also attach the files he want to send to client.
<br/><br/>
# Running the project
Prerequisite: My SQL cmd
1. We would need to create database and required tables in mysql required by the program.
1.We would need to create a database named Social <br/>
````
CREATE DATABASE social;
USE social;
````
2.WE would be creating table info that would store all the information to make the application run correctly.<br/>
````

CREATE TABLE info
(
firstname varchar(255),
surname varchar(255),
email varchar(255),
pass varchar(255),
dat varchar(255),
month varchar(255),
yea varchar(255),
gender varchar(255),
file varchar(255)
);
````

3.Change the password of mysql in line 108 (in file project3final.js)according to the systems password of your mysql installation.<br />
4. Open command prompt and navigate to the directory where the project files are placed.<br />
5. We would need to install some node packages required for the project. This could be done by running a single command 
````
npm install
````
This would automatically install all the required packages.<br />

6. Finally run command to start server and run the project.
````
node project3final.js
````
7. Open a web Browser and go to 
````
localhost:1000
````
# Major Features
1. All routes are independent and every information submitted by user is sent throught POST so that no sensitive information is leaked.<br />
2. Checks have been placed such that no wrong information , invalid dates and emails could enter backed and spoil the database. <br />
3. User need not fill whole data again if there is an error as the data is remembered and sent back with the error message.
4. Image uploads have been checked for proper format and size limits so that no false/ malicious data enters backend.<br />
5.The software provides emailing facility from the dashboard itself. Also proper formatting of subject and content could be done, If required attachments could also be placed.This eliminates need of opening the emailing service everytime thus imporving employee efficiency

# Thank You
