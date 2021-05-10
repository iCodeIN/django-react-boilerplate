# Django (DRF) & React (JS) boilerplate on Postgres & Docker

The starter kit with the mono repository for developing Full-stack application based on Python3 Django v3 with REST and JavaScript React v16 as SPA.

# Stack

Backend: Python3, Django + DRF
Frontend: JavaScript, React + Redux
Database: PostgreSQL

# Features

## Backend

- Python 3.9
- Django 3.1
- Django Rest Framework 3.12
- Custom user model
- Authentication via Django Session (http-only cookie)
- CSRF token for each POST/UPDATE/DELETE action

## Frontend

- React 17
- Redux-toolkit 1.5
- CSS-in-JS: MaterialUI 4

## Infrastructure

- Docker 20
- PostgreSQL 12
- Optimized development and production settings
- Send email via [Sendgrid](https://sendgrid.com) for production and MailHog for development

# Optional requirements

- Docker
- docker-compose
- PostgreSQL

# Installation

Install backend and frontend dependencies

## Installation with docker

Install [Docker](https://docs.docker.com/install/) and [Docker-Compose](https://docs.docker.com/compose/). Start your virtual machines with the following shell command:

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

# Development

Both folders `server` and `client` contain `.devcontainer` and `.vscode` configs for VSCode so they can be open separately to work with the backend or frontend dockerized code only.

## Development with docker

`docker-compose up`

Available resources:
- `http://localhost:8000/admin` Django Admin Panel
- `http://localhost:8000/redoc/` ReDoc
- `http://localhost:8000/swagger/` Swagger
- `http://localhost:3000` React SPA client
- `http://localhost:9000` PostgreSQL Adminer panel
- `http://localhost:8025` MailHog client

## Development without docker

Run your local Postgres DB and run the server

```bash
SECRET_KEY=supersecret \
DB_HOST=localhost \
DB_NAME=postgres \
DB_USER=postgres \
DB_PASSWORD=password \
python server/manage.py runserver
```

Run the client

```bash
cd client
npm start
```

# Deployment

Deployment to Heroku example

Server name: ultimate-scrubland-12345

## Deployment with docker

```sh
heroku stack:set container
git push heroku main
```

## Deployment without docker

```sh
heroku create
heroku buildpacks:add --index 1 heroku/nodejs
heroku buildpacks:add --index 2 heroku/python
heroku addons:create heroku-postgresql:hobby-dev

git remote add heroku https://git.heroku.com/ultimate-scrubland-12345.git
git add .
git commit -m "first commit"
git push heroku main
```
