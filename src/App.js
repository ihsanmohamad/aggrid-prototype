import { AgGridReact } from 'ag-grid-react';

import { AllModules } from '@ag-grid-enterprise/all-modules';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { simpleHttpRequest } from "ag-grid-community";

import { useState, useEffect } from 'react';

import { columnDefs } from "./columnDefs";

import GridOptionsPanel from "./GridOptionsPanel";
import PDFExportPanel from "./pdfExport/PDFExportPanel.js";

import "./style.css";


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
    params.columnApi.autoSizeAllColumns();
  };

  const onColumnEverythingChanged = params => {
    let selectionCol = params.columnApi.getColumn("selection-col");
    if (selectionCol) {
      params.columnApi.moveColumn(selectionCol, 0);
    }
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
    <div className="ag-theme-alpine" style={{height: 400, width: 600}}>
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
    <AgGridReact
        rowData={rowData} 
        columnDefs={columnDefs}
        suppressPropertyNamesCheck
        defaultColDef={{
          filter: true,
          sortable: true,
          resizable: true,
          enableRowGroup: true,
          menuTabs: ["filterMenuTab"]
        }}
        groupSelectsChildren
        rowSelection="multiple"
        onColumnEverythingChanged={onColumnEverythingChanged}
        onFirstDataRendered={onFirstDataRendered}
        onGridReady={onGridReady}
        modules={AllModules}
        />
</div>
  );
}

export default App;
