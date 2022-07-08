#!/bin/sh

set -e

echo "migrate for deployment"
npm run migrate:deploy
echo "migration success"

echo "generate database"
npm run generate
echo "generate success"

echo "Seeding database"
npm run seed
echo "seeding success"


echo "start app"
exec "$@"
