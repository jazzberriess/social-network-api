# Social Network API

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)

A RESTful API for a social networking application built using MongoDB and Express.
The API allows users to create a user profile, create thoughts and reactions. It also allows users to update the user details, and thoughts. The API allows users to add to a friend list and add reactions/comments to fellow user's thoughts and users can delete their profile, thoughts, reactions and remove friends.

## Table of Contents

- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Live Demo](#live-demo)
- [Resources](#resources)
- [License](#license)
- [Contact](#contact)

## Technologies

This application was built using the following technologies and languages:

- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [dotenv NPM](https://www.npmjs.com/package/dotenv)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Insomnia](https://insomnia.rest/)
- JavaScript

## Installation

To run the Social Network API, you'll first need to clone the [social-network-api repo on GitHub](https://github.com/jazzberriess/social-network-api) or download the zipfile then install node.js, and other dependencies. To test the API requests, you'll need to install Insomnia, or a similar API client, such as Postman.

To install the dependencies included in this repo, navigate to the root directory of the cloned or downloaded repo. In either your terminal, command line or using the integrated terminal in your code editor of choice, enter the following command:

`npm i`

OR

`npm install`

If you're including the `package-lock.json` file from this repo in your own files, then run the following command instead:

`npm ci`

## Usage

To use the Social Network API, clone or download the repo and install the dependencies as instructed above.

Please also ensure you're using MongoDB and add a .env file to the root folder for your database path. User the .env.EXAMPLE file to help with creating the env variable correctly.

Since there's no seed data, you can write your own data to the database by making any POST request in Insomnia or your API client of choice.

Responses will be printed in the API client.

## Live Demo

## Resources

- [Mongoose Documentation](https://mongoosejs.com/docs/index.html)
- [Mongoose Delete Array Element - Stack Overflow](https://stackoverflow.com/questions/14763721/mongoose-delete-array-element-in-document-and-save)
- [Intl DateTime Format - MDN Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
- Stack Overflow
- MDN Docs

## License

This project is covered under the [MIT license](https://github.com/jazzberriess/social-network-api/blob/main/LICENSE)

&copy; 2022 Christi Scappatura

## Contact

Contact [Christi on GitHub](https://github.com/jazzberriess)
