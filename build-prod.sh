set -e

source environment.sh

pushd $STATIC_DIR
npm install
npm run-script build
popd
docker build . -t $DOCKER_IMAGE
