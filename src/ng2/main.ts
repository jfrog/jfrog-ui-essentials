console.log('main.ts');
import 'zone.js';
import 'reflect-metadata';
import '../../components/angular-ui-grid/ui-grid'
import '../../vendor/draggable-rows'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule, upgradeAdapter } from './app.module';
import { TestComponent } from './components/test-component/test.component';





declare var angular: any;

platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {

    angular.module('jfrog.ui.essentials').directive('testComp',
        upgradeAdapter.downgradeNg2Component(TestComponent));

//    upgradeAdapter.bootstrap(document.documentElement, ['jfrog.ui.essentials']);

    window['juieNg2Bootstrap'] = upgradeAdapter.bootstrap.bind(upgradeAdapter);

});


