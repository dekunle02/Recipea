#!/bin/sh

git pull origin main
npm install 
open "http://localhost:3000"
npm run dev
