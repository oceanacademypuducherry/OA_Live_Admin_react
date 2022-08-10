@echo off
echo starting first program.
echo %cd%
start /b /wait cmd /c firebase target:apply hosting admin oa-live-admin
echo target applied completed...
start /b /wait cmd /c npm run build
echo App succesfuly builded
start /b /wait cmd /c firebase deploy --only hosting
echo Deployment completed
pause