import Grid     from './jfrog_grid/jfrog_grid.module';
import Modal    from './jfrog_modal/jfrog_modal.module';
import Uploader    from './jfrog_uploader/jfrog_uploader.module';
import JFTableView    from './jf_table_view/jf_table_view.module';
import JFTree    from './jf_tree/jf_tree.module';

angular.module('jfrog.ui_components', [
    Grid.name,
    Modal.name,
    Uploader.name,
    JFTableView.name,
    JFTree.name
]);