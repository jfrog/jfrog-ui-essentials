import { install as installSplitWordsFilter} from './filters/SplitWordsFilter.js';
import { install as installFormatedNumberFilter} from './filters/FormatedNumberFilter.js';
import { install as installFilesizeFilter } from './filters/FilesizeFilter.js';

export const installFilters = () => {
    installSplitWordsFilter();
    installFormatedNumberFilter();
    installFilesizeFilter();
}
