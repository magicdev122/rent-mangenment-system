# MEANAuth - Login App
## Table of Content
1. [Introduction](#introduction)
2. [Used versions](#used-versions)
3. [Used tools](#used-tools)
4. [Used packages](#used-packages)
5. [How to run the API](#how-to-run-the-api)\
	5.1. [Build and run with Docker](#build-and-run-with-docker)\
	5.2. [Build and run with SDK](#build-and-run-with-sdk)\
	5.3. [Test and stop](#test-and-stop)
6. [Limitations](#limitations)\
    6.1. [Exception/error handling](#exception-error-handling)
7. [Some further development possibilities](#some-further-development-possibilities)
8. [Resources](#resources)

## 1. Introduction <a name="introduction"></a>
This is a basic MEAN stack (MongoDB, Express.js, Angular, Node.js) single-page web application project written in TypeScript. It is a simple user login/account management app with JWT authentication. You can register a new user account with your email address, name and password. After successful registration, you can log in and view your user data. This app was created for learning purpose, but is might be useful as a starting-point for other projects.
The API uses:
- MongoDB (Mongoose) noSQL database
- node.js (Express) RESTful API
- Angular 9 (Typescript) SPA
- Bootstrap 4 style
- JWT for authentication

If any question, please do not hesitate to contact me.
## 2. Used versions <a name="used-versions"></a>
**1. Frameworks**
- Express.js: 4.17.1
- Angular: 9.1.4

**2. Runtime:**
- node.js runtime: 12.16.3

**3. Database:**
- MongoDB: 4.2.6
## 3. Used tools <a name="used-tools"></a>
- Postman for API testing
- Git Extensions as git gui
- VSC as text editor
- Docker for containerization
- Windows 10 as OS
## 4. Used packages <a name="used-packages"></a>
**1. Backend:**
- express: 4.17.1,
- mongoose: 5.8.7,
- bcryptjs: 2.4.3,
- cors: 2.8.5,
- jsonwebtoken: 8.5.1,
- body-parser: 1.19.0,
- passport: 0.4.1,
- passport-jwt: 4.0.0

**2. Frontend (except Angular packages):**
- @auth0/angular-jwt: 3.0.1,
- angular2-flash-messages: 3.0.1,
- bootstrap: 4.4.1,
- jquery: 3.5.0,
- popper.js: 1.16.1,
- rxjs: 6.5.5,
- tslib: 1.10.0,
- zone.js: 0.10.2
## 5. How to run the API <a name="how-to-run-the-api"></a>
### 5.1. Build and run with Docker <a name="build-and-run-with-docker"></a>
- download and install Docker and Docker-Compose
- clone or download the content of the repository
- open a terminal and navigate to the containing folder
- write "docker-compose up --build" and press Enter
### 5.2. Build and run with SDK <a name="build-and-run-with-sdk"></a>

- download and install node.js, MongoDB
- clone or download the content of the repository

**MongoDB**
- check if MongoDB server is running as a service

**Backend**
- open a terminal and navigate to the folder "express-server"
- write "npm install" and press Enter
- after package installation is finished, write "npm start" in the terminal and press Enter

**Frontend**
- open another terminal and navigate to the folder "angular-client"
- write "npm install" and press Enter
- after package installation is finished, write "npm start" in the terminal and press Enter
### 5.3. Test and stop <a name="test-and-stop"></a>
- if no error message in the terminal, open your browser (recommended: latest Chrome, Firefox, Safari, Edge Chromium or Chromium) and open: http://localhost:4200
- first register a user account, then log in and after that you can diplay your user data and also log out
- after testing go back to the terminals and press "Ctrl+C" to stop the the backend and frontend as well
## 6. Limitations <a name="limitations"></a>
### 6.1. Exception/error handling <a name="exception-error-handling"></a>
This application needs to be extended with exception handling. There are some already known issues which may cause error when it is not used correctly. I only tested the app with correct input values.
## 7. Some further development possibilities <a name="some-further-development-possibilities"></a>
- add possibility to modify and delete account
- Facebook authentication
- adding roles (admin, user)
## 8. Resources <a name="resources"></a>
There are several online source which I used to create this web app.\
Including but not limited to:
- Angular:
	- https://angular.io/docs
- Tutorialspoint:
	- https://www.tutorialspoint.com/nodejs/index.htm
	- https://www.tutorialspoint.com/expressjs/
	- https://www.tutorialspoint.com/mongodb/index.htm
	- https://www.tutorialspoint.com/bootstrap4/bootstrap4_layout.htm
	- https://www.tutorialspoint.com/typescript/index.htm
	- https://www.tutorialspoint.com/angular7/index.htm
- Traversy Media:
	- https://www.youtube.com/watch?v=uONz0lEWft0&list=PLillGF-RfqbZMNtaOXJQiDebNXjVapWPZ

Thank to every hero on Stackoverflow and Github who helped me with their comments! (Not all heroes wear capes.)
