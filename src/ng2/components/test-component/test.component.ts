console.log('test.component')

import {Component, Inject} from '@angular/core';




@Component({
    selector: 'test-comp',
    template: require('./test.component.html')
})
export class TestComponent {

    private modal;
    private tabs =
        [
            {"name":"jfListMaker"},
            {"name":"jfMultiDropdown"},
            {"name":"jfGrid"},
            {"name":"jfNg1Form"},
            {"name":"jfUISelect"},
            {"name":"jfDragDrop"},
            {"name":"jfActions"},
            {"name":"jfCodeMirror"},
            {"name":"jfSidebar"},
            {"name":"JFrogModal"},
        ];

    private tabsDict = {
        jfListMaker: "jfrog-list-maker",
        jfMultiDropdown: "jfrog-multi-dropdown",
        jfGrid: "jfrog-grid",
        jfNg1Form: "jfrog-ng1-form",
        jfUISelect: "jfrog-ui-select",
        jfDragDrop: "jfrog-drag-drop",
        jfActions: "jfrog-actions",
        jfCodeMirror: "jfrog-code-mirror",
        jfSidebar: "jf-sidebar",
        JFrogModal: "JFrogModal Service",
    };


    private dndDisabled = false;
    private listVals = ['Angular 2', 'Angular 1', 'React',' Baijurgabara']

    private help = "THIS IS HELP!!!! ?"

    private $ctrl=this;

    private multiList = [
        {
            text: 'ext-release-local',
            iconClass: 'icon icon-local-repo',
            isSelected: false
        },
        {
            text: 'ext-snapshot-local',
            iconClass: 'icon icon-local-repo',
            isSelected: false
        },
        {
            text: 'npm-local',
            iconClass: 'icon icon-local-repo',
            isSelected: false
        },
        {
            text: 'jcenter',
            iconClass: 'icon icon-remote-repo',
            isSelected: false
        },
        {
            text: 'npm-registry',
            iconClass: 'icon icon-remote-repo',
            isSelected: false
        },
        {
            text: 'my-virtual-repo',
            iconClass: 'icon icon-virtual-repo',
            isSelected: false
        },
    ]

    private menu;

    private sbDriver = {
        setMenu: (menu)=> {
            this.menu = menu;
            menu.refreshMenu();
        },
        getMenuItems: () => {
            return [
                {
                    label: 'Home',
                    stateParent: "home",
                    state: "home",
                    icon: 'icon icon-home-new',
                    selected: true
                },
                {
                    label: 'Artifacts',
                    state: "artifacts.browsers.path",
                    stateParent: "artifacts",
                    stateParams: {tab: 'General', artifact: '', browser: 'tree'},
                    icon: 'icon icon-artifacts-new',
//            isDisabled: !this.user.canView('artifacts'),
                    selected: false
                },
                {
                    label: 'Builds',
                    stateParent: "builds",
                    state: "builds.all",
                    icon: 'icon icon-builds-new',
                    selected: false,
                    //          isDisabled: !this.user.canView("builds")
                },
                {
                    label: 'Admin',
                    icon: 'icon icon-admin-new',
                    id: 'admin',
                    stateParent: "admin",
                    state: 'admin',
                    selected: false,
                    children: true,
                    //        isDisabled: !this.user.getCanManage()
                }
            ]
        },
        getAdminMenuItems: () => {
            return [
                {
                    "label": "Repositories",
                    "state": "admin.repositories",
                    "subItems": [
                        {"label": "Local", "state": "admin.repositories.list", "stateParams": {"repoType": "local"}},
                        {"label": "Remote", "state": "admin.repositories.list", "stateParams": {"repoType": "remote"}},
                        {"label": "Virtual", "state": "admin.repositories.list", "stateParams": {"repoType": "virtual"}},
                        {"label": "Distribution", "state": "admin.repositories.list", "stateParams": {"repoType": "distribution"}},
                        {"label": "Layouts", "state": "admin.repositories.repo_layouts"}
                    ]
                },

                {
                    "label": "Configuration",
                    "state": "admin.configuration",
                    "subItems": [
                        {"label": "General Configuration", "state": "admin.configuration.general"},
                        {"label": "JFrog Xray", "state": "admin.configuration.xray"},
                        {"label": "Licenses", "state": "admin.configuration.licenses",},
                        {"label": "Governance", "state": "admin.configuration.black_duck"},
                        {"label": "Property Sets", "state": "admin.configuration.property_sets"},
                        {"label": "Proxies", "state": "admin.configuration.proxies"},
                        {"label": "Reverse Proxy", "state": "admin.configuration.reverse_proxy"},
                        {"label": "Mail", "state": "admin.configuration.mail"},
                        {"label": "High Availability", "state": "admin.configuration.ha"},
                        //{"label": "Bintray", "state": "admin.configuration.bintray"},
                        {"label": "Register License", "state": "admin.configuration.register_pro"}
                    ]
                },

                {
                    "label": "Security",
                    "state": "admin.security",
                    "subItems": [
                        {"label": "Security Configuration", "state": "admin.security.general"},
                        {"label": "Users", "state": "admin.security.users"},
                        {"label": "Groups", "state": "admin.security.groups"},
                        {"label": "Permissions", "state": "admin.security.permissions"},
                        {"label": "LDAP", "state": "admin.security.ldap_settings"},
                        {"label": "Crowd / JIRA", "state": "admin.security.crowd_integration"},
                        {"label": "SAML SSO", "state": "admin.security.saml_integration"},
                        {"label": "OAuth SSO", "state": "admin.security.oauth"},
                        {"label": "HTTP SSO", "state": "admin.security.http_sso"},
                        {"label": "SSH Server", "state": "admin.security.ssh_server"},
                        {"label": "Signing Keys", "state": "admin.security.signing_keys"}
                    ]
                },

                {
                    "label": "Services",
                    "state": "admin.services",
                    "subItems": [
                        {"label": "Backups", "state": "admin.services.backups"},
                        {"label": "Maven Indexer", "state": "admin.services.indexer"}
                    ]

                },

                {
                    "label": "Import & Export",
                    "state": "admin.import_export",
                    "subItems": [
                        {"label": "Repositories", "state": "admin.import_export.repositories"},
                        {"label": "System", "state": "admin.import_export.system"}

                    ]

                },

                {
                    "label": "Advanced",
                    "state": "admin.advanced",
                    "subItems": [
                        {"label": "Support Zone", "state": "admin.advanced.support_page"},
                        {"label": "Log Analytics", "state": "admin.advanced.log_analytics"},
                        {"label": "System Logs", "state": "admin.advanced.system_logs"},
                        {"label": "System Info", "state": "admin.advanced.system_info"},
                        {"label": "Maintenance", "state": "admin.advanced.maintenance"},
                        {"label": "Storage", "state": "admin.advanced.storage_summary"},
                        {"label": "Config Descriptor", "state": "admin.advanced.config_descriptor"},
                        {"label": "Security Descriptor", "state": "admin.advanced.security_descriptor"}

                    ]
                }

            ];

        }

    }


    private gridOptions;

    private myBindedVar = 'HELLO';

    private selectedItem;

    private currentTab;

    private eventBus;

    private $scope;


    constructor(@Inject('JFrogGridFactory') gridFactory,
                @Inject('JFrogNotifications') notif,
                @Inject('JFrogEventBus') eventBus,
                @Inject('JFrogModal') modal,
                @Inject('$scope') $scope) {

        this.eventBus = eventBus;
        this.modal = modal;
        this.$scope = $scope;

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

    ngOnInit() {
        this.eventBus.register('some_custom_event',(eventParam)=>{
            console.log('Catched event with param: ' + eventParam);
        })
    }

    onSidebarClick($event) {
        console.log('Sidebar click!!!',$event)
    }

    onMultiSelection() {
        console.log(this.multiList);
    }

    private excludeObjects = [];
    private includeObjects = [
        {name: 'Item1'}, {name: 'Item2'}
    ] ;

    private codeMirrorXML=require('xml-loader!./test_codemirror.xml');

    onChangeDNDObject() {
        console.log(this.excludeObjects, this.includeObjects)
    }

    onTabChange(tab) {
//    console.log(tab);
        this.currentTab = tab.name;
    }

    initActions(actionsController) {
        actionsController.setActionsDictionary({
            'action1': {title: 'Actions', icon: 'icon-revoke-api'},
            'action2': {title: 'Unlock User', icon: 'icon-unlock'},
            'action3': {title: 'Expire Password', icon: 'icon-expire'},
            'action4': {title: 'Unexpire Password', icon: 'icon-unexpire'},
            'action5': {title: 'Delete User', icon: 'icon-clear'}
        });
        actionsController.setActions([
            {
                name:'action1',
                visibleWhen: () => true,
                action: ()=>{console.log('Action 1')}
            },
            {
                name:'action2',
                visibleWhen: () => true,
                action: ()=>{console.log('Action 2')}
            },
            {
                name:'action3',
                visibleWhen: () => true,
                action: ()=>{console.log('Action 3')}
            },
            {
                name:'action4',
                visibleWhen: () => true,
                action: ()=>{console.log('Action 4')}
            },
            {
                name:'action5',
                visibleWhen: () => true,
                action: ()=>{console.log('Action 5')}
            }
        ]);
    }

    showConfirmModal() {
        this.modal.confirm('Really want to do {SOME DESTRUCTIVE ACTION} ???',"Confirmation modal example", {confirm: "Do It!", cancel: "Forget it..."})
            .then(function() {console.log('Doing {SOME DESTRUCTIVE ACTION}')})
            .catch(function() {console.log('Canceled {SOME DESTRUCTIVE ACTION}')});
    };
    showCodeModal() {
        var codeSnippet = "<note>\n <to>Moshe</to>\n <from>God</from>\n <heading>Reminder</heading>\n <body>Don't forget me this weekend!</body>\n</note>\n"
        this.modal.launchCodeModal('Code Modal Example',codeSnippet,{name:'application/xml'})
    };

    private modalInstance;
    showCustomModal(num) {
        var s = this.$scope.$new();
        s.moshe = 'Cohen';
        s.david = 'Ben Guryon';
        s.avi = 'Shiputzim';

        s.doCustomAction = function() {
            console.log('Doing the custom action...');
            this.modalInstance.close();
        };

        this.modalInstance = this.modal.launchModal('modal'+num,s);
    }


    showWizardModal() {

        var wizardDefinitionObject = {
            title: 'My Test Wizard',
            controller: SampleWizardController,
            controllerAs: 'WizCtrl',
            cancelable: true,
            steps: [
                {
                    name: 'Initialization',
                    id: 'init',
                    templateUrl: 'custom_modal_templates/modal_wizard_example/step_1.html',
                    skippable: false
                },
                {
                    name: 'Middle Stage',
                    id: 'step2',
                    templateUrl: 'custom_modal_templates/modal_wizard_example/step_2.html',
                    skippable: true
                },
                {
                    name: 'Final Stage',
                    id: 'final',
                    templateUrl: 'custom_modal_templates/modal_wizard_example/step_3.html',
                    skippable: false
                }
            ]
        };

        this.modal.launchWizard(wizardDefinitionObject);
    }



}


class SampleWizardController {
    private test = 'THIS IS WORKING!!!'
    private values = [];

    private step1form;
    private step2form;

    isStepCompleted(step) {
        switch(step.id) {
            case 'init': {
                //          return !!this.inputTest1;
                return this.step1form && this.step1form.$valid;
            }
            case 'step2': {
                //          return !!this.inputTest2;
                return this.step2form && this.step2form.$valid;
            }
            case 'final': {
                return !!this.values.length;
            }
        }
        return true;
    }

    onComplete() {
        console.log('completed!', this)
    }
    onCancel() {
        console.log('canceled');
    }
    onStepChange(newStep,oldStep) {
        console.log('step change!', oldStep.id + ' > ' + newStep.id)
    }


}
