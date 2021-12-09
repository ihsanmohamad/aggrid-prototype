import { AgGridReact } from 'ag-grid-react';

import { AllModules } from '@ag-grid-enterprise/all-modules';

import { simpleHttpRequest } from "ag-grid-community";

import { useState, useEffect } from 'react';

import { columnDefs } from "./columnDefs";

import GridOptionsPanel from "./GridOptionsPanel";
import PDFExportPanel from "./pdfExport/PDFExportPanel.js";

import { Chip } from '@material-ui/core';

import FilterMenu from './components/FilterMenu/FilterMenu';

function App() {

  const [gridApi, setGridApi] = useState(null);
  const [columnApi, setColumnApi] = useState(null);

  const [rowData, setRowData] = useState([]);
  const [savedFilterModel, setSavedFilterModel] = useState({});

  const onGridReady = params => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);

    simpleHttpRequest({
      url: "https://www.ag-grid.com/example-assets/row-data.json"
    }).then(function(data) {
      data.forEach(r => {
        r.date = new Date();
      });
      setRowData(data.slice(1500, 2000));
    });
  };

  const onFirstDataRendered = params => {
    params.api.sizeColumnsToFit();
  };

  const onColumnEverythingChanged = params => {
    let selectionCol = params.columnApi.getColumn("selection-col");
    if (selectionCol) {
      params.columnApi.moveColumn(selectionCol, 0);
    }
    params.api.sizeColumnsToFit();

  };
  
  const saveFilterModel = () => {
    setSavedFilterModel(gridApi.getFilterModel());
    localStorage.setItem('filter_setting', JSON.stringify(gridApi.getFilterModel()));
  }


  const restoreFilterModel = async () => {
    const filter_setting = localStorage.getItem('filter_setting');
    gridApi.setFilterModel(JSON.parse(filter_setting));
  }
  

  const clearFilterModel = async () => {

    await gridApi.setFilterModel(null);
  }

  const saveFilter = async() => {
    // const response = await fetch('http://localhost:3000/filters', {
    //   method: "POST",
    //   body: JSON.stringify(savedFilterModel),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });
    // const data = await response.json();
    // console.log(data);

    localStorage.setItem('filter_setting', JSON.stringify(savedFilterModel));
  }
  const loadFilter = async() => {
    // const response = await fetch('http://localhost:3000/filters');
    // setSavedFilterModel(response.json())
    
  }

  const params= {
    columnKey: ['make', 'model', 'price']
  }

  const saveExcel = () => {
    gridApi.exportDataAsCsv(params);
  }

  
  
  useEffect(()=> {
  }, [ savedFilterModel ])

  return (
    <div className="container">
      <div className="ag-theme-custom" style={{height: 400}}>
        <div className="form-wrap">
          <GridOptionsPanel gridApi={gridApi} columnApi={columnApi} />
          <PDFExportPanel gridApi={gridApi} columnApi={columnApi} />
          
        </div>
        <button type="button" className="btn btn-primary mt-3" onClick={() => saveExcel()}>
          Save Excel
        </button>
        <button type="button" className="btn btn-primary mt-3" onClick={() => saveFilterModel()}>
          Save filter
        </button>
        <button type="button" className="btn btn-primary mt-3" onClick={() => restoreFilterModel()}>
          Load filter
        </button>
        <button type="button" className="btn btn-primary mt-3" onClick={() => clearFilterModel()}>
          Clear filter
        </button>

      <FilterMenu />
      {/* <Accordion /> */}
      
      <AgGridReact
          rowData={rowData} 
          columnDefs={columnDefs}
          suppressPropertyNamesCheck
          suppressDragLeaveHidesColumns
          defaultColDef={{
            flex: 1,
            sortable: true,
            enableRowGroup: true,
            unSortIcon: true,
            minWidth: 150,
          }}
          groupSelectsChildren
          rowSelection="multiple"
          onColumnEverythingChanged={onColumnEverythingChanged}
          onFirstDataRendered={onFirstDataRendered}
          onGridReady={onGridReady}
          />
    </div>
  </div>
  );
}

export default App;
