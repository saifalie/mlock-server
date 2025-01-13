#!/usr/bin/env bash
echo "Installing dependencies..."
npm install

echo "Building TypeScript..."
npx tsc

echo "Build completed!"