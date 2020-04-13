#!/bin/sh -xe
cd /app

export VERSION=$(cat version.txt)

sed -i.ori 's/$HABX_ENV/'"${HABX_ENV}"'/' build/index.html
sed -i.ori 's/$VERSION/'"${VERSION}"'/' build/index.html
# APP-1651: sed is buggy on busybox, it does only one replacement per line and everything is on the same line
sed -i.ori 's/$VERSION/'"${VERSION}"'/' build/index.html
