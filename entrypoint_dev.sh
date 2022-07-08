#!/bin/sh

set -e

echo "create tables"
npm run create:tables
echo "tables created"

# echo "Seeding database"
# npm run seed
echo "seeding success"

echo "start app"
exec "$@"
