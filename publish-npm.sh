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
echo Updating jfrog-ui-essentials version: $1 in "package.json"
jq '.version = $new_val' --arg new_val $1 ./package.json > tmp.$$.json && mv tmp.$$.json ./package.json && rm -f tmp.$$.json

# Then we save the version number in BUILD_VERSION for when the version is build
export BUILD_VERSION=$1
echo Set BUILD_VERSION: $BUILD_VERSION

# Build jfrog-ui-essentials
echo Building jfrog-ui-essentials:
gulp build

# Auto committing & pushing build files
echo Committing and pushing build files:
git add . -A
commit_message="Version $1 - Pre-tag"
echo Creating commit: "$commit_message"
git commit -m "$commit_message"
git push

# Auto tag & push
echo Creating and pushing a new tag:
git tag $1
git push --tags

# Stash the .npmrc file
echo Stashing your .npmrc file
mv ~/.npmrc ~/.NPMTMP

# Log into npm using your credentials
echo Log in to npm using your credentials:
npm login

# If the second arg $2 is set to "beta" or $1 ends with "-beta" - assume a beta version is being published
if [ -n $2 -a "$2" =~ ^.*beta$ ] || [[ $1 =~ ^.*-beta.*$ ]]; then
    echo Publishing a beta version $1:
    npm publish --tag beta
else
    echo Publishing version $1:
    npm publish --tag
fi

# TODO: check if ~/.npmrc exists, if so don't move this back
# TODO: unstash .npmrc on failure
# Un-stash the .npmrc file
echo Un-stashing your .npmrc file
mv ~/.NPMTMP ~/.npmrc