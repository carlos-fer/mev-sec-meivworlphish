@echo off
echo Building React application...
call npm run build

echo Starting production server...
set NODE_ENV=production
node simple-proxy.js
