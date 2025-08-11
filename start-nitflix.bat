@echo off
cd /d "C:\Users\Shiv\Desktop\Teja\NITFlix\public"
echo Starting NITFlix from: %CD%
http-server -p 8080 -o
pause
