#!/bin/sh

echo "install deps"
bun install

echo "starting dev server"
bun run dev
