import { JFTreeApi } from './services/factories/JfTreeApiFactory.js';
import { JFrogTableViewOptions } from './services/factories/JFrogTableViewOptionsFactory.js';
import { JFrogUIModelSaverFactory } from './services/factories/JFrogUiModelSaverFactoryFactory.js';
import { JFrogUIWebWorker } from './services/factories/JFrogUiWebWorkerFactory.js';
import { recursiveDirective } from './services/factories/RecursiveDirectiveFactory.js';
import { WebWorkersPool } from './services/factories/WebWorkersPoolFactory.js';
import { JFrogIFrameDownload } from './services/factories/JFrogIFrameDownloadFactory.js';
import { JFrogDownload } from './services/factories/JFrogDownloadFactory.js';
import { JFrogUploaderFactory } from './services/JFrogUploaderFactoryService.js';
import { JFrogModal } from './services/JFrogModalService.js';
import { JFrogGridFactory } from './services/JFrogGridFactoryService.js';
import { JFrogSubRouter } from './services/JFrogSubRouterService.js';
import { JfFullTextService } from './services/JfFullTextServiceService.js';
import { ContextMenuService } from './services/ContextMenuServiceService.js';
import { AdvancedStringMatch } from './services/AdvancedStringMatchService.js';
import { JFrogUIUtils } from './services/JFrogUiUtilsService.js';
import { JFrogNotifications } from './services/JFrogNotificationsService.js';
import { JFrogEventBus } from './services/JFrogEventBusService.js';
import { JFrogUILibConfig } from './services/providers/JFrogUiLibConfigProvider.js';
import { main } from './init/MainRunBlock.js';
import { config } from './configs/ConfigConfig.js';
import { jfrogUiEssentialsConfig } from './configs/JfrogUiEssentialsConfig.js';
import JFrogUI from './plugins/JFrogUI';

export const servicesRegistration = {
    registerConfigs: () => JFrogUI.registerConfigs({
        jfrogUiEssentialsConfig,
        config
    }),
    registerRunBlocks: () => JFrogUI.registerRunBlocks({ main }),
    registerProviders: () => JFrogUI.registerProviders({ JFrogUILibConfig }),
    registerServices: () => JFrogUI.registerServices({
        JFrogEventBus,
        JFrogNotifications,
        JFrogUIUtils,
        AdvancedStringMatch,
        ContextMenuService,
        JfFullTextService,
        JFrogSubRouter,
        JFrogGridFactory,
        JFrogModal,
        JFrogUploaderFactory
    }),
    registerFactories: () => JFrogUI.registerFactories({
        JFrogDownload,
        JFrogIFrameDownload,
        WebWorkersPool,
        recursiveDirective,
        JFrogUIWebWorker,
        JFrogUIModelSaverFactory,
        JFrogTableViewOptions,
        JFTreeApi
    }),
    registerConstants: () => JFrogUI.registerConstants({
    }),
    registerAll: () => {
        servicesRegistration.registerConfigs();
        servicesRegistration.registerRunBlocks();
        servicesRegistration.registerProviders();
        servicesRegistration.registerServices();
        servicesRegistration.registerFactories();
        servicesRegistration.registerConstants();
    }
};
