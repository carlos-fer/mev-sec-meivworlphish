#!/bin/bash

# Build the React app
echo "Building React application..."
npm run build

# Start the production server
echo "Starting production server..."
NODE_ENV=production node simple-proxy.js
