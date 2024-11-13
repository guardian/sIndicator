#!/usr/bin/env bash

# Define directories
FIREFOX_DIST_DIR=./dist/firefox
CHROME_DIST_DIR=./dist/chrome

# Create directories if they don't exist
mkdir -p $FIREFOX_DIST_DIR
mkdir -p $CHROME_DIST_DIR

# Copy common files to both directories
cp -v \
  static/* \
  $FIREFOX_DIST_DIR/
cp -v \
  static/* \
  $CHROME_DIST_DIR/

# Copy specific manifest files
cp -v manifest-firefox.json $FIREFOX_DIST_DIR/manifest.json
cp -v manifest-chrome.json $CHROME_DIST_DIR/manifest.json

# Copy build output to both directories
cp -v dist/sindicator.js $FIREFOX_DIST_DIR/
mv -v dist/sindicator.js $CHROME_DIST_DIR/
cp -v dist/options.js $FIREFOX_DIST_DIR/
mv -v dist/options.js $CHROME_DIST_DIR/

echo "Build files copied to $FIREFOX_DIST_DIR and $CHROME_DIST_DIR"