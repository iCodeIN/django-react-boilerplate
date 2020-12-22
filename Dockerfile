FROM python:3.9

# Install curl & node
RUN apt-get -y install curl \
    && curl -sL https://deb.nodesource.com/setup_14.x | bash \
    && apt-get install nodejs

# Python envs
ENV PYTHONFAULTHANDLER=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONHASHSEED=random \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100

WORKDIR /server

# Install Python dependencies for PROD environment
COPY ./requirements/ ./
RUN pip3 install --no-cache-dir --upgrade pip -r ./requirements-prod.txt

# Add the rest of the code
COPY . .

# Install JS dependencies
WORKDIR /client

COPY ./package*.json /client/
RUN npm install

# Add the rest of the code
COPY . .

# Build static files
RUN npm build

# ??? Have to move all static files other than index.html to root/
# for whitenoise middleware
# WORKDIR /app/frontend/build
# RUN mkdir root && mv *.ico *.js *.json root

# ??? Collect static files
# RUN mkdir /static

WORKDIR /

# SECRET_KEY is only included here to avoid raising an error when generating static files.
# Be sure to add a real SECRET_KEY config variable in Heroku.
RUN DJANGO_SETTINGS_MODULE=server.app.settings.prod \
    SECRET_KEY=iamyourfatherluke \
    python3 server/manage.py collectstatic --noinput

EXPOSE $PORT

# CMD python3 backend/manage.py runserver 0.0.0.0:$PORT
CMD ["gunicorn," "server.app.wsgi", "--log-file", "-"]