export default function getDocDefinition(
    printParams,
    agGridApi,
    agGridColumnApi
  ) {
    const {
      PDF_WITH_HEADER_IMAGE,
      PDF_HEADER_COLOR,
      PDF_INNER_BORDER_COLOR,
      PDF_OUTER_BORDER_COLOR,
      PDF_ODD_BKG_COLOR,
      PDF_EVEN_BKG_COLOR,
      PDF_HEADER_HEIGHT,
      PDF_ROW_HEIGHT,
      PDF_PAGE_ORITENTATION,
      PDF_WITH_CELL_FORMATTING,
      PDF_WITH_COLUMNS_AS_LINKS,
      PDF_SELECTED_ROWS_ONLY,
      PDF_WITH_FOOTER_PAGE_COUNT,
    } = printParams;
  
    return (function() {
      const columnGroupsToExport = getColumnGroupsToExport();
  
      const columnsToExport = getColumnsToExport();
  
      const widths = getExportedColumnsWidths(columnsToExport);
  
      const rowsToExport = getRowsToExport(columnsToExport);
  
      const body = columnGroupsToExport
        ? [columnGroupsToExport, columnsToExport, ...rowsToExport]
        : [columnsToExport, ...rowsToExport];
  
      const headerRows = columnGroupsToExport ? 2 : 1;

      const header = 
        {
          image: 'group',
          width: 150,
          alignment: 'left',
          margin: [30, 10, 10, 10],
        }
  
      const footer = PDF_WITH_FOOTER_PAGE_COUNT
        ? function(currentPage, pageCount) {
            return {
              text: currentPage.toString() + " of " + pageCount,
              margin: [20],
              alignment: 'center'
            };
          }
        : null;
  
        const lineSeparator = {
                  "type": "line",
                  "x1": 0,
                  "y1": 0,
                  "x2": 535,
                  "y2": 0,
                  "lineWidth": 0.5,
                  "lineColor": "#BDBDBD"
        }

        const lineSeparator2 = {
                  "type": "line",
                  "x1": 0,
                  "y1": 40,
                  "x2": 535,
                  "y2": 40,
                  "lineWidth": 0.5,
                  "lineColor": "#BDBDBD"
        }

      const pageMargins = [
        30,
        70,
        30,
        40
      ];
  
      const heights = rowIndex =>
        rowIndex < headerRows ? PDF_HEADER_HEIGHT : PDF_ROW_HEIGHT;
  
      const fillColor = (rowIndex, node, columnIndex) => {
        if (rowIndex < node.table.headerRows) {
          return PDF_HEADER_COLOR;
        }
        return rowIndex % 2 === 0 ? PDF_ODD_BKG_COLOR : PDF_EVEN_BKG_COLOR;
      };
  
      const hLineWidth = (i, node) =>
        i === 0 || i === node.table.body.length ? 1 : 1;
  
      const vLineWidth = (i, node) =>
        i === 0 || i === node.table.widths.length ? 1 : 0;
  
      const hLineColor = (i, node) =>
        i === 0 || i === node.table.body.length
          ? PDF_OUTER_BORDER_COLOR
          : PDF_INNER_BORDER_COLOR;
  
      const vLineColor = (i, node) =>
        i === 0 || i === node.table.widths.length
          ? PDF_OUTER_BORDER_COLOR
          : PDF_INNER_BORDER_COLOR;
  
      const docDefintiion = {
        pageOrientation: PDF_PAGE_ORITENTATION,
        header,
        footer,
        content: [
          {
            canvas: [lineSeparator, lineSeparator2],
          },
          {
            text: 'Submitted Bids',
            style: 'headerText',
          },
          {
            columns: [
              [
                {
                  text: 'Debiting Account',
                  style: 'title' 
                },
                {
                  text: 'Current Account 000-000-000-0',
                  style: 'description'
                }
              ],
              [
                {
                  text: 'Debiting Account',
                  style: 'title' 
                },
                {
                  text: 'Current Account 000-000-000-0',
                  style: 'description'
                }
              ],
              [
                {
                  text: 'Debiting Account',
                  style: 'title' 
                },
                {
                  text: 'Current Account 000-000-000-0',
                  style: 'description'
                }
              ],
            ], 
            columnGap: 20
          },
          {
            text: '25 Submitted Bids'
          },
          {
            style: "myTable",
            table: {
              headerRows,
              widths,
              body,
              heights
            },
            layout: {
              fillColor,
              hLineWidth,
              vLineWidth,
              hLineColor,
              vLineColor
            }
          }
        ],
        images: {
          'group': 'https://raw.githubusercontent.com/AhmedAGadir/ag-grid-todo-list-react-typescript/master/src/assets/new-ag-grid-logo.png'
        },
        styles: {
          myTable: {
            margin: [0, 10, 0, 0]
          },
          tableHeader: {
            fontSize: 10,
            bold: true,
            margin: [0, PDF_HEADER_HEIGHT / 3, 0, 0],
            fillColor: '#08197B',
            color: '#FFFFFF' 
          },
          tableCell: {
            fontSize: 10,
            margin: [15, 15, 0, 15]
          },
          headerText: {
            fontSize: 15,
            bold: true,
            color: '#08197B',
            margin: [10, -30, 0, 20]
          },
          title: {
            fontSize: 8,
            opacity: 0.6
          },
          description: {
            fontSize: 10
          }
        },
        pageMargins
      };
  
      return docDefintiion;
    })();
  
    function getColumnGroupsToExport() {
      let displayedColumnGroups = agGridColumnApi.getAllDisplayedColumnGroups();
  
      let isColumnGrouping = displayedColumnGroups.some(col =>
        Object.prototype.hasOwnProperty.call(col,"children")
      );
  
      if (!isColumnGrouping) {
        return null;
      }
  
      let columnGroupsToExport = [];
  
      displayedColumnGroups.forEach(colGroup => {
        let isColSpanning = colGroup.children.length > 1;
        let numberOfEmptyHeaderCellsToAdd = 0;
  
        if (isColSpanning) {
          let headerCell = createHeaderCell(colGroup);
          columnGroupsToExport.push(headerCell);
          // subtract 1 as the column group counts as a header
          numberOfEmptyHeaderCellsToAdd--;
        }
  
        // add an empty header cell now for every column being spanned
        colGroup.displayedChildren.forEach(childCol => {
          let pdfExportOptions = getPdfExportOptions(childCol.getColId());
          if (!pdfExportOptions || !pdfExportOptions.skipColumn) {
            numberOfEmptyHeaderCellsToAdd++;
          }
        });
  
        for (let i = 0; i < numberOfEmptyHeaderCellsToAdd; i++) {
          columnGroupsToExport.push({});
        }
      });
  
      return columnGroupsToExport;
    }
  
    function getColumnsToExport() {
      let columnsToExport = [];
  
      agGridColumnApi.getAllDisplayedColumns().forEach(col => {
        let pdfExportOptions = getPdfExportOptions(col.getColId());
        if (pdfExportOptions && pdfExportOptions.skipColumn) {
          return;
        }
        let headerCell = createHeaderCell(col);
        columnsToExport.push(headerCell);
      });
  
      return columnsToExport;
    }
  
    function getRowsToExport(columnsToExport) {
      let rowsToExport = [];
  
      agGridApi.forEachNodeAfterFilterAndSort(node => {
        if (PDF_SELECTED_ROWS_ONLY && !node.isSelected()) {
          return;
        }
        let rowToExport = columnsToExport.map(({ colId }) => {
          let cellValue = agGridApi.getValue(colId, node);
          let tableCell = createTableCell(cellValue, colId);
          return tableCell;
        });
        rowsToExport.push(rowToExport);
      });
  
      return rowsToExport;
    }
  
    function getExportedColumnsWidths(columnsToExport) {
      return columnsToExport.map(() => 100 / columnsToExport.length + "%");
    }
  
    function createHeaderCell(col) {
      let headerCell = {};
  
      let isColGroup = col.hasOwnProperty("children");
  
      if (isColGroup) {
        headerCell.text = col.originalColumnGroup.colGroupDef.headerName;
        headerCell.colSpan = col.children.length;
        headerCell.colId = col.groupId;
      } else {
        let headerName = col.colDef.headerName;
  
        if (col.sort) {
          headerName += ` (${col.sort})`;
        }
        if (col.filterActive) {
          headerName += ` [FILTERING]`;
        }
  
        headerCell.text = headerName;
        headerCell.colId = col.getColId();
      }
  
      headerCell["style"] = "tableHeader";
  
      return headerCell;
    }
  
    function createTableCell(cellValue, colId) {
      const tableCell = {
        text: cellValue !== undefined ? cellValue : "",
        style: "tableCell"
      };
  
      const pdfExportOptions = getPdfExportOptions(colId);
  
      if (pdfExportOptions) {
        const { styles, createURL } = pdfExportOptions;
  
        if (PDF_WITH_CELL_FORMATTING && styles) {
          Object.entries(styles).forEach(
            ([key, value]) => (tableCell[key] = value)
          );
        }
  
        if (PDF_WITH_COLUMNS_AS_LINKS && createURL) {
          tableCell["link"] = createURL(cellValue);
          tableCell["color"] = "blue";
          tableCell["decoration"] = "underline";
        }
      }
  
      return tableCell;
    }
  
    function getPdfExportOptions(colId) {
      let col = agGridColumnApi.getColumn(colId);
      return col.colDef.pdfExportOptions;
    }
  }
  