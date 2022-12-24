#!/bin/sh

# 1. Pull from main
# 2. Npm install dependencies
# 3. npm start server
# 4. Open browser

git pull origin main
npm install 
npm run dev
open "http://localhost:3000"