#!/bin/bash
docker build -t muhtasimfahim/vficate-rest-express-app .
docker push muhtasimfahim/vficate-rest-express-app

ssh deploy@$DEPLOY_SERVER << EOF
docker pull muhtasimfahim/vficate-rest-express-app
docker stop api-boilerplate || true
docker rm api-boilerplate || true
docker rmi muhtasimfahim/vficate-rest-express-app:current || true
docker tag muhtasimfahim/vficate-rest-express-app:latest muhtasimfahim/vficate-rest-express-app:current
docker run -d --restart always --name api-boilerplate -p 3000:3000 muhtasimfahim/vficate-rest-express-app:current
EOF
