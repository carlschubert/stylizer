set e

export DOCKER_REPO=carlschubert/nst
export STATIC_DIR=static
export EB_DEPLOY_DIR=eb-deploy
export EB_ENVIRONMENT=remote-docker-env

pushd $STATIC_DIR
npm run-script build
popd
docker build . -t $DOCKER_REPO
docker push $DOCKER_REPO
pushd $EB_DEPLOY_DIR
eb deploy $EB_ENVIRONMENT
popd