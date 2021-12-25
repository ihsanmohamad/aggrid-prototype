
import { useTableEdit } from "./useTableEdit";

const GridOptionsPanel = props => {

  const { isEditing, onStartEdit, onStopEdit } = useTableEdit()  

  const updateGroupByMake = event => {
    props.columnApi.applyColumnState({
      state: [
        {
          colId: "make",
          
          rowGroup: event.target.checked
        }
      ]
    });
  };

  // const updateFilterByFord = event => {
  //   const makeFilterComponent = props.gridApi.getFilterInstance("make");
  //   const filterModel = event.target.checked ? { values: ["Ford"] } : null;
  //   makeFilterComponent.setModel(filterModel);
  //   props.gridApi.onFilterChanged();
  // };

  // const updateSortPriceAsc = event => {
  //   let priceSort = event.target.checked ? "asc" : null;

  //   props.columnApi.applyColumnState({
  //     state: [{ colId: "price", sort: priceSort }],
  //     defaultState: { sort: null }
  //   });
  // };

  const addRow = () => {
    props.gridApi.applyTransaction({ add: [{}], addIndex: 0})
  }

  return (
    <form>
      <h4 className="text-secondary">Grid Options</h4>
      <button type="button" onClick={() => onStartEdit( 2, 'make')} className="btn btn-primary mt-3">
        edit
      </button>
    </form>
  );
};

export default GridOptionsPanel;
