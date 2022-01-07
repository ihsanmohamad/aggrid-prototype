import { AgGridReact } from 'ag-grid-react';

import { AllModules } from '@ag-grid-enterprise/all-modules';

import { simpleHttpRequest } from "ag-grid-community";

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setGridApi, setColumnApi, setRowData, setColumns } from './redux/actions/agGrid'

import { getBids, addBids } from './mybids'

import { columnDefs } from "./columnDefs";


import CustomizeView from './components/CustomizeView/CustomizeView'
import GridOptionsPanel from "./GridOptionsPanel";
import PDFExportPanel from "./pdfExport/PDFExportPanel.js";

import { ActionTypes } from './redux/constants/action-types'

import { Chip } from '@material-ui/core';

import FilterMenu from './components/FilterMenu/FilterMenu';

function App() {

  const { gridApi, columnApi, rowData, columns } = useSelector(state => state.agGrid)

  const dispatch = useDispatch()

  const [isVisible, setIsVisible] = useState(true)

  const [savedFilterModel, setSavedFilterModel] = useState({});

  const [open, setOpen] = useState(null)


  const onGridReady = params => {
    
    dispatch(setGridApi(params.api))
    dispatch(setColumnApi(params.columnApi))
    dispatch(setColumns(params.columnApi))
    getBids().then(res => {
      dispatch(setRowData(res.data))
    })
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
  
  const onStartEdit = () => {
    gridApi.applyTransaction({add: [{}], addIndex: 0})
    gridApi.setFocusedCell(0, 'vehcat')
    gridApi.startEditingCell({
      rowIndex: 0,
      colKey: 'vehcat'
    })
  }
  const onStopEdit = () => {
    gridApi.refreshCells({rowNode: 0, force: true})
    const toAdd = {"id": 1000, "vehcat": "test", "bidqty": 5}
    gridApi.applyTransaction({update:[toAdd]})
    addBids(toAdd)
    gridApi.stopEditing()
  }

  const toggleBidQty = () => {
    setIsVisible(!isVisible)
    columnApi.setColumnVisible('bidqty', isVisible)
  }

  const getAllColumns =() => {
    const columns = []
    columnApi.getAllColumns().map(column => columns.push(column.colDef.colId))
    return columns
  }
  
  const applyState = () => {
    columnApi.applyColumnState({
      state: [{
        colId: 'bidqty',
        hide: true
      },
    {
      colId: 'resprice',
      hide: true
    }]
    })
  }
  const applyStateShow = () => {
    columnApi.applyColumnState({
      state: [{
        colId: 'bidqty',
        hide: false
      }]
    })
  }

  const handleClose = () => {
      setOpen(null)
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
        
        <button type="button" className="btn btn-primary mt-3" onClick={() => onStartEdit()}>
          Add Row
        </button>
        <button type="button" className="btn btn-primary mt-3" onClick={() => onStopEdit()}>
          Save Row
        </button>
        <button type="button" className="btn btn-primary mt-3" onClick={applyState}>
          Hide 
        </button>
        <button type="button" className="btn btn-primary mt-3" onClick={applyStateShow}>
          Show
        </button>
        <button type="button" className="btn btn-primary mt-3" onClick={getAllColumns}>
          get all column
        </button>

      <CustomizeView />
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
            filter: true,
            enableRowGroup: true,
            unSortIcon: true,
            minWidth: 150,
            editable: true
          }}
          editType={'fullRow'}
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
