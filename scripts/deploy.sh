#!bib/bash

gcloud config set account duchnv@noritechhub.com

gcloud config set project sharedvpcproject-380815

cp ./envs/.env.production ./.env

npm run build

gcloud app deploy --quiet