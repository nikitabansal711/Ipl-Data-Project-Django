# IPL Data Project Django

>## Technologies used:
>  ### Frontend:
>* Html, css, Bootstrap4, Javascript
>### Backend:
>* Django with Python, Postgresql database
---

>## To run the project:
* Open up your command terminal
* Clone the project using  ```git clone git@gitlab.com:mountblue/cohort-13-python/django-dataproject-nikita.git```
---

>### Set up your own virtual environment:
* sudo apt-get install python3-pip
* sudo pip3 install virtualenv
* virtualenv venv
* source venv/bin/activate
* pip install -r requirements.txt
---

>### Install Postgresql:
* sudo apt update
* sudo apt install postgresql
*  postgresql-contrib
---

>### Specify the postgres user:
* specify your postgres superuser username and password in the .env file in DATABASE_URL environment variable

* else activate postgres using ```sudo -u postgres psql```

* create one using command: ```CREATE USER temp WITH PASSWORD 'password';```

* give the superuser access using: ```ALTER USER temp WITH SUPERUSER;```
---

>## Run the code:
>### Create Database
* cd inside DataProject
  
* run helper_create_db.py to create database using command: ```python helper_create_db.py```
  
>### Apply migrations:
* ```python manage.py migrate```
>### Run the management command
* ```python manage.py dataLoader```

>### Run the server
* ```python manage.py runserver```

>### Drop the database:
* Make sure you are in the root dir that is <strong>DataProject</strong>
* ```python helper_db_dropper.py```
  
---


