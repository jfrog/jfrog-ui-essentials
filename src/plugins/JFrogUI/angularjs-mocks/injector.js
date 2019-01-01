import {$jfrog} from '@/plugins/JFrogUI/JFrogUI';
export class AngularInjectorServiceMock {
  constructor() {
      this.get = (...args) => $jfrog.get(...args)
  }

}

