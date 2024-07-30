#!/bin/bash

# wait for mysql to be ready
until nc -z -v -w30 db 3306
do
  echo "Waiting for MySQL database connection..."
  sleep 1
done

echo "MySQL is up and running"

npx prisma migrate deploy
npm start