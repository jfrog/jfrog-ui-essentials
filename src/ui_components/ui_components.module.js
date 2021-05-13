import JfDivider from './jf_divider/jf.divider.module';
import Grid     from './jfrog_grid/jfrog_grid.module';
import Modal    from './jfrog_modal/jfrog_modal.module';
import JFTableView    from './jf_table_view/jf_table_view.module';
import JFTree    from './jf_tree/jf_tree.module';
import SummaryRow from './jf_summary_row/summary.row.module';

angular.module('jfrog.ui_components', [
    Grid.name,
    Modal.name,
    JFTableView.name,
    JFTree.name,
    SummaryRow.name,
    JfDivider.name
]);