#!/bin/sh

git pull origin main
npm install 
npm run dev
open "http://localhost:3000"