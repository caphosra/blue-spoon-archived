#!bin/bash

pushd `dirname $0`
pushd ../

for move_file in ./html/*.html ./favicon.ico; do
    FILE_BASE_NAME=`basename $move_file`
    COPY_TO_FILE_NAME="./target/$FILE_BASE_NAME"
    cp -f $move_file $COPY_TO_FILE_NAME
    echo "Copied $move_file"
done

popd; popd
