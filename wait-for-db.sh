#!/bin/bash

START_TIME=$(date +%s)
TIMEOUT=60  # 1 minute

while ! nc -z taskmanagement-postgres-db 5432; do
  sleep 1
  ELAPSED_TIME=$(($(date +%s) - START_TIME))
  if [ $ELAPSED_TIME -ge $TIMEOUT ]; then
    echo "Failed to connect to database after $TIMEOUT seconds. Exiting."
    exit 1
  fi
done