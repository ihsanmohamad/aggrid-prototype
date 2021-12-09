export const columnDefs = [
    {
        headerCheckboxSelection: true,
        checkboxSelection: true,
        colId: "selection-col",
        maxWidth: 50,
        pdfExportOptions: {
          skipColumn: true
        },
        lockPosition: true
        
    },
    {
      headerName: "Make",
      field: "make",
      suppressMovable: true,
      lockPosition: true
    },
    { headerName: "Model", field: "model", colId: "model" },
    { headerName: "Price", field: "price", colId: "price"  },
]