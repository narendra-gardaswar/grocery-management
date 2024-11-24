#!/bin/bash
set -e

echo "Building the project..."
npm run build

echo "Generating migrations..."
npm run migrate:generate

echo "Applying migrations..."
npm run migrate:apply

echo "Starting the API server..."
exec "$@"
