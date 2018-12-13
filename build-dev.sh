set -e

# source environment.sh

# pushd $STATIC_DIR
# npm run-script dev-build
# popd
# docker build . -t $DOCKER_IMAGE

docker run -i --rm -p 5000:5000 $DOCKER_IMAGE

