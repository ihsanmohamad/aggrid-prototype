export const columnDefs = [
    {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        colId: "selection-col",
        maxWidth: 50,
        pdfExportOptions: {
          skipColumn: true
        }
        
    },
    {
      headerName: "Make",
      field: "make",
      colId: "make",
      editable: true,
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['reset', 'apply'],
      },
      aggFunc: "count"
    },
    { headerName: "Model", field: "model", colId: "model", filter: 'agTextColumnFilter' },
    { headerName: "Price", field: "price", colId: "price",  filter: 'agNumberColumnFilter'  },
]