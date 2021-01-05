#!/bin/env bash -e
# -e will cause any subsequent commands which fail will cause the shell script to exit immediately

##
# Created by Tomer Elkayam
##

#########################################################################################
# You should run this file in the following manner for a regular (major/minor) version: #
#  source ./publish-npm.sh 2.1.5                                                        #
# Or for a beta version:                                                                #
#  source ./publish-npm.sh 3.0.0-beta.1                                                 #
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

# Build jfrog-ui-essentials
echo -e "${YELLOW}Building jfrog-ui-essentials:${NC}"
npm run build || return 1

# Auto committing & pushing build files
echo -e "${YELLOW}Committing and pushing build files:${NC}"
git add ./dist -A  || return 1
git add ./package.json || return 1
git add ./package-lock.json || return 1

commit_message="Version $1 - Pre-tag"
echo -e "${GREEN}$commit_message${NC}"

git commit -m "$commit_message" || return 1
git push || return 1

# Auto tag & push
echo -e "${YELLOW}Creating and pushing a new tag:${NC}"

git tag $1
git push --tags

NPMTMP=~/.NPMTMP
NPMRC=~/.npmrc

function stash_npmrc {
    echo -e "${YELLOW}Stashing your .npmrc file${NC}"
    if test -f "$NPMRC"; then
        mv "$NPMRC" "$NPMTMP"
    else
        echo -e "${YELLOW}$NPMRC file does not exist${NC}"
    fi
}

function un_stash_npmrc {
    # Un-stash the .npmrc file
    echo -e "${YELLOW}Un-stashing your .npmrc file${NC}"
    if test -f "$NPMTMP"; then
        rm -f "$NPMRC"
        mv "$NPMTMP" "$NPMRC"
    else
        echo -e "${YELLOW}$NPMTMP file does not exist${NC}"
    fi
    return 0
}

# Stash the .npmrc file
stash_npmrc

# Log into npm using your credentials
echo -e "${YELLOW}Log in to npm using your credentials${NC}"
npm login || { un_stash_npmrc ; return 1; }

# If the second arg $2 is set to "beta" or $1 ends with "-beta" - assume a beta version is being published
if [[ $1 =~ ^.*-.*$ ]]; then
    echo -e "${YELLOW}Publishing a beta version ${GREEN}$1${YELLOW}:${NC}"
    npm publish --tag beta || { un_stash_npmrc ; return 1; }
else
    echo -e "${YELLOW}Publishing version ${GREEN}$1${YELLOW}:${NC}"
    npm publish || { un_stash_npmrc ; return 1; }
fi

# Un-stash the .npmrc file
un_stash_npmrc