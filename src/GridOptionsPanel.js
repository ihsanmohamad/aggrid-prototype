
const GridOptionsPanel = props => {

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

  const updateFilterByFord = event => {
    const makeFilterComponent = props.gridApi.getFilterInstance("make");
    const filterModel = event.target.checked ? { values: ["Ford"] } : null;
    makeFilterComponent.setModel(filterModel);
    props.gridApi.onFilterChanged();
  };

  const updateSortPriceAsc = event => {
    let priceSort = event.target.checked ? "asc" : null;

    props.columnApi.applyColumnState({
      state: [{ colId: "price", sort: priceSort }],
      defaultState: { sort: null }
    });
  };

  return (
    <form>
      <h4 className="text-secondary">Grid Options</h4>
      <span className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="grid-setting-group-make"
          onChange={updateGroupByMake}
        />
        <label className="form-check-label" for="grid-setting-group-make">
          Group by "Make"
        </label>
      </span>
      <span className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="grid-setting-filter-ford"
          onChange={updateFilterByFord}
        />
        <label className="form-check-label" for="grid-setting-filter-ford">
          Filter by "Ford"
        </label>
      </span>
      <span className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="grid-setting-sort-price-asc"
          onChange={updateSortPriceAsc}
        />
        <label className="form-check-label" for="grid-setting-sort-price-asc">
          Sort Price (ascending)
        </label>
      </span>
    </form>
  );
};

export default GridOptionsPanel;
