#!/bin/env bash -e
# -e will cause any subsequent commands which fail will cause the shell script to exit immediately

##
# Created by Tomer Elkayam @ 02/01/2019
##

#########################################################################################
# You should run this file in the following manner for a regular (major/minor) version: #
#  source ./publish-npm.sh 2.1.5                                                        #
# Or for a beta version:                                                                #
#  source ./publish-npm.sh 2.1.5-beta.0                                                 #
#########################################################################################

# If jq is not installed run: brew install jq

# Update the version of jfrog-ui-essentials in the package.json file
echo -e "Updating jfrog-ui-essentials version: $1 in 'package.json'"

jq '.version = $new_val' --arg new_val $1 ./package.json > tmp.$$.json && mv tmp.$$.json ./package.json && rm -f tmp.$$.json

# Then we save the version number in BUILD_VERSION for when the version is build
export BUILD_VERSION=$1
echo -e "Set BUILD_VERSION: $BUILD_VERSION"

# Build jfrog-ui-essentials
echo -e "Building jfrog-ui-essentials:"
gulp build || return 1

# Auto committing & pushing build files
echo -e "Committing and pushing build files:"
git add ./dist -A  || return 1
git add ./package.json || return 1
git add ./package-lock.json || return 1

commit_message="Version $1 - Pre-tag"
echo -e "$commit_message"
git commit -m "$commit_message" || return 1
git push || return 1

# Auto tag & push
echo -e "Creating and pushing a new tag:"

git tag $1
git push --tags

# Log into npm using your credentials
echo -e "Log in to npm using your credentials"
npm login || return 1;

# If the second arg $2 is set to "beta" or $1 ends with "-beta" - assume a beta version is being published
if [ -n $2 -a "$2" =~ ^.*beta$ ] || [[ $1 =~ ^.*-.*$ ]]; then
    echo -e "Publishing a beta version $1:"
    npm publish --tag beta || return 1;
else
    echo -e "Publishing version $1:"
    npm publish || return 1;
fi
