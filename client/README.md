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

Install [Docker](https://docs.docker.com/install/) and [Docker-Compose](https://docs.docker.com/compose/). Start your virtual machines with the following shell command:

From `root` folder run `docker-compose build frontend` or use `Dockerfile` from this (`client`) folder

## Installation without docker

```sh
npm i
```

# Development

Backend endpoint should available at `http://localhost:3000` for proper work of the client part.

## Development with docker

From `root` folder run `docker-compose up frontend` or use `Dockerfile` from this (`client`) folder.

Open `http://localhost:3000`

## Development without docker

```bash
npm start
```
