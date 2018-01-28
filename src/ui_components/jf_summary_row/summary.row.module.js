import JfSummaryRow from './summary.row.component';
import JfSummaryRowItem from './summary.row.item.component';

export default angular.module('summary.row', [])
                      .component('jfSummaryRow', new JfSummaryRow())
                      .component('jfSummaryRowItem', new JfSummaryRowItem());