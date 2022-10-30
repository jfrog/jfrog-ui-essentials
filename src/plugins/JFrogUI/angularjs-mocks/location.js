import { trimStart, trimEnd, isObject, isString, isNumber  } from 'lodash';
export class AngularLocationProviderMock {
    constructor() {
        this.location = window.location

        this.updateRouter = true;
        this.$router.beforeEach((to, from, next) => {
            if (this.updateRouter) next();
        })
    }

    $get() {
        return this;
    }

    hashPrefix(hashPrefix) {
        console.error('Setting custom hash prefix is not yet supported')
    }

    url(newUrl) {
        if (!newUrl) {
            return trimStart(this.location.hash, '#');
        }
        else {
            this._update(() => {
                this.location.hash = '#' + newUrl;
            });
        }
    }

    absUrl() {
        return this.location.href;
    }

    protocol() {
        return trimEnd(this.location.protocol, ':');
    }

    host() {
        return this.location.host.split(':')[0];
    }

    port() {
        return parseInt(this.location.host.split(':')[1]);
    }

    path(newPath) {
        if (!newPath) {
            return this.url().split('#')[0].split('?')[0];
        }
        else {
            this._update(() => {
                let url = this.url();
                let hash = url.split('#')[1] || '';
                let search = url.split('#')[0].split('?')[1] || '';
                this.location.hash = '#' + newPath + (search ? '?' + search : '') + (hash ? '#' + hash : '');
            });
        }
    }

    search(...newSearch) {
        if (!newSearch.length) {
            let searchObj = {};
            let searchString = this.url().split('#')[0].split('?')[1];
            if (searchString) {
                let searchParts = searchString.split('&');
                searchParts.forEach(part => {
                    let split = part.split('=');
                    searchObj[split[0]] = split[1];
                })
            }
            return searchObj;
        }
        else {
            let update = (obj) => {
                let searchParts = [];
                Object.keys(obj).forEach(key => {
                    searchParts.push(`${key}=${obj[key]}`);
                })
                let searchStr = searchParts.join('&');

                let hash = this.hash();
                let path = this.path();
                this._update(() => {
                    this.location.hash = '#' + path + (searchStr ? '?' + searchStr : '') + (hash ? '#' + hash : '');
                })
            }

            if (isObject(newSearch[0])) {
                update(newSearch[0]);
            }
            else if (isString(newSearch[0]) && (isString(newSearch[1]) || isNumber(newSearch[1]))){
                let searchObj = this.search();
                searchObj[newSearch[0]] = newSearch[1];
                update(searchObj);
            }
        }
    }

    hash(newHash) {
        if (newHash === undefined) {
            return this.url().split('#')[1] || '';
        }
        else {
            this._update(() => {
                this.location.hash = '#' + this.url().split('#')[0] + (newHash ? '#' + newHash : '');
            })
        }
    }

    replace() {
        console.error('$location.replace is not currently supported !');
    }

    state() {
        console.error('$location.state is not currently supported !');
        return null;
    }

    _update(f) {
        this.updateRouter = false;
        f();
        this.$set(this, 'dummy', (this.dummy || 0) + 1);
        this.updateRouter = true;
    }


}
