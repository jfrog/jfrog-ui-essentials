import {FileSize} from './filesize';
import {SplitWords} from './split_words';

export default angular.module('jfrog.ui.essentials.filters', [])
        .filter('filesize', FileSize)
        .filter('splitWords', SplitWords);
