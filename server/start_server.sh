#!/bin/bash

# Start mongod
systemctl start mongod

# Run init.mongo.js
mongo hirefix scripts/init.mongo.js;

# Install npm dependencies
npm install

# Start the application
npm start
