#!/usr/bin/env bash
#

DIST_DIR=./dist

if [[ ! -d $DIST_DIR ]]
then
  echo "$DIST_DIR doesn't exist"
  exit
fi

cp -v \
  manifest.json \
  static/* \
  $DIST_DIR/
