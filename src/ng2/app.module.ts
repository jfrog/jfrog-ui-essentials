console.log('app.module');

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';

import { UpgradeAdapter } from '@angular/upgrade';
import {forwardRef,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { TestComponent } from './components/test-component/test.component';


export const upgradeAdapter = new UpgradeAdapter(forwardRef(() => AppModule));

const jfPanel = upgradeAdapter.upgradeNg1Component('jfPanel');
const jfListMaker = upgradeAdapter.upgradeNg1Component('jfListMaker');

upgradeAdapter.upgradeNg1Provider('JFrogGridFactory');
upgradeAdapter.upgradeNg1Provider('JFrogNotifications');
upgradeAdapter.upgradeNg1Provider('$timeout');

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        BrowserModule,
        UpgradeModule
    ],
    declarations: [
        jfPanel,
        TestComponent,
        jfListMaker
    ]
})
export class AppModule {
    ngDoBootstrap() {}
}





