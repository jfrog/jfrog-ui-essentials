console.log('test.component')

import {Component, Inject} from '@angular/core';




@Component({
    selector: 'test-comp',
    template: require('./test.component.html')
})
export class TestComponent {

    public ng2List = ['THIS','IS','VERY','INTERESTING'];

    private gridOptions;
    private notif;

    constructor(@Inject('JFrogGridFactory') gridFactory,
                @Inject('JFrogNotifications') notif,
                @Inject('$scope') $scope) {

        this.notif = notif;
        console.log(gridFactory);
        console.log($scope);
        this.gridOptions = gridFactory.getGridInstance($scope)
            .setColumns([
                {
                    displayName: 'Name',
                    name: 'Name',
                    field: 'name'
                },
                {
                    displayName: 'Address',
                    name: 'Address',
                    field: 'address'
                }
            ])
            .setRowTemplate('default')
            .setGridData([
                {
                    name: 'MOSHE',
                    address: '88 BLAH BLAH ST.'
                },
                {
                    name: 'DAVID',
                    address: '90 BLAH BLAH ST.'
                }
            ])

    }

    showNotification() {
        let notif = {info: 'THIS IS A NOTIFICATION FROM NG1 !!!'};
        this.notif.create(notif);
    }

}
