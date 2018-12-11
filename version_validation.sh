#!/bin/bash -e

# If no version is supplied - exit with error
if [ -z $VERSION_NAME ]; then
    echo -e "${RED}ERROR:${NC}" You must supply a valid version!
    return
fi

# If version is not SemVer compliant - exit with error
export SEMVER_REGEX="^(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)(\\-[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?(\\+[0-9A-Za-z-]+(\\.[0-9A-Za-z-]+)*)?\$"
if ! [[ "$VERSION_NAME" =~ $SEMVER_REGEX ]]; then
    echo -e "ERROR: You must supply a SemVer compatible version!"
    return
fi
