set -e

# Sets the following environment variables:
# DOCKER_IMAGE
# STATIC_DIR
# EB_DEPLOY_DIR
# EB_ENVIRONMENT
source environment.sh

source build.sh
docker push $DOCKER_IMAGE
pushd $EB_DEPLOY_DIR
eb deploy $EB_ENVIRONMENT
popd
