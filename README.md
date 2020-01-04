<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src="https://raw.githubusercontent.com/Rocketseat/bootcamp-gostack-desafio-03/master/.github/logo.png" width="200px" />
</h1>

<h3 align="center">
  Gympoint - Rocketseat Bootcamp 9.0 Final Challenge
</h3>

This repository consists of three applications, where together, they compose an application to assist a gym. Aiming for GoStack 9.0 bootcamp certification.

**Note:** The mobile application was tested only on android phone.

- Main technologies on back-end: NodeJS, Express, Sequelize, Postgresql, nodemailer, redis, bee-queue, jsonwebtoken, youch and yup.

- Main technologies on front-end: ReactJS, Redux, Redux sagas, redux-persist, immer, styled-components, unform, axios and so on.

- Main technologies on mobile: React Native, Redux, Redux sagas, redux-persist, immer, react-navigation and so on.

# API

* You must create an .env file at the root of the project to setup some environment variables. You can use the .example.env file as an example;

* You should change the src/config/database.js file to change configurations about JWT sessions;

* After, in postgres, create the database according to the name informed on the .env. So, you can execute the command **yarn sequelize db: migrate** to create the tables in the database;

* To seed the database, run: **yarn sequelize db:seed:all**. This will create an admin user and create some initial plans;

* Some application routes can only be accessed by admin users. The other users, students, will be registered by the wep application;

* The application routes are listed below.

**Note:** Redis installation required for email queue creation.

## Routes

### Public 
- [post] /session

### Authenticated

- [get] /students/:id
- [get] /students/:student_id/checkins
- [post] /students/:student_id/checkins

- [get] /students/:student_id/help_orders
- [get] /students/:student_id/help_orders/:id
- [post] /students/:student_id/help_orders

### Admin authenticated

- [get] /students
- [post] /students
- [delete] /students/:id
- [put] /students/:student_id

- [get] /help_orders
- [get] /help_orders/:id
- [post] /help_orders/:id/answer

- [get] /plans
- [get] /plans/:id
- [post] /plans
- [put] /plans/:id
- [delete] /plans/:id

- [get] /enrollments
- [get] /enrollments/:id
- [post] /enrollments
- [put] /enrollments/:id
- [delete] /enrollments/:id

# Web app

* Used for manager the gym;

* You must create an .env file at the root of the project and inform the API address like .env.sample file.

# Mobile app

* Used by students;

* You must create an .env file at the root of the project and config some variables like .env.sample file.
