#!/bin/bash

# Exchange Core - Prisma Helper Script

SCHEMA_PATH="./apps/api/prisma/schema.prisma"

case $1 in
  "migrate:dev")
    npx prisma migrate dev --name ${2:-migration} --schema=$SCHEMA_PATH
    ;;
  "migrate:reset")
    npx prisma migrate reset --schema=$SCHEMA_PATH
    ;;
  "studio")
    npx prisma studio --schema=$SCHEMA_PATH
    ;;
  "generate")
    npx prisma generate --schema=$SCHEMA_PATH
    ;;
  "format")
    npx prisma format --schema=$SCHEMA_PATH
    ;;
  *)
    echo "Exchange Core Prisma Helper"
    echo ""
    echo "Usage: ./scripts/prisma.sh [command] [args]"
    echo ""
    echo "Commands:"
    echo "  migrate:dev [name]  - Create and apply migration"
    echo "  migrate:reset       - Reset database and apply all migrations"
    echo "  studio             - Open Prisma Studio"
    echo "  generate           - Generate Prisma client"
    echo "  format             - Format schema file"
    echo ""
    echo "Examples:"
    echo "  ./scripts/prisma.sh migrate:dev init_user"
    echo "  ./scripts/prisma.sh studio"
    ;;
esac