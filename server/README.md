# Description

The server part for the Django REST React boilerplate.

# Stack

Python3, Django 3 + DRF

# Features

- Python 3.9
- Django 3.1
- Django Rest Framework 3.12
- Custom user model
- Authentication via Django Session (http-only cookie)
- CSRF token for each POST/UPDATE/DELETE action

# Installation

## Installation with docker

Install [Docker](https://docs.docker.com/install/) and [Docker-Compose](https://docs.docker.com/compose/). Start your virtual machines with the following shell command:

From `root` folder run `docker-compose build backend` or use `Dockerfile` from this (`server`) folder

If all works well, you should be able to create an admin account with:

`docker-compose run backend python manage.py createsuperuser`

## Installation without docker

Local installation of PostgreSQL is required.

From `root` folder run:

```sh
python3 -m venv venv
. venv/bin/activate
pip install -r server/requirements/requirements-dev.txt
```

# Development

## Development with docker

From `root` folder run `docker-compose up backend` or use `Dockerfile` from this (`server`) folder

Available resources:

- `http://localhost:8000/admin` Django Admin Panel
- `http://localhost:8000/redoc/` ReDoc
- `http://localhost:8000/swagger/` Swagger
- `http://localhost:9000` PostgreSQL Adminer panel
- `http://localhost:8025` MailHog client

## Development without docker

Run your local Postgres DB and run the server

From `root` folder run:

```bash
SECRET_KEY=supersecret \
DB_HOST=localhost \
DB_NAME=postgres \
DB_USER=postgres \
DB_PASSWORD=password \
python server/manage.py runserver
```
