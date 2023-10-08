# Harvest
To navigate directly to the live version, [click here](https://harvest-aa.onrender.com/)

This project is called Harvest. It is a Pinterest clone that allows users to browse, save, and create ideas (pins), then organize those pins by board. A user can specify which topics the board is associated with. The user can also follow specific topics, which creates a list of recommended boards that match the user's followed topics. When creating a board, the user is prompted to set the board's status as public or secret, and only the public boards are given as suggestions to other users. Users can also comment on pins, as well as view other comments left by other users.


# Technologies
 - React
 - Flask
 - PostgreSQL
 - Python
 - Javascript
 - SQLAlchemy
 - Redux
 - AWS
 

## Features
**Pins**
 - Idea cards for users to browse
 - Users can also create, delete, or make changes to pins they've created
 - Utilizes AWS for image upload
**Boards**
 - Users save their pinned ideas to boards. 
 - A user can have any number of boards
 - Boards are associated with one or more topics
 - Boards can be public or secret. Secret boards do not appear in searches
 - Users can change the name, topics, or privacy of their own boards
 - Users can delete their boards as well as remove pins from their boards
**Comments**
 - Users can view other users comments on each pin
 - Users can leave a comment on each pin
 - Validation prevents a user from entering more than one comment, but they can delete their comments and start over
**Topics**
 - Several categories of topics exist and can be associated with boards upon creation or by editing the board after it is created
 - Users can also choose to follow one or more topics by navigating to their profile page and editing their preferences
 - The user's chosen topics are used to generate an 'explore' page of boards that fit one or more of the topics the user chose
 
## Database Schema


## Components

Landing Page

User Profile Page

Board Landing Page

Create Board Page

Edit Board Page- Edit Name

Edit Board Page- Edit Topics

Pin Detail Page

Edit Pin Page

Delete Pin Page- from Board Page

Edit Profile Page

View Comments

Create Comments

Delete Comments

## Endpoints

| Request | Purpose |
|--|--|
|GET / | Navigate to the main landing page and query for all pins  |
|GET /boards| Query for all boards belonging to the current user|
|GET /comments| Query for all comments|
|GET /auth| Query for information about the current authorized user|
|GET /boards/all| Query for all boards|
|GET /pins/<:id> |  Query for the details of one particular pin|
|GET /boards/<:id>| Query for the board with the specified id|
|GET /boards/<:id>/pins| Query for all pins that are associated with the board designated by its id|
|GET /boards/<:id>/topics| Query for all topics associated with the board with the specified id
|GET /topics/<:id>/boards| Query for all boards that are associated with the topic with the specified id|
|GET /topics/current| Query for all topics that the current user has selected|
|GET /pin/<:id>/comments| Query for all commented associated with the pin with the specified id|
|GET /boards/<:id>/pins/all| Query for the any pins that have been pinned to the board with the specified ID|
|POST /boards| Creates a new board|
|POST /comments| Creates a new comment|
|POST /pins| Creates a new pin|
|POST /boards/<:id>/pins| Add a pin to the board with the specified id|
|POST /auth/login| If the given credentials are correct, logs in a user|
|POST /auth/signup| Uses the given credentials to create and log in a new user
|POST /boards/<:id>/topics| Associate the board with the specified id to a topic|
|POST /topics/current| Allow the user to follow a new topic|
|PUT /boards/<:id>| Change one or more of the specified board's details|
|PUT /pins/<:id>| Change one or more of the specified pin's details|
|PUT /auth/<:id>| Change one or more of the current user's details or credentials|
|DELETE /boards/<:id>| Delete the board with the specified id|
|DELETE /pins/<:id>| Delete the pin with the specified id|
|DELETE /comments/<:id>| Delete the comment with the specified id|
|DELETE /boards/<:id>/pins| Delete pins from the specified board|
|DELETE /boards/<:id>/topics| Delete topics from the specified board|
|DELETE /topics/current | Allow a user to unfollow a topic| 


##  Instructions to build/run

1.  Clone this repository (only this branch)
    
2.  Install dependencies
    
    pipenv install -r requirements.txt
    
3.  Create a  **.env**  file based on the example with proper settings for your development environment
    
4.  Make sure the SQLite3 database connection URL is in the  **.env**  file
    
5.  This starter organizes all tables inside the  `flask_schema`  schema, defined by the  `SCHEMA`  environment variable. Replace the value for  `SCHEMA`  with a unique name,  **making sure you use the snake_case convention**.
    
6.  Get into your pipenv, migrate your database, seed your database, and run your Flask app
    
    pipenv shell
    
    flask db upgrade
    
    flask seed all
    
    flask run
    
7.  To run the React App in development, checkout the  [README](https://github.com/samhandels/Samazon/blob/main/react-app/README.md)  inside the  `react-app`  directory.


# Future Features
 - Pins will also be associated with a topic, which will allow recommendations to be created for the current user's board based on the topic the board is associated with.
 - Users can choose to upload a photo for their profile image
 - Users can create new topics with a name of their choice
 

## Technical Implementation Details

 - This was my first attempt at using AWS for file upload, and it went pretty well. The addition of AWS allowed the site to function more similarly to Pinterest, the site it was cloned from
 - The biggest challenge with this website was how many associations there were. For example, a topic is associated with a board and can be followed by a user.  A user also has boards, but the boards aren't necessarily associated with the same topics as the user has followed. 

