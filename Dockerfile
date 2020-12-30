# Build frontend code
FROM node:14-alpine AS client
WORKDIR /client
COPY /client .
RUN npm install && npm run-script build

# Start server based on the frontend build
FROM python:3.9-slim AS server

ENV PYTHONFAULTHANDLER=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONHASHSEED=random \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100
WORKDIR /server
COPY /server ./
RUN pip3 install -r ./requirements/requirements-prod.txt

# Copy frontend code
COPY --from=client /client/build /client/build

WORKDIR /
# SECRET_KEY is only included here to avoid raising an error when generating static files.
RUN SECRET_KEY=supersecret \
    python3 /server/manage.py collectstatic --noinput && \
    python3 /server/manage.py migrate

EXPOSE $PORT

CMD ["gunicorn", "server.app.wsgi", "--log-file", "-"]