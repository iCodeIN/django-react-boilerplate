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
- Django Rest Framework ..
- Custom user model
- Authentication via Django Session (http-only cookie)
- CSRF token for each POST/UPDATE/DELETE action

## Frontend

- React 16
- Redux-toolkit ..
- CSS-in-JS: MaterialUI

## Infrastructure

- Docker 20
- PostgreSQL 12
- Optimized development and production settings
- Send email via [Sendgrid](https://sendgrid.com) for production and MailHog for development

# Requirements

- Docker
- docker-compose

# Installation

Install backend and frontend dependencies

## Installation with docker

Install [Docker](https://docs.docker.com/install/) and (Docker-Compose)[https://docs.docker.com/compose/]. Start your virtual machines with the following shell command:

`docker-compose build`

If all works well, you should be able to create an admin account with:

`docker-compose run backend python manage.py createsuperuser`

## Installation without docker

### Backend

### Frontend

# Development

## Development with docker

## Development without docker

# Deployment

## Deployment with docker

## Deployment without docker

# Roadmap
