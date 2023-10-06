# Flask React Project

Getting started
Clone this repository (only this branch)

Install dependencies

pipenv install -r requirements.txt
Create a .env file based on the example with proper settings for your development environment

Make sure the SQLite3 database connection URL is in the .env file

This starter organizes all tables inside the flask_schema schema, defined by the SCHEMA environment variable. Replace the value for SCHEMA with a unique name, making sure you use the snake_case convention.

Get into your pipenv, migrate your database, seed your database, and run your Flask app

pipenv shell
flask db upgrade
flask seed all
flask run
To run the React App in development, checkout the README inside the react-app directory.

Thank you for looking at my project! This project is called Harvest. It is a Pinterest clone that allows users to browse, save, and create ideas (pins), then organize those pins by board. A user can specify which topics the board is associated with. The user can also follow specific topics, which creates a list of recommended boards that match the user's followed topics. When creating a board, the user is prompted to set the board's status as public or 'secret', and only the public boards are given as suggestions to other users.  Users can also comment on pins, as well as view other comments left by other users.

![harvest-landing-page](https://github.com/ez111640/Harvest-AA/assets/126621503/0ac2f46a-4212-4a61-b7c1-f73f928a5951)
![harvest-user-page](https://github.com/ez111640/Harvest-AA/assets/126621503/34f6aadc-d70a-4480-a8a0-494c7d9a1814)
![harvest-pin-page](https://github.com/ez111640/Harvest-AA/assets/126621503/c4b989f8-dcc6-49cd-94ef-285b44e3b600)
![add-pin-page](https://github.com/ez111640/Harvest-AA/assets/126621503/b66a955f-b725-4497-820e-447c17ff83a5)
![edit-pin-page](https://github.com/ez111640/Harvest-AA/assets/126621503/7ed81cdf-42c5-41b7-987b-9ea2fa95a6fc)
![add-comment-page](https://github.com/ez111640/Harvest-AA/assets/126621503/8c805d2e-5aca-4b35-8371-25cad8029734)

Technologies used: 
React
Redux
Flask
PostgreSQL
SQLAlchemy
Node.js
Python
Javascript
HTML
CSS
