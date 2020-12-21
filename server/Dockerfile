# Use an official Python runtime as a parent image
FROM python:3.9

# Python envs
ENV PYTHONFAULTHANDLER=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONHASHSEED=random \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100

# Adding backend directory to make absolute filepaths consistent across services
WORKDIR /app/backend

# Install Python dependencies
COPY ../requirements/requirements-base.txt ../requirements/requirements-dev.txt ./requirements/
RUN pip3 install --no-cache-dir --upgrade pip -r requirements/requirements-dev.txt

# Add the rest of the code
COPY . .

# Make port 8000 available for the app
EXPOSE 8000

# Be sure to use 0.0.0.0 for the host within the Docker container,
# otherwise the browser won't be able to find it
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]