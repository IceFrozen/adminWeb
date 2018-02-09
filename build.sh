!#/bin/bash

rm -rf ./dist/index
rm -rf ./dist/static/*
rmdir -p ./dist/static

rm -f ./dist.tar

npm run build

if [ $? -eq 0 ]
then
    echo "build success"
else
    echo "build faild"
        exit 0
fi

tar cvf dist.tar ./dist

