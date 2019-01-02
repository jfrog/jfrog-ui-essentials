export class AngularInjectorServiceMock {
  constructor() {
      this.get = (...args) => $jfrog.get(...args)
  }

}

