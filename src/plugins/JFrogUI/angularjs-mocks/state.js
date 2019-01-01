import _ from 'lodash';
export class AngularStateServiceMock {
  constructor() {
    this.$stateParams = this.$jfrog.get('$stateParams');
    if (this.$router) {
      this._update()
      this.$router.afterEach((to, from) => {
        this._update()
      })
    }
  }

  _update() {
    this.params = this._getFullParams();
    Object.keys(this.$stateParams).forEach(key => delete this.$stateParams[key]);
    _.extend(this.$stateParams, this.params);
    this.current = this.$router.currentRoute;
  }

  _getFullParams() {
    let params = this.$router.currentRoute.params;
    let queryParams = {};
    if (this.$router && this.$router.currentRoute.meta && this.$router.currentRoute.meta.queryParams) {
      this.$router.currentRoute.meta.queryParams.forEach(param => {
        if (this.$router.currentRoute.query[param]) {
          queryParams[param] = this.$router.currentRoute.query[param];
        }
      })
    }
    return _.extend({}, params, queryParams);
  }

  go(stateName, stateParams) {
    if (stateName === '.') stateName = this.current.name;
    this.$router.push({name: stateName, params: stateParams});
  }
}

