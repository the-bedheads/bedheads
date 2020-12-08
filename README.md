Goldilocks is a free-to-use room swapping application. Whether you're traveling for work or for fun, Goldilocks can help you find the bed away from home that is just right for you.
----------
## Table of Contents
* [Tech and Frameworks](#tech-and-frameworks)
* [How to Use](#how-to-use)
  * [Getting Started](#getting-started)
    * [Required Technologies](#technologies-and-versions-required)
    * [API Keys](#api-keys-and-authorization)
    * [Installing Dependencies](#installing-dependencies)
    * [Environmental Variables](#environmental-variable-setup)
    * [Initializing Database](#initializing-database)
* [API Reference](#api-reference)
* [Contribute](#contribute)
<!-- ## Motivation -->
<!-- ## Build Status -->
----------
## Tech and Frameworks
### Front End Development
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and developed with Typescript on the front end.
Styling was done using Material-UI.
### Back End Development
The back end of our project was developed using NodeJS and Express, and we managed our database using PostgresQL and Sequelize.
### Deployment
This project was deployed using AWS.

----------
## How to Use
### Getting Started
There are several steps to take to get started with using this application. Environmental variables should be set up, APIs registered for and needed keys and other authentication collected, and dependencies installed.
#### Technologies and Versions Required
* Node version 
#### API Keys and Authorization
Each API used in this project requires at least one key when making API requests. Each of the API's documentation can be found in the API Reference [section below](#api-reference).
#### Installing Dependencies
npm was the package manager of choice for this project. Dependencies can be installed using the CLI command "npm install." Installing dependencies for the first time with this command could take several minutes.
#### Environment Variable Setup
Check out the project's .env.sample file for all the environmental variables needed for this project. When getting started locally, you can change the port to whichever port you use for testing. 
#### Initializing Database
* PostgresQL should be installed and updated to the latest version. [Download here](https://www.postgresql.org/download/).
* In postgres, create a database named "goldilocks".
* Start the server with the CLI command "npm run start:dev" to create the tables in the goldilocks database.
* Optionally, run the CLI command "npm run populate-db" to seed sample data to the application. This will seed your database with sample users who have listings and availabilities.
<!-- #### Scripts
Not sure if should include in this section or a different one??? -->
----------
## API Reference
The following APIs are used in this project.
* [Cloudinary](https://cloudinary.com/documentation)
* [IBM Watson Personality Insights](https://cloud.ibm.com/apidocs/personality-insights)
* [Mapbox](https://docs.mapbox.com/api/)
----------
## Contribute
To contribute to this project, reference the CONTRIBUTING.md file for instructions on how to contribute.
