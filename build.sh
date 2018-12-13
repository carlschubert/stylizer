source environment.sh

pushd $STATIC_DIR
npm run-script build
popd
docker build . -t $DOCKER_IMAGE
