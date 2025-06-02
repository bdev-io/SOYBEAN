# from arm, BUILD For x64
# TODO: 사용하기 전 아래 주석 해제
# export PACKAGE_VERSION="$(cat ./package.json | grep -m 1 version | sed 's/[^0-9.]//g')"
# export DOCKER_REPO="$(awk -F'"' '/"docker_repo": ".+"/{ print $4; exit; }' package.json)"
# export DOCKER_NAME="$(awk -F'"' '/"name": ".+"/{ print $4; exit; }' package.json)-dev"

# docker buildx build --platform linux/amd64 -t "${DOCKER_REPO}/${DOCKER_NAME}:${PACKAGE_VERSION}" -t "${DOCKER_REPO}/${DOCKER_NAME}:latest" -t "${DOCKER_REPO}/${DOCKER_NAME}:stable" --push .
