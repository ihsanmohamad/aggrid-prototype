import React, { useState } from "react";
import printDoc from "./printDoc";

const PDFExportPanel = props => {
  const [PDF_PAGE_ORITENTATION, SET_PDF_PAGE_ORIENTATION] = useState(
    "landscape"
  );
  const [PDF_WITH_HEADER_IMAGE, SET_PDF_WITH_HEADER_IMAGE] = useState(true);
  const [PDF_WITH_FOOTER_PAGE_COUNT, SET_PDF_WITH_FOOTER_PAGE_COUNT] = useState(
    true
  );
  const [PDF_HEADER_HEIGHT] = useState(25);
  const [PDF_ROW_HEIGHT] = useState(35);

  const [PDF_SELECTED_ROWS_ONLY, SET_PDF_SELECTED_ROWS_ONLY] = useState(false);
  const PDF_ODD_BKG_COLOR = "#f8fafb";
  const PDF_EVEN_BKG_COLOR= "#ffffff";
  const PDF_HEADER_COLOR = "#f8f8f8";
  const PDF_INNER_BORDER_COLOR = "#dde2eb";
  const PDF_OUTER_BORDER_COLOR = "#babfc7";
  const PDF_LOGO =
    "https://raw.githubusercontent.com/AhmedAGadir/ag-grid-todo-list-react-typescript/master/src/assets/new-ag-grid-logo.png";


  const submitFormHandler = event => {
    event.preventDefault();

    const printParams = {
      PDF_HEADER_COLOR,
      PDF_INNER_BORDER_COLOR,
      PDF_OUTER_BORDER_COLOR,
      PDF_PAGE_ORITENTATION,
      PDF_WITH_FOOTER_PAGE_COUNT,
      PDF_HEADER_HEIGHT,
      PDF_ROW_HEIGHT,
      PDF_SELECTED_ROWS_ONLY,
      PDF_EVEN_BKG_COLOR,
      PDF_ODD_BKG_COLOR
    };

    printDoc(printParams, props.gridApi, props.columnApi);
  };


  return (
    <form onSubmit={submitFormHandler}>
      <h4 className="text-secondary">PDF Export Options</h4>
      <div className="mb-2">
        <input
          className="form-check-input"
          type="radio"
          name="orientation"
          id="landscape"
          value="landscape"
          checked={PDF_PAGE_ORITENTATION === "landscape"}
          onChange={event => {
            if (event.target.checked) {
              SET_PDF_PAGE_ORIENTATION(event.currentTarget.value);
            }
          }}
        />
        <label className="form-check-label" for="landscape">
          Landscape
        </label>
        <input
          className="form-check-input"
          type="radio"
          name="orientation"
          id="portrait"
          value="portrait"
          checked={PDF_PAGE_ORITENTATION === "portrait"}
          onChange={event => {
            if (event.target.checked) {
              SET_PDF_PAGE_ORIENTATION(event.currentTarget.value);
            }
          }}
        />
        <label className="form-check-label" for="portrait">
          Portrait
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="footerPageCount"
          checked={PDF_WITH_FOOTER_PAGE_COUNT}
          onChange={event => {
            SET_PDF_WITH_FOOTER_PAGE_COUNT(event.target.checked);
          }}
        />
        <label className="form-check-label" for="footerPageCount">
          Footer (page count)
        </label>
      </div>
     
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="selectedRowsOnly"
          checked={PDF_SELECTED_ROWS_ONLY}
          onChange={event => {
            SET_PDF_SELECTED_ROWS_ONLY(event.target.checked);
          }}
        />
        <label className="form-check-label" for="selectedRowsOnly">
          Selected rows only
        </label>
      </div>

      <button type="submit" className="btn btn-primary mt-3">
        Export to PDF
      </button>
    </form>
  );
};

export default PDFExportPanel;
