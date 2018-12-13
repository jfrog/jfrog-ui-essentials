// import {TreeViewPane} from "../src/ui_components/jf_tree/tree_view_pane";


const mock = jest.fn().mockImplementation(() => {
    TreeViewPane._getPageData = ()=> {
        console.log('MOCL TreeViewPane ');
        TreeViewPane._getPrePagedData();
    }
    return TreeViewPane;
});

export {mock as TreeViewPane};