#!/bin/bash
cd /home/ubuntu/app
nohub node app.js > /home/ubuntu/app.log 2>&1 &
echo $! > /home/ubuntu/app.pid
echo "[AplicationStart] Servidor iniciado con PIP $(cat /home/ubuntu/app.pid)"
