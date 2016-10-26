@echo off
path %PATH%;C:\Program Files\7-Zip\

7z.exe a -tzip _sitepage.zip _site\ -mx1 -xr!*.mp3
7z.exe a -tzip _siteaudio.zip -i!_site\*.mp3 -r -mx0
