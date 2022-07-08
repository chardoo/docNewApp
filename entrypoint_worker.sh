#!/bin/sh

set -e

echo "prisma generate started"
npm install @prisma/client
npm run generate
echo "prisma generate done"

echo "start app"
exec "$@"
