# How to run Django REST

### Prerequisites

Have following requirements installed:
* python 2.7
* pip
* virtualenv (recommended)
* MySQL (recommended)


#### Step 1

Clone this repository and checkout this branch ([reference](https://stackoverflow.com/questions/1911109/how-to-clone-a-specific-git-branch))

```
$ git clone https://github.com/lbfe/rendezvous.git

$ git branch -a

$ git checkout khwu/server

$ git fetch
```

#### Step 2

Create a virtual environment with [virtualenv](http://python-guide-pt-br.readthedocs.io/en/latest/dev/virtualenvs/) and install dependencies

```
$ cd rendezvous/server/

$ virtualenv what_ever_name_you_want

# if your create a virtualenv under the project root folder, make sure you put the folder name in .gitignore, so it will not be checked in.

# You should see something like this, meaning you are in virtual environment
(lbfe-server) bondks-Air:server bondk$

$ pip install -r requirements.txt
```

#### Step 3

Setup SQLLite or MySQL (I prefer not to use SQLLite so I deleted it). The following instructions are using MySQL: (1) You can either use root (not recommended)
```
# Make sure you modify the database setting in server/setting.py to your password

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'lb_server',
        'USER': 'root',
        'PASSWORD': your_root_password,        # <-- here
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

(2) or create a new user.
```
# sign in as mysql root user
$ mysql -u root -p

# create new user 'lb_server' with password 'password'
mysql > create database lb_server;
mysql > GRANT ALL PRIVILEGES ON lb_server.* To 'lb_server'@'localhost' IDENTIFIED BY 'password';

# quit mysql with ctrl + d

# sign in with new user to check database permission granted

$ mysql -u lb_server -p password

mysql > show databases;

# you should see lb_server
```

#### Step 4

Integrate React views with Django using Webpack, note the webback config is in 'client/webpack.config.js'

Run following command in client directory to generate compiled react code to bundles dir.

```
./node_modules/.bin/webpack --config webpack.config.js
```

Launch django REST server

```
# Make sure you are in the same directory as manage.py and your MySQL is up running

# With this command the django would allow understand your models changes from your last model. Since you don't have any tables created before, django would just create the first changes/records that about to take place in database in app_name/migrations/000XX_XXX.py.
$ python manage.py makemigrations

# With this command django would make changes to your database base on your models
$ python manage.py migrate

# If one of those two command came up with some errors, just delete all the 000XX_XXX.py except __init__.py inside each app/migrations/ and redo those two commands again.

# Start running your server and you should see following output
$ python manage.py runserver
Django version 1.11.3, using settings 'server.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

#### Step 5

* Understand the models in activity/models.py, accounts/models.py and elders/models.py. Because of foreign key constrain, you have to create with this order an user, an elder and an activity type and then an antivity. Use [Postman](https://www.getpostman.com) or command line to CRUD (Create, Read, Update and Delete) your requests.
* Understand the urlspatterns in server/urls.py and in each apps which contain the destinations of your http requests.

* There is web-based interface for Django REST but I suggest stick with Postman or command line because there are still slight differences. A request from front-end server would be more similar to Postman and command line.

```
# creating an elder with command line should be something like this, so definitely use Postman instead:
curl -X POST \
  http://127.0.0.1:8000/api/elders/ \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: bf75c356-0ec9-19c0-be0c-693b83c38ec7' \
  -d '{
	"volunteer": 1,
	"first_name": "aaa",
	"last_name": "ccc"
}'
```

#### Step 6

Send request to heroku

##### 1 Sign up a user

method: POST

url: https://immense-wildwood-85181.herokuapp.com/api/users/signup/

body
```
{
	"email": "test1@test.com",
	"password": "test"
}
```

##### 2 Sign in a user

method: POST

url: https://immense-wildwood-85181.herokuapp.com/api/users/signin/

body
```
{
	"email": "test1@test.com",
	"password": "test"
}
```
response:
```
{
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0OTk3Mjc2MTUsImVtYWlsIjoidGVzdDFAdGVzdC5jb20iLCJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InRlc3QxQHRlc3QuY29tIn0.3JnJRarD1Ze-BO_nLmbXqbgHAE3nbccZVviYdr5JB4E"
}
```

##### 3 Retrieve your activities

method: GET

url: https://immense-wildwood-85181.herokuapp.com/api/activities/

header
```
Key:
Authorization

Value:
JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0OTk3Mjc2MTUsImVtYWlsIjoidGVzdDFAdGVzdC5jb20iLCJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InRlc3QxQHRlc3QuY29tIn0.3JnJRarD1Ze-BO_nLmbXqbgHAE3nbccZVviYdr5JB4E
```

##### 3 Create an elder to your elder list

method: POST

url: https://immense-wildwood-85181.herokuapp.com/api/elders/

header
```
Key:
Authorization

Value:
JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0OTk3Mjc2MTUsImVtYWlsIjoidGVzdDFAdGVzdC5jb20iLCJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InRlc3QxQHRlc3QuY29tIn0.3JnJRarD1Ze-BO_nLmbXqbgHAE3nbccZVviYdr5JB4E
```
body
```
{
	"first_name":"aaa",
	"last_name":"bbb"
}
```
##### 4 Create an activity type

method: POST

url: https://immense-wildwood-85181.herokuapp.com/api/activities/type/

header
```
Key:
Authorization

Value:
JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0OTk3Mjc2MTUsImVtYWlsIjoidGVzdDFAdGVzdC5jb20iLCJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InRlc3QxQHRlc3QuY29tIn0.3JnJRarD1Ze-BO_nLmbXqbgHAE3nbccZVviYdr5JB4E
```
body
```
{
	"type_name": "Lunch"
}
```


##### 5 Create an activity

method: POST

url: https://immense-wildwood-85181.herokuapp.com/api/activities/

header
```
Key:
Authorization

Value:
JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0OTk3Mjc2MTUsImVtYWlsIjoidGVzdDFAdGVzdC5jb20iLCJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InRlc3QxQHRlc3QuY29tIn0.3JnJRarD1Ze-BO_nLmbXqbgHAE3nbccZVviYdr5JB4E
```
body
```
{
	"elder":1,
	"activity_type":1,
	"hours":4,
	"comment": "very happy"
}
```
