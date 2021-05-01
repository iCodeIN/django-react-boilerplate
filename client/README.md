# Description

The client part for the Django REST React boilerplate.

# Stack

JavaScript, React + Redux

# Features

- React 17
- Redux-toolkit 1.5
- CSS-in-JS: MaterialUI 4

# Installation

## Installation with docker

Install [Docker](https://docs.docker.com/install/) and (Docker-Compose)[https://docs.docker.com/compose/]. Start your virtual machines with the following shell command:

`docker-compose build`

If all works well, you should be able to create an admin account with:

`docker-compose run backend python manage.py createsuperuser`

## Installation without docker

Local installation of PostgreSQL is required.

### Backend

```sh
python3 -m venv venv
. venv/bin/activate
pip install -r server/requirements/requirements-dev.txt
```

### Frontend

```sh
cd client
npm i
```

