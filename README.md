# videomakerai
The app lets you create great animation videos only by uploading the required images, which are then automatically knit together with the correct transitions to get the final video. The application ensures that you have the great video without any knowledge of any specific video editing.

## how to setup the app
Step 1: Create a virutalenv
`virtualenv -p python3 venv`

Step 2: Install the required requirements in the venv
`pip install -r requirements.txt`

Step 3: Migrate the database
`python manage.py migrate`

Step 4: Install required npm packages
`cd frontend`
`npm install`

## how to start the app

In one terminal session, run:
`python manage.py runserver`

In another terminal session, run:
`cd frontend && npm start`

## how to start the app directly from docker

Install docker in your pc, and type:
`docker-compose up`

## Using the application

Step 1: Click `Get Started` on the home page
Step 2: Go to `Sign Up` page from the `Login` page, and signup with your required details
Step 3: Click on `Go To Video Library`
Step 4: Click on `Create Video`
Step 5: Select the type of video you are looking to create. The application would ideally take your video type preference and the images to give you one of the best animation transitions

