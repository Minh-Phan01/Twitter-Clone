# TWITTEST
Twittest is a personal project and my version of a social media/live-chat application that features posts and live-messaging.

# Features
* Posts
  * Create new posts
  * Edit existing posts
  * Delete existing posts
  * Read all existings posts from other users

* Messages
  * Create new messages with another user
  * Edit an existing message to another user
  * Delete an existing message to another user.

### Technologies Used
  * Python
  * React
  * Redux
  * SQLAlchemy
  * Sqlite3
  * AWS
  * Web-sockets
  * HTML15
  * CSS
  * Javascript

### Setting up the application
* Open up a terminal and navigate to the folder you would like the files to be in
* Type git clone then hit space and paste the url "git clone https://github.com/Minh-Phan01/Twittest" into your terminal and press enter
* Make a .env file in the root folder '/Twittest/.env' and copy paste the following code or copy the .env.example file:
    ```json
        SECRET_KEY=lkasjdf09ajsdkfljalsiorj12n3490re9485309irefvn,u90818734902139489230
        DATABASE_URL=sqlite:///dev.db
        SCHEMA=flask_schema
        S3_BUCKET=<your bucket name>
        S3_KEY=<Access key Id>
        S3_SECRET=<Secret access key>
    ```
* Navigate to frontend folder called '/Twittest/react-app' through your terminal and type "npm install" then press enter
* Navigate to root folder called '/yell' through your terminal and type "python --version" then press enter to check your current version of python
* Run the following command replacing 3.9.4 with your version number of python: pipenv install --python "$PYENV_ROOT/versions/3.9.4/bin/python"
* Then run this command: pipenv install -r requirements.txt
* Navigate to root folder through your terminal and type "pipenv shell" then press enter, then run:
  "flask db upgrade",
  "flask seed all",
  "flask run" 
  and your backend should now be started
* Open a separate terminal and navigate to your frontend folder then type "npm start" to start your frontend
