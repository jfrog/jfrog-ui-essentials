#!/bin/env bash -e
# -e will cause any subsequent commands which fail will cause the shell script to exit immediately

##
# Created by Tomer Elkayam @ 15/10/2018
##

#########################################################################################
# You should run this file in the following manner for a regular (major/minor) version: #
#  source ./publish-npm.sh 2.1.5                                                        #
# Or for a beta version:                                                                #
#  source ./publish-npm.sh 2.1.5-beta.0                                                 #
#########################################################################################

####### Colors #############
RED='\033[0;31m'
YELLOW='\033[0;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color
###########################

# If jq is not installed run: brew install jq

# If no version is supplied - exit with error
if [ -z $1 ]; then
    echo -e "${RED}ERROR:${NC}" You must supply a valid version!
    return
fi

# If version is not SemVer compliant - exit with error
SEMVER_REGEX="^(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)(\\-[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?$"
if ! [[ "$1" =~ $SEMVER_REGEX ]]; then
    echo -e "${RED}ERROR:${NC}" You must supply a SemVer compatible version!
    return
fi

# Update the version of jfrog-ui-essentials in the package.json file
echo -e "${YELLOW}Updating jfrog-ui-essentials version: ${GREEN}$1${YELLOW} in 'package.json'${NC}"

jq '.version = $new_val' --arg new_val $1 ./package.json > tmp.$$.json && mv tmp.$$.json ./package.json && rm -f tmp.$$.json

# Then we save the version number in BUILD_VERSION for when the version is build
export BUILD_VERSION=$1
echo -e "${YELLOW}Set BUILD_VERSION: ${GREEN}$BUILD_VERSION${YELLOW}${NC}"

# Build jfrog-ui-essentials
echo -e "${YELLOW}Building jfrog-ui-essentials:${NC}"
gulp build

# Auto committing & pushing build files
echo -e "${YELLOW}Committing and pushing build files:${NC}"
git add . -A
commit_message="Version $1 - Pre-tag"
echo -e "${GREEN}$commit_message${NC}"

git commit -m "$commit_message"
git push

# Auto tag & push
echo -e "${YELLOW}Creating and pushing a new tag:${NC}"

git tag $1
git push --tags

# Stash the .npmrc file
echo -e "${YELLOW}Stashing your .npmrc file${NC}"
mv ~/.npmrc ~/.NPMTMP

# Log into npm using your credentials
echo -e "${YELLOW}Log in to npm using your credentials${NC}"
npm login

# If the second arg $2 is set to "beta" or $1 ends with "-beta" - assume a beta version is being published
if [ -n $2 -a "$2" =~ ^.*beta$ ] || [[ $1 =~ ^.*-.*$ ]]; then
    echo -e "${YELLOW}Publishing a beta version ${GREEN}$1${YELLOW}:${NC}"
    npm publish --tag beta
else
    echo -e "${YELLOW}Publishing version ${GREEN}$1${YELLOW}:${NC}"
    npm publish
fi

# TODO: check if ~/.npmrc exists, if so don't move this back
# TODO: unstash .npmrc on failure
# Un-stash the .npmrc file
echo -e "${YELLOW}Un-stashing your .npmrc file${NC}"
mv ~/.NPMTMP ~/.npmrc


# Clear Artifctory cache
echo -e "${YELLOW}Do you wish to clear ${GREEN}Artifactory npm cache ${YELLOW}as well?${NC}"
select yn in "Yes" "No"; do
    case $yn in
        Yes ) echo -e "${YELLOW}Enter AUTH:${NC}"
            read authKey
            curl -H "X-JFrog-Art-Api:${authKey}" 'https://repo.jfrog.io/artifactory/ui/artifactactions/delete' --data-binary '{"repoKey":"npmjs-cache","path":"jfrog-ui-essentials/-"}' -H 'Content-Type:application/json'
        break;;
        No )
        break;;
    esac
done